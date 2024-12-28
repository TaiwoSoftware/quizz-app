import { Link } from "react-router-dom";
import { useAuth } from "./hooks/UseAuth";

const LandingPage = () => {
  const { user, loading } = useAuth();

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
          <Link to={"/css"}>
            <p className="bg-slate-700 text-white text-xl sm:text-3xl font-inconsolata rounded-lg p-6 mb-2 cursor-pointer">
              {"{} "} CSS
            </p>
          </Link>
          <Link to={"/html"}>
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

          {/* Create Account Button - Only show if not logged in */}
          {!loading && !user && (
            <Link to={"/create-account"}>
              <button className="bg-blue-600 text-white text-lg sm:text-xl font-inconsolata rounded-lg p-4 mt-6 w-full hover:bg-blue-700 transition duration-300 ease-in-out">
                Create an Account
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;