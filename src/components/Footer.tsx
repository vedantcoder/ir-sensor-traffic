import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-gray-900 text-white mt-auto border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                IR Visitor Counter
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Real-time facility occupancy tracking system for enhanced space
              management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-4">Quick Access</h4>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                📊 Live Dashboard
              </Link>
              <Link
                href="/gym"
                className="block text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm"
              >
                🏋️ Gym Tracker
              </Link>
              <Link
                href="/badminton"
                className="block text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
              >
                🏸 Badminton Courts
              </Link>
            </div>
          </div>

          {/* Developer Info */}
          <div className="text-center md:text-right">
            <h4 className="text-white font-semibold mb-4">Built With ❤️</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                Developed by{" "}
                <span className="text-white font-semibold">Vedant Nichal</span>
              </p>
              <div className="flex items-center justify-center md:justify-end space-x-4">
                <a
                  href="https://github.com/vedantcoder"
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center">
            <p className="text-gray-400 text-sm">
              © 2025 IR Visitor Counter. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                System Status: Online
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
