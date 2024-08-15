/* eslint-disable @next/next/no-img-element */
import Modal from "@/components/common/GlobalModal";
import usePagination from "@/hooks/usePagination";
import {
	useGetCategoryByIdQuery,
	useGetSubCategoriesByIdQuery,
} from "@/store/apis/categoryApi";
import React, { useEffect, useState } from "react";
import CategoryForm from "./categoryForm";
import CategoryList from "./categoryLIst";

interface CategoryDetailsProps {
	id: string;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ id }) => {
	const { data: category, isLoading, error } = useGetCategoryByIdQuery(id);
	const { page, router } = usePagination();
	const {
		data,
		refetch,
		isLoading: isListLoading,
		error: listError,
	} = useGetSubCategoriesByIdQuery({
		page: page,
		limit: 10,
		parentCategoryId: id,
		level: category?.level as string,
	});

	const [showEditForm, setShowEditForm] = useState(false);
	const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>404 not found</div>;

	return (
		<div className="container mx-auto p-6">
			{/* <h1 className="text-4xl font-bold mb-8">Category Details</h1> */}
			<button
				className="px-3 py-2 bg-gray-500 rounded text-white"
				onClick={() => router.back()}>
				Back
			</button>
			{category && (
				<div>
					<div className="flex justify-center items-center  ">
						<div className="p-6 rounded-lg shadow-lg bg-gray-200 w-[400px] text-center max-w-md">
							<div className="flex items-center gap-5">
								<img
									width={100}
									height={100}
									src={`${category.thumbnail}`}
									alt={category.name}
									className="mt-4 mx-auto border rounded-full object-cover"
								/>
								<div>
									<h2 className="text-3xl font-semibold mb-4 ">
										{category.name}
									</h2>
									<p className="">Slug: {category.slug}</p>
									<p className="">Level: {category.level}</p>
								</div>
							</div>

							<button
								className="mt-4 btn-primary w-fit"
								onClick={() => {
									setShowSubcategoryForm(false);
									setShowEditForm(!showEditForm);
								}}>
								{showEditForm ? "Cancel" : "Edit"}
							</button>
							{category.level !== "tertiary" && (
								<button
									className="mt-4 btn-primary w-fit"
									onClick={() => {
										setShowEditForm(false);
										setShowSubcategoryForm(
											!showSubcategoryForm
										);
									}}>
									{showSubcategoryForm
										? "Cancel"
										: category.level === "secondary"
										? "Add Tertiary Category"
										: "Add Secondary Category"}
								</button>
							)}
						</div>
					</div>

					{/* for editing the current category  */}
					<Modal
						isOpen={showEditForm}
						onClose={() => setShowEditForm(false)}>
						<CategoryForm
							initialData={category}
							onSubmit={() => setShowEditForm(false)}
							level={category.level}
						/>
					</Modal>
					{/* for adding subcategory  */}
					<Modal
						isOpen={showSubcategoryForm}
						onClose={() => setShowSubcategoryForm(false)}>
						<CategoryForm
							onSubmit={() => refetch()}
							// categories={category} // Only pass the current category for selection as parent
							level={
								category.level === "primary"
									? "secondary"
									: "tertiary"
							}
							parentCategory={category?._id as string}
						/>
					</Modal>

					{/* Subcategory List */}

					<div className="mt-6">
						{isListLoading ? (
							"Loading.."
						) : listError ? (
							<>{"No data found"}</>
						) : (
							<CategoryList
								isChlid={true}
								categories={data?.categories || []}
								totalPages={data?.totalPages as number}
								refetch={refetch}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryDetails;
