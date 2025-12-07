"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Divider from "@/components/ui/Divider";
import { borrowBook, getBook, returnBook } from "@/libs/book";
import { BookInterface } from "@/interface/book";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getTransactionsByBook } from "@/libs/transaction";
import { TransactionInterface } from "@/interface/transaction";
import { useModal } from "@/providers/ModalProvider";
import LoadingModal from "@/components/common/LoadingModal";
import AlertModal from "@/components/common/AlertModal";

export default function BookDetail() {
  const {openModal, closeModal} = useModal();

  const [book, setBook] = useState<BookInterface>();
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])
  const [loading, setLoading] = useState(false);

  const { data: session, status, update } = useSession();

  const params = useParams();
  const id = params.id as string; 

  useEffect(() => {
    async function fetchData() {
      const res = await getBook(id);
      setBook(res.data);

      const transactionRes = await getTransactionsByBook(id);
      setTransactions(transactionRes.data);

      setLoading(false);
    }
    setLoading(true)
    fetchData();
  }, [id]);

  useEffect(() => {
    if (session && !session.user?.userId) {
      console.log("🔄 Forcing session refresh to get userId...");
      update(); 
    }
  }, [session, update]);

  const handleReturnBook = async () => {
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

  if (loading) return (
    <div className="flex justify-center mt-32 p-16 h-30 w-30 text-center">
      <LoadingSpinner className="!size-24"/>
    </div>
  )
  if (!book && !loading) return <p className="p-6 mt-20 w-full text-center justify-center">Book not found</p>;

  return (
    <div className="p-10 md:px-20 py-10 w-full xl:w-[60%] items-center justify-center gap-5 mx-auto mt-20 flex flex-col">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 mx-auto items-center">
        <img
          src={book?.cover || ''}
          alt={book?.name}
          className="w-50 h-80 object-cover rounded-lg shadow mb-6"
        />
  
        <div className="">
          <h1 className="text-4xl font-bold">{book?.name}</h1>
          <p className="text-gray-600 mt-2 text-lg">by {book?.author}</p>
  
          <p className="mt-6 text-gray-700">{book?.desc}</p>

          <button
            onClick={handleReturnBook}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 shadow-lg"
            disabled={!session?.user}
          >
            Return Book
          </button>
        </div>
      </div>

      <div className="w-full md:w-[80%]">
          <Divider />
          <h2 className="mt-6 text-2xl font-bold mb-4 ml-2">Recent Activity</h2>
  
          <div className="space-y-4">
            {transactions.map((trans) => (
              <div
                key={trans._id}
                className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
              >
                <p className="text-lg font-semibold">{trans?.user?.name}</p>
  
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Returned By:</span>{" "}
                    {trans.user.name ? (
                      (trans?.user.name || '')
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
