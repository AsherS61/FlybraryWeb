"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Divider from "@/components/ui/Divider";
import { borrowBook, getBook, returnBook } from "@/libs/book";
import { BookInterface } from "@/interface/book";

export default async function BookDetail({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [book, setBook] = useState<BookInterface>();

  const [transactions, setTransactions] = useState([
    {
      id: "T001",
      userName: "John Doe",
      borrowDate: "2025-01-01",
      returnDate: null,
    },
    {
      id: "T002",
      userName: "Alice Smith",
      borrowDate: "2024-12-10",
      returnDate: "2024-12-28",
    },
    {
      id: "T003",
      userName: "Michael Chan",
      borrowDate: "2024-11-01",
      returnDate: "2024-11-20",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getBook(params.id);
      setBook(res.data);
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  const handleBorrowBook = async () => {
    const res = await borrowBook(params.id, session?.user.userId || '');
    if (res.ok) {
      location.reload();
    }
  }

  const handleReturnBook = async () => {
    const res = await returnBook(params.id);
    if (res.ok) {
      location.reload();
    }
  }

  if (loading) return <p className="p-6 mt-20 w-full text-center justify-center">Loading...</p>;
  if (!book && !loading) return <p className="p-6 mt-20 w-full text-center justify-center">Book not found</p>;

  const isBorrowedByUser = book?.borrowedBy === session?.user?.userId;

  return (
    <div className="p-10 md:px-20 py-10 w-full items-center justify-center gap-5 mx-auto mt-20 flex flex-col">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 mx-auto items-center">
        <img
          src={book?.coverImage || ''}
          alt={book?.name}
          className="w-50 h-80 object-cover rounded-lg shadow mb-6"
        />
  
        <div className="">
          <h1 className="text-4xl font-bold">{book?.name}</h1>
          <p className="text-gray-600 mt-2 text-lg">by {book?.author}</p>
  
          <p className="mt-6 text-gray-700">{book?.desc}</p>
   
          <div className="mt-6">
              <span className={`px-4 py-2 rounded-full text-sm shadow-md ${
                  book?.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"}`}
              >
                {book?.status === "available" ? "Available" : "Borrowed"}
              </span>
          </div>
          <div className="mt-8">
              {book?.status === "available" ? (
              <button
                  onClick={handleBorrowBook}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg"
              >
                  Borrow Book
              </button>
              ) : isBorrowedByUser ? (
              <button
                  onClick={handleReturnBook}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 shadow-lg"
              >
                  Return Book
              </button>
              ) : (
              <button
                  disabled
                  className="bg-gray-300 text-gray-600 px-6 py-3 rounded-lg cursor-not-allowed shadow-lg"
              >
                  Not Available
              </button>
              )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-[80%]">
          <Divider />
          <h2 className="mt-6 text-2xl font-bold mb-4 ml-2">History</h2>
  
          <div className="space-y-4">
            {transactions.map((trans) => (
              <div
                key={trans.id}
                className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
              >
                <p className="text-lg font-semibold">{trans.userName}</p>
  
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Borrowed:</span>{" "}
                    {trans.borrowDate}
                  </p>
                  <p>
                    <span className="font-medium">Returned:</span>{" "}
                    {trans.returnDate ? (
                      trans.returnDate
                    ) : (
                      <span className="text-red-600">Not returned</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
  
          {transactions.length === 0 && (
            <p className="text-gray-500 text-center mt-6">
              No transaction history.
            </p>
          )}
        </div>

    </div>
  );
}
