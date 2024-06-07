import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import Bookshelf from "./components/Bookshelf";

const App = () => {
	const [bookshelf, setBookshelf] = useState([]);

	useEffect(() => {
		const storedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
		setBookshelf(storedBooks);
	}, []);

	const addToBookshelf = (book) => {
		const newBookshelf = [...bookshelf, book];
		setBookshelf(newBookshelf);
		localStorage.setItem("bookshelf", JSON.stringify(newBookshelf));
	};

	return (
		<Router>
			<Routes>
				<Route path="/bookshelf" element={<Bookshelf />} />
				<Route
					path="/"
					element={
						<BookSearch
							addToBookshelf={addToBookshelf}
							bookshelf={bookshelf}
						/>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
