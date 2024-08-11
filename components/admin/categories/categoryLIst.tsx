// components/CategoryList.tsx
import React from "react";
import { CategoryItem } from "./categoryItem";
import { Category } from "./types"; // Import the type from the shared file
interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (_id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-4">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Slug</th>
            <th className="py-3 px-6 text-left">Thumbnail</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {categories.map((category) => (
            <CategoryItem
              key={category._id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
