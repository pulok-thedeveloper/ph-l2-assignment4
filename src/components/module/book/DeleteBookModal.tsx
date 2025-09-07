import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteBookMutation } from "@/redux/api/bookApi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface DeleteBookModalProps {
  bookID: string;
}

const DeleteBookModal = ({ bookID }: DeleteBookModalProps) => {
  const [open, setOpen] = useState(false);

  const [deleteBook, { isLoading, isSuccess, isError }] = useDeleteBookMutation();

  const handleDelete = async () => {
    try {
      await deleteBook(bookID).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book deleted successfully!");
      setOpen(false);
    }
    if (isError) {
      toast.error("Failed to delete book.");
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this book? This action cannot be undone.</p>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
