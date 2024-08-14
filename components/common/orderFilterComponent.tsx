// components/Filter.tsx
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

const Filter = () => {
  const router = useRouter();
  const { query } = router;

  // Handle changes to the filters
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Update the query parameters
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        [name]: value
      }
    });
  };

  // Handle the reset of all filters
  const handleReset = () => {
    // Clear all query parameters
    router.push({
      pathname: router.pathname,
      query: {}
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-5 ">
      <h3 className="text-lg font-semibold mb-4">Filter Orders</h3>
      <div className="space-y-4 flex flex-col gap-4 items-center justify-center flex-wrap">
        <div className="flex items-center space-x-2">
          <label htmlFor="startDate" className="w-24 text-gray-700">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={query.startDate || ''}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="endDate" className="w-24 text-gray-700">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={query.endDate || ''}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="status" className="w-24 text-gray-700">Status:</label>
          <select
            id="status"
            name="status"
            value={query.status || ''}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button
          onClick={handleReset}
          className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
