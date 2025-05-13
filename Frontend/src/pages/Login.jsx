import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import loginImg from "../assets/Login.svg";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const formRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    gsap.from(formRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
    gsap.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Handle login logic
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-500">
      {/* Image Section */}
      <div
        ref={imageRef}
        className="w-full md:w-52 h-64 md:h-80  bg-cover object-fit bg-center"
        style={{
          backgroundImage:
            `url(${loginImg})`
        }}
      ></div>

      {/* Login Form */}
      <div ref={formRef} className="w-full md:w-1/2 p-10 bg-white shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
