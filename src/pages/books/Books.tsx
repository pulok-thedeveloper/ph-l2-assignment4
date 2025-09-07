"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/module/book/BookCard";
import { useLazyGetBooksQuery } from "@/redux/api/bookApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AddBookModal from "@/components/module/book/AddBookModal";
import type { IBook } from "@/Types";

type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";


const Books = () => {
  const [activeGenre, setActiveGenre] = useState<Genre | "ALL">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<IBook[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(8);
  const [sortBy, setSortBy] = useState<"title" | "author" | "copies">("title");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const [getBooks, { isLoading, isError, isSuccess, data, error }] = useLazyGetBooksQuery();

  const genres: Genre[] = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];

  useEffect(() => {
    getBooks({
      filter: activeGenre === "ALL" ? undefined : activeGenre,
      page: currentPage,
      limit,
      sortBy,
      sort,
    });
  }, [activeGenre, currentPage, limit, sortBy, sort, getBooks]);

  useEffect(() => {
    if (isSuccess && data) {
      setBooks(data.data);
      setTotalPages(data.totalPages);
    }
  }, [isSuccess, data]);

  const handleGenreChange = (genre: Genre | "ALL") => {
    setActiveGenre(genre);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setCurrentPage(1);
  };

  const handleSortChange = (field: "title" | "author" | "copies") => {
    if (sortBy === field) {
      setSort(sort === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSort("asc");
    }
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <span>Sort by:</span>
          <Button variant="outline" size="sm" onClick={() => handleSortChange("title")}>
            Title {sortBy === "title" ? (sort === "asc" ? "↑" : "↓") : ""}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSortChange("author")}>
            Author {sortBy === "author" ? (sort === "asc" ? "↑" : "↓") : ""}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSortChange("copies")}>
            Copies {sortBy === "copies" ? (sort === "asc" ? "↑" : "↓") : ""}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span>Books per page:</span>
          <Select onValueChange={(val) => handleLimitChange(parseInt(val, 10))} defaultValue={limit.toString()}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[4, 8, 12, 16].map((n) => (
                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        <AddBookModal/>
        </div>
      </div>

      <Tabs value={activeGenre} onValueChange={(val) => handleGenreChange(val as Genre | "ALL")}>
        <TabsList className="flex flex-wrap justify-center mb-8">
          <TabsTrigger value="ALL">All</TabsTrigger>
          {genres.map((g) => (
            <TabsTrigger key={g} value={g}>
              {g.replace("_", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeGenre}>
          {isLoading && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: limit }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <p className="text-center text-red-500">
              Failed to load books. {error && "status" in error ? error.status : ""}
            </p>
          )}

          {isSuccess && books.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}

          {isSuccess && books.length === 0 && (
            <p className="text-center text-muted-foreground">
              No books found in this category.
            </p>
          )}
        </TabsContent>
      </Tabs>

      {isSuccess && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
};

export default Books;
