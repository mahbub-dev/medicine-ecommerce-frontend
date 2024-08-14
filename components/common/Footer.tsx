// components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">MediStore</h4>
            <p>Your trusted online medicine store.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-6 text-sm text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} MediStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
