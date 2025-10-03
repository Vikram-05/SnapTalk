// LandingPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaVideo, 
  FaComments, 
  FaUserSecret, 
  FaShieldAlt, 
  FaRegEyeSlash, 
  FaGlobe, 
  FaHeart,
  FaPlay,
  FaUsers,
  FaStar
} from 'react-icons/fa';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartClick = () => {
    setIsLoading(true);
    // Navigation happens via Link, but we can show loading state
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-gray-900">

      {/* Hero Section */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center px-6 py-16 md:px-20 overflow-hidden">
        {/* Glowing Blurs */}
        <div className=" absolute -top-20 -left-20 w-96 h-96 bg-purple-300/30 blur-[120px] rounded-full z-0"></div>
        <div className="absolute bottom-10 right-[-60px] w-[400px] h-[400px] bg-blue-300/30 blur-[120px] rounded-full z-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300/20 blur-[100px] rounded-full z-0"></div>

        {/* Header */}
        <header className="w-full max-w-7xl z-10 flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
            SnapTalk
            <span className="sr-only">Video Chat Application</span>
          </h1>
          <Link to="/video" aria-label="Start video chat">
            <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition duration-200 transform hover:scale-105">
              Start
            </button>
          </Link>
        </header>

        {/* Hero Content */}
        <main className="z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-12">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Meet New People<br />
              with <span className="text-blue-600">One Click</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
              SnapTalk connects you instantly with strangers worldwide via secure, HD video chat. 
              No downloads, no sign-ups - just pure connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/video" className="flex-1 sm:flex-none">
                <button 
                  className={`w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg  ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleStartClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaPlay className="mr-2" />
                      Start Video Chat
                    </span>
                  )}
                </button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-8 text-center">
              <div className="flex items-center gap-2">
                <FaUsers className="text-2xl text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">50K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaGlobe className="text-2xl text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">150+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-2xl text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">4.8/5</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/video-call-illustration-svg-download-png-5167739.png"
                alt="Video Calling Illustration showing people connecting through video chat"
                className="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width="500"
                height="400"
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                <span className="text-sm font-semibold text-green-600">🔴 Live</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <section className="bg-white py-20 px-6" id="features">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Why Choose <span className="text-blue-600">SnapTalk?</span>
          </h3>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Experience the future of random video chatting with features designed for seamless connections
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <FaVideo className="text-2xl text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Crystal Clear Video</h4>
              <p className="text-gray-600 leading-relaxed">
                HD peer-to-peer video calls with zero setup. Enjoy smooth, lag-free conversations with people around the world.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <FaComments className="text-2xl text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Text Chat Support</h4>
              <p className="text-gray-600 leading-relaxed">
                Send messages, share links, and express yourself with our built-in chat during video calls.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <FaUserSecret className="text-2xl text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">No Sign-Up Required</h4>
              <p className="text-gray-600 leading-relaxed">
                Join and start talking instantly. No accounts, no passwords, no personal information required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="bg-gray-50 py-20 px-6" id="security">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Safe & <span className="text-green-600">Secure</span>
          </h3>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Your privacy and safety are our top priorities. We've built SnapTalk with security at its core.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl hover:bg-white transition-all duration-300">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaShieldAlt className="text-xl text-green-600" />
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">End-to-End Encrypted</h4>
              <p className="text-sm text-gray-600">Your conversations are private and secure</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-white transition-all duration-300">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaRegEyeSlash className="text-xl text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">No Recording</h4>
              <p className="text-sm text-gray-600">Calls are not recorded or stored</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-white transition-all duration-300">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaGlobe className="text-xl text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">Global Connections</h4>
              <p className="text-sm text-gray-600">Meet people from around the world</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-white transition-all duration-300">
              <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaHeart className="text-xl text-red-600" />
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">Community Guidelines</h4>
              <p className="text-sm text-gray-600">Safe environment for everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            How <span className="text-blue-600">SnapTalk</span> Works
          </h3>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Get started in just three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 relative">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                1
              </div>
              <h4 className="text-xl font-semibold mb-4 text-gray-800">Click Start</h4>
              <p className="text-gray-600">
                Press the Start button and allow camera/microphone access. No registration needed.
              </p>
            </div>
            
            <div className="text-center p-8 relative">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                2
              </div>
              <h4 className="text-xl font-semibold mb-4 text-gray-800">Get Matched</h4>
              <p className="text-gray-600">
                Our algorithm instantly connects you with a random user from anywhere in the world.
              </p>
            </div>
            
            <div className="text-center p-8 relative">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                3
              </div>
              <h4 className="text-xl font-semibold mb-4 text-gray-800">Start Talking</h4>
              <p className="text-gray-600">
                Begin your conversation! Use text chat alongside video or skip to meet someone new.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Meet Someone New?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users having meaningful conversations right now.
          </p>
          <Link to="/video">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-2xl">
              Start Free Video Chat Now
            </button>
          </Link>
          <p className="mt-4 text-sm opacity-80">
            No credit card required • No registration needed • Start instantly
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">SnapTalk</h4>
              <p className="text-sm">
                Connecting people worldwide through instant video conversations.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/video" className="hover:text-white transition-colors">Start Chat</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} SnapTalk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;