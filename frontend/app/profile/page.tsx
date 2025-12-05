'use client'

import Divider from "@/components/ui/Divider";
import { BookInterface } from "@/interface/book";
import { TransactionInterface } from "@/interface/transaction";
import { getBooksBorrowedByUser } from "@/libs/book";
import { getTransactionsByUser } from "@/libs/transaction";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data : session } = useSession();
  const user = session?.user

  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [booksBorrowed, setBooksBorrowed] = useState<BookInterface[]>([]);

  useEffect(() => {
    async function fetchData() {
      const txRes = await getTransactionsByUser(user?.userId || '');
      setTransactions(txRes.data);

      const bookRes = await getBooksBorrowedByUser(user?.userId || '');
      setBooksBorrowed(bookRes.data);
    }

    fetchData();
  }, [user?.userId]);

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6 mt-20">
      {/* Top Section */}
      <div className="flex items-center justify-around gap-2">
        <Image
          src={user?.picture || ''}
          alt="profile picture"
          width={200}
          height={200}
          className="rounded-full shadow-md"
        />

        <div>
          <h1 className="text-3xl font-semibold">{user?.name}</h1>
          <p className="text-gray-600 capitalize mt-1">{user?.role}</p>

          <div className="mt-4 space-y-1 text-gray-700">
            <p>
              <span className="font-medium">LINE ID:</span> {user?.lineId}
            </p>
          </div>
        </div>
      </div>

      <Divider />

      <h2 className="text-2xl font-semibold mb-4">Currently Borrowing</h2>

      <div className="space-y-4">
        {booksBorrowed?.map((book, idx) => (
          <div
            key={`books-${idx}`}
            className="p-4 border rounded-xl flex gap-4 shadow-sm hover:shadow transition bg-white"
          >
            <img
              src={book.coverImage}
              alt={book.name}
              className="w-24 h-32 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between">
              <div className="space-y-1">
                <p className="font-semibold text-lg">{book.name}</p>
                <p className="font-semibold text-sm">{book.author}</p>
                <p className="text-gray-600 text-sm">
                  Borrowed on {book?.borrowedAt?.toLocaleDateString() ?? ''}
                </p>
              </div>

              <a
                href={`/books/${book.id}`}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View Book →
              </a>
            </div>
          </div>
        ))}
      </div>

      {booksBorrowed?.length === 0 && (
        <p className="text-gray-500 mb-10">You are not borrowing any books.</p>
      )}

      <Divider/>

      <h2 className="text-2xl font-semibold mb-4">History</h2>

      <div className="space-y-4">
        {transactions?.map((trans) => (
          <div
            key={trans.id}
            className="p-4 border rounded-xl shadow-sm hover:shadow transition bg-white"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-lg">{trans.book.name}</p>
                <p className="text-gray-600 text-sm">Transaction ID: {trans.id}</p>

                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Borrowed:</span>{" "}
                    {trans.borrowDate.toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Return By:</span>{" "}
                    {trans.returnDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {transactions.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No borrowing history yet.
        </p>
      )}
    </div>
  );
}
