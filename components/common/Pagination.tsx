import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface PaginationProps {
	totalPages: number;
	onPageChange: (page: number) => void;
}

const GlobalPagination: React.FC<PaginationProps> = ({
	totalPages,
	onPageChange,
}) => {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		// Check if there's a 'page' query in the URL, and set currentPage accordingly
		const pageQuery = router.query.page;
		const pageNumber = pageQuery ? parseInt(pageQuery as string) : 1;
		setCurrentPage(pageNumber);
	}, [router.query.page]);

	const visiblePages = 3; // Number of visible pages around the current page

	const generatePageNumbers = () => {
		let pages = [];
		let left = Math.max(1, currentPage - visiblePages);
		let right = Math.min(totalPages, currentPage + visiblePages);

		if (left > 2) pages.push(1, "...");
		if (left === 2) pages.push(1);

		for (let i = left; i <= right; i++) {
			pages.push(i);
		}

		if (right < totalPages - 1) pages.push("...", totalPages);
		if (right === totalPages - 1) pages.push(totalPages);

		return pages;
	};

	const handlePageClick = (page: number | string) => {
		if (typeof page === "number" && page !== currentPage) {
			router.push(
				{
					query: { ...router.query, page: page.toString() }, // Update the query param with the new page number
				},
				undefined,
				{ scroll: false } // Prevent scrolling to the top on page change
			);
			onPageChange(page); // Call the callback function to update the state or fetch data
		}
	};

	const pages = generatePageNumbers();

	
	return (
		<div className="flex justify-center items-center mt-4 space-x-2">
			<button
				onClick={() => handlePageClick(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
				&laquo;
			</button>
			{pages.map((page, index) =>
				typeof page === "number" ? (
					<button
						key={index}
						onClick={() => handlePageClick(page)}
						className={`px-3 py-1 rounded ${
							page === currentPage
								? "bg-blue-500 text-white"
								: "bg-white"
						} border hover:bg-gray-200`}>
						{page}
					</button>
				) : (
					<span key={index} className="px-3 py-1">
						{page}
					</span>
				)
			)}
			<button
				onClick={() => handlePageClick(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
				&raquo;
			</button>
		</div>
	);
};

export default GlobalPagination;
