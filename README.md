# Medicine E-commerce Platform

This is a medicine e-commerce platform built with Next.js, Tailwind CSS, Redux Toolkit, and RTK Query. The platform allows users to browse and purchase medicines with an intuitive interface, manage their carts, and complete purchases with a smooth checkout experience.

## Features

- **User Authentication**: Registration, login, and email verification with JWT-based authentication.
- **Product Management**: Browse products by categories, view detailed product information, and manage product variants.
- **Shopping Cart**: Add products to the cart, manage quantities, and view a cart summary with pricing details.
- **Admin Dashboard**: Manage products, categories, orders, and users with role-based access control.
- **Checkout Process**: Secure checkout process with shipping address management and order tracking.
- **SEO Optimization**: Implements SEO best practices with dynamic and static meta tags.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mahbub-dev/medicine-ecommerce-frontend
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo-name
    ```

3. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
