const Book = require('../models/Book.js')
const User = require('../models/User');  
const Transaction = require('../models/Transaction.js')
const mqttClient = require('../utils/mqtt.js');
const axios = require("axios");

const publishMqtt = (client, topic, payload = '') => {
    return new Promise((resolve, reject) => {
        client.publish(topic, payload, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

//@desc     Get all books or search books
//@route    GET /api/v1/books
//@access   Public
exports.getBooks = async (req, res, next) => {
    try {
        const searchTerm = req.query.term;
        let searchResults;

        if (!searchTerm) {
            searchResults = await Book.find({});
        } else {
            searchResults = await Book.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i'} },
                    { author: { $regex: searchTerm, $options: 'i'} },
                    { desc: { $regex: searchTerm, $options: 'i'} }
                ]
            });
        }

        return res.status(200).json({
            success: true,
            count: searchResults.length,
            data: searchResults
        });

    } catch (err) {
        console.error("Error fetching books:", err.message);
        
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during book retrieval.'
        });
    }
};


//@desc     Get specific book by id
//@route    GET /api/v1/books/:id
//@access   Public
exports.getBook = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const bookId = req.params.id;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                error: `Book not found with ID: ${bookId}`
            });
        }

        return res.status(200).json({
            success: true,
            data: book
        });

    } catch (err) {
        console.error(`Error fetching book with ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
             return res.status(400).json({
                success: false,
                error: `Invalid Book ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during single book retrieval.'
        });
    }
};

//@desc     Get books borrowed by user
//@route    Get /api/v1/books/user/:id
//@access   Private
exports.getBooksBorrowedByUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ lineId: req.params.id })
                               .populate('booksReturned');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: `User not found with lineId: ${req.params.id}`
            });
        }

        return res.status(200).json({
            success: true,
            data: user.booksReturned || []
        });
    } catch (err) {
        console.error(`Error fetching books for User ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: `Invalid User ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during user books retrieval.'
        });
    }
};




exports.borrowBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const userId = req.body.userId;

        console.log("Borrow Book - Book ID:", bookId, "User ID:", userId);

        const book = await Book.findById(bookId);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: `User not found with ID: ${userId}`
            });
        }

        if (!book) {
            return res.status(404).json({
                success: false,
                error: `Book not found with ID: ${bookId}`
            });
        }

        if (book.status === 'borrowed') {
            return res.status(400).json({
                success: false,
                error: 'Book is already borrowed'
            });
        }

        // ---- MQTT PUBLISH TO ESP32 ----
        // you MUST decide which machine/book position this book belongs to
        const machineId = "F1";

        const topic = `flybrary/${machineId}/borrow`;
        const payload = JSON.stringify({
            isbn: book.ISBN
        });

        await publishMqtt(mqttClient, topic, payload);
        console.log("MQTT Published:", topic, payload);

        book.status = 'borrowed';
        book.borrowedBy = user;
        await book.save();

        const tx = await Transaction.create({
            user: userId,
            book: bookId,
            borrowDate: new Date(),
            returnBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return res.status(200).json({
            success: true,
            data: book,
            message: 'Book borrowed successfully'
        });

    } catch (err) { 
        console.error(`Error borrowing book with ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: `Invalid Book ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during book borrowing.'
        });
    }
};


//@desc     Update book status to available
//@route    Put /api/v1/books/return/:id
//@access   Private
exports.returnBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: `User not found with ID: ${req.body.userId}`
            });
        }

        if (!book) {
            return res.status(404).json({
                success: false,
                error: `Book not found with ID: ${bookId}`
            });
        }

        // ---- MQTT PUBLISH TO ESP32 Camera to get Picture ----
        const machineId = "F1";

        const topic = `flybrary/${machineId}/borrow`;
        const payload = JSON.stringify({
            isbn: book.ISBN
        });

        publishMqtt(mqttClient, topic, payload);
        console.log("MQTT Published:", topic, payload);

        
        user.booksReturned.push(book._id);
        await user.save();

        delay(15000);

        if (user?.lineId) {
            const message = `You have returned item: ${book.name}.\nThank you for using Flybrary!`;
            console.log(`Sending (LINE ID: ${user.lineId}) return confirmation for book ${book.name}`);

            const msgRes = await sendLineMessage(user?.lineId, message);
            console.log(`LINE API response for user ${user.name}:`, msgRes);
        }
        
        return res.status(200).json({
            success: true,
            message: 'Servo Opened for Return'
        });

    } catch (err) {
        console.error(`Error returned book with ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: `Invalid Book ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during book returning.'
        });
    }
};

//@desc     Update book status to available
//@route    Post /api/v1/books/sendImage
//@access   Private
exports.sendImage = async (req, res, next) => {
    try {
        const rawName = req.body.predicted_class;

        // decode URI encoding if any (e.g. %20)
        let bName = decodeURIComponent(rawName);
        
        // replace underscores with spaces
        bName = bName.replace(/_/g, " ");
        
        // trim extra spaces
        bName = bName.trim();
        
        console.log("Decoded Book Name:", bName);

        const book = await Book.find({name : bName});

        if (!book) {
            return res.status(404).json({
                success: false,
                error: `Book not found with ID: ${book._id}`
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'reveived image and found book'
        });

    } catch (err) {
        console.error(`Error returned book with ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: `Invalid Book ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during book returning.'
        });
    }
};

const sendLineMessage = async (userId, message) => {
    try {
      const res = await axios.post(
        "https://api.line.me/v2/bot/message/push",
        {
          to: userId,
          messages: [{ type: "text", text: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log("LINE API error:", err.response?.data || err.message);
    }
  };