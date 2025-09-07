"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";
import type { IBook } from "@/Types";
import BorrowBookModal from "./BorrowBookModal";
import DetailsModal from "./DetailsModal";


export default function BookCard({ book }: { book: IBook }) {
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{book.title}</CardTitle>
        <CardDescription>
          {book.author} — <span className="capitalize">{book.genre}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {book.description}
        </p>
        <p className="mt-2 text-sm">
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Copies:</span> {book.copies}
        </p>
        <p
          className={`text-sm font-semibold ${
            book.availvable ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.availvable ? "Available" : "Not Available"}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between flex-wrap gap-2">
        <EditBookModal book={book} />
        <DeleteBookModal bookID={book._id} />
        <BorrowBookModal book={book} />
        <DetailsModal book={book} />
      </CardFooter>
    </Card>
  );
}
