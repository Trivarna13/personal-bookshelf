import { useState, useEffect } from "react";

const Bookshelf = () => {
	const [bookshelf, setBookshelf] = useState([]);

	useEffect(() => {
		const storedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
		setBookshelf(storedBooks);
	}, []);

	const deleteFromBookshelf = (bookKey) => {
		const updatedBookshelf = bookshelf.filter(
			(book) => book.key !== bookKey
		);
		setBookshelf(updatedBookshelf);
		localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
	};

	return (
		<div className="w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto h-screen py-4 px-4 md:px-28 font-sans">
			<div className="flex flex-col sm:flex-row justify-between items-center mx-3.5 sm:mx-0 md:mx-3.5 lg:mx-3 xl:mx-0 2xl:mx-2">
				<h2 className="font-bold text-xl mx-auto p-2">My Bookshelf</h2>

				<button
					onClick={() => (window.location.href = "/")}
					className="bg-indigo-500 text-white p-4 rounded-full hover:bg-indigo-700/100 transition-colors duration-300"
				>
					Go To Search
				</button>
			</div>
			<div className="">
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4 mt-4">
					{bookshelf.map((book, index) => (
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
							<button
								onClick={() => deleteFromBookshelf(book.key)}
								className="bg-indigo-500 text-white p-2 mt-2 rounded-lg hover:bg-indigo-700/100 transition-colors duration-300"
							>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Bookshelf;
