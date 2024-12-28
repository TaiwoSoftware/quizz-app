import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import Input from "./Input";
import supabase from "./supabaseClient";

const SignIn = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Navigation hook

  const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const {  error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.status === 400 && error.message.includes("already registered")) {
          alert("User already exists. Please log in.");
        } else {
          setError(error.message);
        }
      } else {
        alert("Account created! Please check your email for confirmation.");
        navigate("/login"); // Navigate to the login page
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-screen-xl">
        {/* Left Section */}
        <div className="text-center md:text-left w-full">
          <h1 className="text-2xl text-white font-inconsolata">Get Started</h1>
          <h1 className="text-4xl sm:text-5xl text-white font-inconsolata font-bold mt-4">
            Create an Account
          </h1>
          <p className="text-white mt-2 italic">
            Join the quiz community and showcase your skills!
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-slate-400 p-6 w-full rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="fullName" className="text-white block mb-1">
                Fullname:
              </label>
              <Input
                type="text"
                value={fullName}
                id="fullName"
                handleOnChange={handleChangeFullName}
                placeholder="Your fullname"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-white block mb-1">
                Email:
              </label>
              <Input
                type="email"
                value={email}
                id="email"
                handleOnChange={handleChangeEmail}
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white block mb-1">
                Password:
              </label>
              <Input
                type="password"
                value={password}
                id="password"
                handleOnChange={handleChangePassword}
                placeholder="Your password"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              Create Account
            </button>
          </form>

          {/* Login Button */}
          <div className="mt-4 text-center">
            <p className="text-white">Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 text-white text-lg py-2 px-4 rounded-lg hover:bg-green-700 transition mt-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
