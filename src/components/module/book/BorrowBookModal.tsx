import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler, } from "react-hook-form";
import { toast } from "react-toastify";
import { useBorrowBookMutation } from "@/redux/api/bookApi";
import type { IBook } from "@/Types";

interface BorrowBookModalProps {
  book: IBook;
}

interface BorrowForm {
  quantity: number;
  dueDate: string;
}

const BorrowBookModal = ({ book }: BorrowBookModalProps) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<BorrowForm>();
  const [borrowBook, { isLoading, isSuccess, isError }] = useBorrowBookMutation();

  const onSubmit: SubmitHandler<BorrowForm> = async (data) => {
    try {
      await borrowBook({
        book: book._id,
        quantity: data.quantity,
        dueDate: new Date(data.dueDate),
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`You have borrowed "${book.title}" successfully!`);
      setOpen(false);
      reset();
    }
    if (isError) {
      toast.error("Failed to borrow the book. Try again.");
    }
  }, [isSuccess, isError, book.title, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={!book.availvable}>
          Borrow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Borrow "{book.title}"</DialogTitle>
          <DialogDescription>
            Are you sure you want to borrow this book? It will be marked as
            unavailable if no copies remain.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-1">
            Quantity
            <Input
              type="number"
              defaultValue={1}
              min={1}
              max={book.copies}
              {...register("quantity", { required: true, min: 1, max: book.copies })}
            />
          </label>

          <label className="flex flex-col gap-1">
            Due Date
            <Input type="date" {...register("dueDate", { required: true })} />
          </label>

          <DialogFooter className="mt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;