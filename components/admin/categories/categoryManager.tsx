import { useGetCategoriesQuery } from "@/store/categoryApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoryForm from "./categoryForm";
import CategoryList from "./categoryLIst";

const CategoryManager: React.FC = () => {
	const router = useRouter();
	const [page, setPage] = useState(1);

	// Update page state when the router query changes
	useEffect(() => {
		if (router.query.page) {
			setPage(parseInt(router.query.page as string) || 1);
		}
	}, [router.query.page]);
	
	const { data, refetch, isLoading, error } = useGetCategoriesQuery({
		page: page,
		limit: 10,
	});
	useEffect(() => {
		refetch();
	}, [refetch]);
	if (isLoading) return <div className="flex items-center min-h-screen justify-center">Loading...</div>;
	if (error) return <div className="flex items-center min-h-screen justify-center">No Categories Found.</div>;
	const renderCategoryManager = () => (
		<>
			<CategoryForm
				onSubmit={() => {
					refetch();
				}}
				level={"primary"}
			/>
			<CategoryList
				categories={data?.categories || []}
				totalPages={data?.totalPages as number}
				refetch={refetch}
			/>
		</>
	);

	return (
		<div className=" mx-auto  w-full">
			{/* Render Category Manager Based on Active Category */}
			{renderCategoryManager()}
		</div>
	);
};

export default CategoryManager;
