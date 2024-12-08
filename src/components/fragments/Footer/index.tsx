import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
      <footer className="bg-white shadow-md border-t border-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">GearMarket.</span>
              <div className="flex items-center space-x-3 text-xl">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className="text-gray-700 hover:text-black" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} className="text-gray-700 hover:text-black ml-3 mr-3" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} className="text-gray-700 hover:text-black" />
                </a>
              </div>
            </div>
  
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10 mt-4 lg:mt-0">
              <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <a href="#shop" className="text-gray-600 hover:text-gray-900">Detail Transaksi</a>
              <a href="#chatbot" className="text-gray-600 hover:text-gray-900">Chatbot</a>
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
  