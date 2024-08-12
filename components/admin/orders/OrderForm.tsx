import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Order } from "./types"; // Import the order type

interface OrderFormProps {
  initialData?: Order;
  onSubmit: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ initialData, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      customerName: initialData?.customerName || "",
      date: initialData?.date || new Date().toISOString().slice(0, 10),
      status: initialData?.status || "pending",
      totalAmount: initialData?.totalAmount || 0,
      items: initialData?.items || [],
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Customer name is required"),
      date: Yup.string().required("Date is required"),
      status: Yup.string().required("Status is required"),
      totalAmount: Yup.number().required("Total amount is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values as Order);
    },
  });

  return (
    <Formik
      initialValues={formik.initialValues}
      validationSchema={formik.validationSchema}
      onSubmit={formik.handleSubmit}
    >
      {() => (
        <Form className="bg-white p-6 shadow-lg rounded-lg mt-4">
          <h2 className="text-2xl font-bold mb-4">
            {initialData ? "Edit Order" : "Add Order"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Name</label>
            <Field
              name="customerName"
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <ErrorMessage
              name="customerName"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <Field
              name="date"
              type="date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <Field
              name="status"
              as="select"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </Field>
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Amount</label>
            <Field
              name="totalAmount"
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <ErrorMessage
              name="totalAmount"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          {/* You can add inputs for items here */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {initialData ? "Update Order" : "Add Order"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
