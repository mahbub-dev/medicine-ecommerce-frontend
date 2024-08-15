const ShippingAddressView = ({ address }: any) => {
	return (
		<div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden p-4">
			<h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
			<div className="space-y-2">
				<div className="flex">
					<span className="font-semibold w-32">Name:</span>
					<span>{address.name}</span>
				</div>
				<div className="flex">
					<span className="font-semibold w-32">Phone:</span>
					<span>{address.phone}</span>
				</div>
				<div className="flex">
					<span className="font-semibold w-32">Address:</span>
					<span>{address.address}</span>
				</div>
				<div className="flex">
					<span className="font-semibold w-32">Division:</span>
					<span>{address.division}</span>
				</div>
				<div className="flex">
					<span className="font-semibold w-32">District:</span>
					<span>{address.district}</span>
				</div>
				<div className="flex">
					<span className="font-semibold w-32">Sub-District:</span>
					<span>{address.subDistrict}</span>
				</div>
				{/* <div className="flex">
					<span className="font-semibold w-32">Created At:</span>
					<span>{new Date(address.createdAt).toLocaleString()}</span>
				</div>
				<div className="flex">
					<span className="font-semibold w-32">Updated At:</span>
					<span>{new Date(address.updatedAt).toLocaleString()}</span>
				</div> */}
			</div>
		</div>
	);
};

export default ShippingAddressView