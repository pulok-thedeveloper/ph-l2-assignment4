"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useBorrowSummaryQuery } from "@/redux/api/bookApi";

interface BorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

const BorrowSummary = () => {
  const { data, isLoading, isError } = useBorrowSummaryQuery(undefined);
  const [summary, setSummary] = useState<BorrowSummaryItem[]>([]);

  useEffect(() => {
    if (data?.success && data.data) {
      setSummary(data.data);
    }
  }, [data]);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Borrow Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full rounded-md" />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-red-500 text-center">
              Failed to load borrow summary. Please try again.
            </p>
          )}

          {!isLoading && summary.length === 0 && (
            <p className="text-center text-muted-foreground">
              No books have been borrowed yet.
            </p>
          )}

          {!isLoading && summary.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Total Borrowed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.map((item, idx) => (
                    <TableRow key={idx} className="hover:bg-muted/10 transition-colors">
                      <TableCell>{item.book.title}</TableCell>
                      <TableCell>{item.book.isbn}</TableCell>
                      <TableCell>{item.totalQuantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default BorrowSummary;
