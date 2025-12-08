'use client';

import AlertModal from "@/components/common/AlertModal";
import LoadingModal from "@/components/common/LoadingModal";
import Divider from "@/components/ui/Divider";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { BookInterface } from "@/interface/book";
import { getBooks, returnBook } from "@/libs/book";
import { useModal } from "@/providers/ModalProvider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function BooksPage() {
  const {data : session} = useSession();
  const {openModal, closeModal} = useModal();

  const [books,setBooks] = useState<BookInterface[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      const res = await getBooks()
      setBooks(res.data);
      setLoading(false);
    }

    setLoading(true);
    fetchData();
  }, []);

  const handleReturnBook = async (id : string) => {
    openModal(
      <LoadingModal
        id='loading'
        message='กำลังคืนหนังสือ...'
      />
    )
    try {
      const res = await returnBook(id || '',  session?.user?.userId || '');
        if (res.success) {
          closeModal();
          location.reload();
        }
      } catch (error) {
        closeModal();
        openModal(
          <AlertModal
            id='error'
            color='red'
            confirmText='คืนหนังสือไม่สำเร็จ'
            onConfirm={() => closeModal()}
          />
        )
      }
    }

  return (
    <div className="p-4 md:px-10 mt-20 h-full">
      <h1 className="text-3xl font-bold mb-4 ml-6">Books</h1>
      <Divider />

    {loading && (
      <div className="flex justify-center mt-10 p-10">
        <LoadingSpinner className="!size-24"/>
      </div>
    )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {books.map((book: any) => (
          <div
            key={book._id}
            className="relative p-4 border gap-4 rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col sm:flex-row"
          >
            <img
              src={book.cover}
              alt={book.name}
              className="w-full sm:w-48 h-64 object-cover rounded-lg"
            />
      
            <div className="p-4 w-full">
              <h2 className="text-xl font-semibold">{book?.name}</h2>
              <p className="text-gray-600 font-semibold text-sm">{book?.author}</p>
      
              <Divider />
      
              <p className="text-gray-600 line-clamp-4">{book?.desc}</p>
              
            </div>
            <button
              onClick={() => handleReturnBook(book._id)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 shadow-lg absolute bottom-3 right-3"
              disabled={!session?.user}
            >
              Return Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
