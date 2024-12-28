import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-screen-xl">
        {/* Left Section */}
        <div className="w-full text-center md:text-left">
          <h1 className="text-2xl text-white font-inconsolata mb-2">
            Welcome to the
          </h1>
          <h1 className="text-4xl sm:text-5xl text-white font-inconsolata font-bold mb-4">
            Frontend Quiz
          </h1>
          <p className="italic text-white font-inconsolata mb-4">
            Pick a subject to start with
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-slate-400 p-4 rounded-lg">
          <Link to={'/css'}>
            <p className="bg-slate-700 text-white text-xl sm:text-3xl font-inconsolata rounded-lg p-6 mb-2 cursor-pointer">
              {"{} "} CSS
            </p>
          </Link>
          <Link to={'/html'}>
            <p className="bg-slate-700 text-white text-xl sm:text-3xl font-inconsolata rounded-lg p-6 mb-2 cursor-pointer">
              {"</> "} HTML
            </p>
          </Link>
          <Link to={"/javascript"}>
            <p className="bg-slate-700 text-white text-xl sm:text-3xl font-inconsolata rounded-lg p-6 mb-2 cursor-pointer">
              {"==> "} JavaScript
            </p>
          </Link>

          <Link to={"/react"}>
            <p className="bg-slate-700 text-white text-xl sm:text-3xl font-inconsolata rounded-lg p-6 mb-2 cursor-pointer">
              {"</> "} React
            </p>
          </Link>

          {/* Create Account Button */}
          <Link to="/create-account">
            <button className="mt-4 bg-blue-600 text-white text-lg font-inconsolata rounded-lg py-3 px-6 w-full hover:bg-blue-700 transition-colors">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
