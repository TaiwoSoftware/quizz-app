import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center">
      <h1 className="text-white font-inconsolata text-4xl">404 Error</h1>
      <Link to={'/'}>
        <button className="bg-green-600 text-white text-lg py-2 px-4 rounded-lg hover:bg-green-700 transition mt-2">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Error;
