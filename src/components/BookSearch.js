import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const BookSearch = ({ addToBookshelf, bookshelf }) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [highlight, setHighlight] = useState(false);

	useEffect(() => {
		const fetchInitialBooks = async () => {
			const res = await fetch(
				`https://openlibrary.org/search.json?q=lord+of+the+rings&limit=10&page=1`
			);
			const data = await res.json();
			setResults(data.docs);
		};

		fetchInitialBooks();
	}, []);

	const searchBooks = async (e) => {
		setQuery(e.target.value);
		if (e.target.value.length > 2) {
			const res = await fetch(
				`https://openlibrary.org/search.json?q=${e.target.value}&limit=10&page=1`
			);
			const data = await res.json();
			setResults(data.docs);
		} else {
			setResults([]);
		}
	};

	const handleAddToBookshelf = (book) => {
		addToBookshelf(book);
		setHighlight(true);
		setTimeout(() => setHighlight(false), 1000);
	};

	const isBookInBookshelf = (book) => {
		return bookshelf.some((b) => b.key === book.key);
	};

	return (
		<div className="w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto h-screen py-4 px-4 md:px-28 font-sans">
			<div className="flex flex-col sm:flex-row justify-between items-center mx-3.5 sm:mx-0 md:mx-3.5 lg:mx-3 xl:mx-0 2xl:mx-2">
				<div className="w-auto sm:w-auto mb-4 sm:mb-0">
					<label
						htmlFor="searchInput"
						className="border p-2 rounded-lg border-indigo-500/100 flex items-center focus-within:border-black"
					>
						<FiSearch className="text-indigo-500/100" size={22} />
						<input
							id="searchInput"
							type="text"
							value={query}
							onChange={searchBooks}
							placeholder="Search by book name..."
							className="p-2 w-auto focus:outline-none ml-2"
						/>
					</label>
				</div>

				<button
					onClick={() => (window.location.href = "/bookshelf")}
					className={`bg-indigo-500/100 text-white p-4 rounded-full ${
						highlight ? "highlight" : ""
					} hover:bg-indigo-700/100 transition-colors duration-300`}
				>
					My Bookshelf
					<span className="ml-2 bg-white text-indigo-500/100 rounded-full px-2">
						{bookshelf.length}
					</span>
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4 mt-4">
				{results.map((book, index) => (
					<div
						key={index}
						className="border p-4 w-60 h-75 mx-auto flex flex-col justify-between rounded-md shadow-lg"
					>
						<div className="h-40 flex flex-col justify-around">
							<h3 className="font-bold">{book.title}</h3>
							<p className="flex">
								<span className="font-bold mr-2">
									Edition Count:
								</span>
								{book.edition_count}
							</p>
						</div>
						{!isBookInBookshelf(book) && (
							<button
								onClick={() => handleAddToBookshelf(book)}
								className="bg-indigo-500/100 text-white p-2 mt-2 rounded-lg hover:bg-indigo-700/100 transition-colors duration-300"
							>
								Add to Bookshelf
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default BookSearch;
