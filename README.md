# Library Management System - Frontend

This is the **frontend application** for the Library Management System, built with **React**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. The application provides a user-friendly interface to view, add, edit, delete, and borrow books. It also displays a borrow summary with sorting functionality.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Running the Project](#running-the-project)  
- [Environment Variables](#environment-variables)  
- [API Integration](#api-integration)  
- [Components](#components)  

---

## Features

- Responsive UI using **Tailwind CSS** and **ShadCN components**  
- Browse books with **genre tabs**, **sorting**, and **backend-driven pagination**  
- **Add, edit, and delete books** using modals  
- **Borrow books** with quantity and due date  
- **View borrow summary** in a sortable table  
- Loading skeletons and error handling for all API calls  
- Dark mode toggle support  

---

## Tech Stack

- **React 18** with **Vite**  
- **TypeScript** for type safety  
- **Redux Toolkit & RTK Query** for state management and API handling  
- **Tailwind CSS** for styling  
- **ShadCN/UI** component library  
- **React Hook Form** for handling forms  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/library-frontend.git
cd library-frontend
```

2. Install dependencies:

```bash
Copy code
npm install

# or
yarn install
```
## Running the Project
```bash
Copy code
npm run dev
# or
yarn dev
The frontend will run on http://localhost:5173.
```

## Environment Variables
Create a .env file in the root directory:

env
Copy code
VITE_API_BASE_URL=https://your-backend-api.com/api


## API Integration
The frontend uses RTK Query for API requests:

Books API

GET /books – Fetch books (supports filters, sorting, pagination)

POST /books – Add a book

PUT /books/:id – Edit a book

DELETE /books/:id – Delete a book

Borrow API

POST /borrow – Borrow a book

GET /borrow – Fetch borrow summary

## Components
BookCard – Displays book information with actions: Edit, Delete, Borrow, Details

AddBookModal – Form to add a new book

EditBookModal – Form to edit book details

DeleteBookModal – Confirm deletion of a book

BorrowBookModal – Borrow a book with quantity and due date

DetailsBookModal – Shows book details in a modal