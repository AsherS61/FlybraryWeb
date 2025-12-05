const Book = require('../models/Book.js')

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
        const userId = req.params.id;
        const books = await Book.find({ borrowedBy: userId });
        if (!books) {
            return res.status(404).json({
                success: false,
                error: `Books not found for User ID: ${userId}`
            });
        }
        return res.status(200).json({
            success: true,
            data: books
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


//@desc     Update book status to borrowed
//@route    Put /api/v1/books/borrow/:id
//@access   Private
exports.borrowBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const userId = req.body.userId;

        console.log("1. Starting borrow - Book ID:", bookId, "User ID:", userId);

        const book = await Book.findById(bookId);
        console.log("2. Book found:", book ? "YES" : "NO");

        const user = await User.findById(userId);
        console.log("3. User found:", user ? "YES" : "NO");

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

        console.log("4. About to update book...");
        book.status = 'borrowed';
        book.borrowedBy = userId;
        await book.save();
        console.log("5. Book saved!");

        console.log("6. About to create transaction...");
        await Transaction.create({
            user: userId,
            book: bookId,
            borrowDate: new Date(),
            returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        console.log("7. Transaction created!");

        return res.status(200).json({
            success: true,
            data: book,
            message: 'Book borrowed successfully'
        });

    } catch (err) {
        console.error("FULL ERROR OBJECT:", err);
        console.error("ERROR NAME:", err.name);
        console.error("ERROR MESSAGE:", err.message);
        console.error("ERROR STACK:", err.stack);

        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: `Invalid ID format: ${err.message}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during book borrowing.',
            debug: err.message  // Temporarily add this
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

        if (!book) {
            return res.status(404).json({
                success: false,
                error: `Book not found with ID: ${bookId}`
            });
        }

        if (book.status === 'available') {
            return res.status(400).json({
                success: false,
                error: 'Book is already available'
            });
        }

        book.status = 'available';
        book.borrowedBy = null;
        await book.save();
        
        return res.status(200).json({
            success: true,
            data: book,
            message: 'Book returned successfully'
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