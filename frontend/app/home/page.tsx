'use client'

import { useEffect, useState } from 'react';
import { Book, Users, TrendingUp, Clock, Search, Filter } from 'lucide-react';
import { getBooks } from '@/libs/book';
import { BookInterface } from '@/interface/book';
import { getTransactions } from '@/libs/transaction';
import { TransactionInterface } from '@/interface/transaction';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function LibraryDashboard() {
  const router = useRouter();

  const [bookLoading, setBookLoading] = useState(false)
  const [transLoading ,setTransLoading] = useState(false)

  const [books, setBooks] = useState<BookInterface[]>([])
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await getBooks()
      setBooks(res.data);
      setBookLoading(false);
    }

    setBookLoading(true);
    fetchData();
  }, []);
  
  useEffect(() => {
    async function fetchData() {
      const txres = await getTransactions()
      setTransactions(txres.data);
      setTransLoading(false);
    }

    setTransLoading(true);
    fetchData();
  }, []);

  const stats = {
    totalBooks: books.length,
    availableBooks: books.filter(b => b.status === 'available').length,
    borrowedBooks: books.filter(b => b.status === 'borrowed').length,
    totalTransactions: transactions.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-50 p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Flybrary</h1>
          <p className="text-gray-600">Manage your book collection and track borrowing activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Books</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.totalBooks}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Available</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.availableBooks}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Borrowed</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.borrowedBooks}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.totalTransactions}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Book Collection</h2>
              </div>

              {bookLoading ? 
                (<LoadingSpinner></LoadingSpinner> )
              : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {books.slice(0,4).map(book => (
                    <div key={book._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="flex gap-4">
                        <img
                          src={book?.cover}
                          alt={book?.name}
                          className="w-20 h-28 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{book?.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {book?.author}</p>
                          <p className="text-xs text-gray-500 mb-2">ISBN: {book?.ISBN}</p>
                          <span
                            className={`absolute top-3 right-3 px-3 py-1 text-sm rounded-full shadow-md ${
                              book.status === "available"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {book?.status === "available" ? "Available" : "Borrowed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => router.push('/books')}
                >
                  View All Books
                </button>
              </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>

              {transLoading ? <LoadingSpinner></LoadingSpinner> 
              : <>
                <div className="space-y-4">
                  {transactions.slice(0,6).map(transaction => (
                    <div key={transaction._id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-start gap-3">
                        <img
                          src={transaction?.user.profile}
                          alt={transaction.user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{transaction?.user.name}</p>
                          <p className="text-sm text-gray-600 line-clamp-1">{transaction?.book.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Due: {transaction?.returnBy.toString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};