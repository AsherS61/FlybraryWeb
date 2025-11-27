import Divider from "@/components/ui/Divider";
import Link from "next/link";

export default async function BooksPage() {

  const books = [
  {
      id: "QR001",
      name: "The Art of Programming",
      desc: "A comprehensive guide to algorithms, data structures, and software engineering principles.",
      author: "Donald Knuth",
      status: "available",
      coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400",
  },
  {
      id: "QR002",
      name: "Clean Code",
      desc: "A handbook of agile software craftsmanship focusing on writing clean, maintainable code.",
      author: "Robert C. Martin",
      status: "borrowed",
      coverImage:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400",
  },
  {
      id: "QR003",
      name: "Introduction to AI",
      desc: "A modern introduction to artificial intelligence concepts, models, and applications.",
      author: "Stuart Russell",
      status: "available",
      coverImage:
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=400",
  },
  {
      id: "QR004",
      name: "Database Systems",
      desc: "Covers relational DBs, NoSQL, transactions, and distributed systems.",
      author: "Hector Garcia-Molina",
      status: "borrowed",
      coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400",
  },
  ];


  return (
    <div className="p-4 md:px-10 mt-20">
      <h1 className="text-3xl font-bold mb-4 ml-6">Books</h1>
      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {books.map((book: any) => (
          <Link
            href={`/books/${book.id}`}
            key={book.id}
            className="relative p-4 border gap-4 rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col sm:flex-row"
          >
            <span
              className={`absolute top-3 right-3 px-3 py-1 text-sm rounded-full shadow-md ${
                book.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book.status === "available" ? "Available" : "Borrowed"}
            </span>
      
            <img
              src={book.coverImage}
              alt={book.name}
              className="w-full sm:w-48 h-64 object-cover rounded-lg"
            />
      
            <div className="p-4 w-full">
              <h2 className="text-xl font-semibold">{book.name}</h2>
              <p className="text-gray-600 font-semibold text-sm">{book.author}</p>
      
              <Divider />
      
              <p className="text-gray-600 line-clamp-4">{book.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
