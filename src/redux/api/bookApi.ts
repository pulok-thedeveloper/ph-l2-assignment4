import { baseApi } from "./baseApi";

interface GetBooksParams {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
}

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params?: GetBooksParams) => {
        const queryParams = new URLSearchParams();

        if (params?.filter) queryParams.append("filter", params.filter);
        if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.page) queryParams.append("page", params.page.toString());

        return `/books?${queryParams.toString()}`;
      },
      providesTags: ["books"],
    }),
    getBookByID: builder.query({
      query: (bookID) => ({
        url: `/books/${bookID}`,
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ bookData, bookID }) => ({
        url: `/books/${bookID}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (bookID) => ({
        url: `/books/${bookID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),

    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    borrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"]
    }),
  }),
});

export const {
  useGetBooksQuery,
  useLazyGetBooksQuery,
  useAddBookMutation,
  useGetBookByIDQuery,
  useLazyGetBookByIDQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useBorrowSummaryQuery,
  useLazyBorrowSummaryQuery,
} = bookApi;
