import App from "@/App";
import Books from "@/pages/books/Books";
import BorrowSummary from "@/pages/borrowed/BorrowSummary";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Books
      },
      {
        path: "books",
        Component: Books
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary
      },
    ],
  },
]);
