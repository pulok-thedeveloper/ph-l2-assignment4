import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import type { IBook } from "@/Types";

interface DetailsModalProps {
  book: IBook;
}

const DetailsModal = ({ book }: DetailsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>
            By {book.author} — {book.genre.replace("_", " ")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {book.description && (
            <p className="text-sm leading-relaxed">{book.description}</p>
          )}
          <p className="text-sm">
            <span className="font-semibold">ISBN:</span> {book.isbn}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Copies:</span> {book.copies}
          </p>
          <p className="text-sm font-semibold">
            {book.availvable ? "✅ Available" : "❌ Not Available"}
          </p>
        </div>

        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
