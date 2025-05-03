import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BookstoreProvider } from "./Contexts/BookstoreContext";

import Home from "./routes/home";
import New from "./routes/new";
import EditBook from "./routes/EditBook";

export default function App() {
  return (
    <BookstoreProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="*" element={<h1>404 - Strona nie istnieje</h1>} />
      </Routes>
      <Footer />
    </BookstoreProvider>
  );
}
