import DashboardLayout from "@/Layouts/AdminLayouts";
import Head from "next/head";

const Orders = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Manage Orders - Admin Dashboard</title>
        <meta name="description" content="Manage orders in the admin dashboard. View, process, and update order statuses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-2xl font-semibold text-gray-700">Manage Orders</h2>
      {/* Content for managing orders goes here */}
    </DashboardLayout>
  );
};

export default Orders;
