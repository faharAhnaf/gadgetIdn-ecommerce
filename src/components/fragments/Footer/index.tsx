import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-white shadow-md border-t border-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">BelanjaKuy.</span>
              <div className="flex items-center space-x-3 text-xl">
                <a href="https://www.instagram.com/rezatamaar" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className="text-gray-700 hover:text-black" />
                </a>
                <a href="https://www.tiktok.com/@rezatamaar_" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTiktok} className="text-gray-700 hover:text-black ml-3 mr-3" />
                </a>
              </div>
            </div>
  
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10 mt-4 lg:mt-0">
              <Link href="/">
                <p className="text-gray-600 hover:text-gray-900">Home</p>
              </Link>
              <Link href="/contact">
                <p className="text-gray-600 hover:text-gray-900">Contact</p>
              </Link>
              <Link href="/invoice">
                <p className="text-gray-600 hover:text-gray-900">Detail Transaksi</p>
              </Link>
              <Link href="/chatbot">
                <p className="text-gray-600 hover:text-gray-900">Chatbot</p>
              </Link>
            </div>
            
            <div className="mt-6 lg:mt-0">
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
  
          <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} BelanjaKuy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  