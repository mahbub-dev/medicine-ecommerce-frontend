import React, { useState } from "react";
import CategorySelect from "./categorySeleteItem"; // Assuming you already created this component
import SubCategorySelect from "./subCatSelectItem"; // Assuming you already created this component

interface CategoryHierarchySelectProps {
	setFieldValue: (categories: any) => void;
}

const CategoryHierarchySelect: React.FC<CategoryHierarchySelectProps> = ({
	setFieldValue,
}) => {
	const [selectedPrimary, setSelectedPrimary] = useState<string>("");
	const [selectedSecondary, setSelectedSecondary] = useState<string>("");
	const [selectedTertiary, setSelectedTertiary] = useState<string>("");
	const [categories, setCategories] = useState({
		primary: selectedPrimary,
		secodary: selectedSecondary,
		tertiary: selectedTertiary,
	});
	return (
		<>
			<CategorySelect
				name="primaryCategory"
				label="Primary Category"
				selectedCategory={selectedPrimary}
				onCategoryChange={(categoryId) => {
					setSelectedPrimary(categoryId);
					setSelectedSecondary(""); // Reset secondary and tertiary when primary changes
					setFieldValue({ primary: categoryId });
				}}
			/>

			{selectedPrimary && (
				<SubCategorySelect
					name="secondaryCategory"
					label="Secondary Category"
					selectedCategory={selectedSecondary}
					onCategoryChange={(categoryId) => {
						setSelectedSecondary(categoryId);
						setFieldValue({
							selectedPrimary,
							secondary: categoryId,
						});

					
					}}
					parentCategoryId={selectedPrimary}
					level="secondary"
				/>
			)}

			{selectedSecondary && (
				<SubCategorySelect
					name="tertiaryCategory"
					label="Tertiary Category"
					selectedCategory={selectedTertiary} // Tertiary category will be the final selected category
					onCategoryChange={(categoryId) => {
						setSelectedTertiary(categoryId);
						setFieldValue({
							selectedPrimary,
                            selectedSecondary,
							tertiary: categoryId,
						});
					}}
					parentCategoryId={selectedSecondary}
					level="tertiary"
				/>
			)}
		</>
	);
};

export default CategoryHierarchySelect;
