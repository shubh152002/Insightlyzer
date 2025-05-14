import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import registerImg from '../assets/Register.svg'; // 🖼️ your image
import axios from 'axios';
import API from '../services/API';
import Nav from '../components/Nav';
// import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    role: 'user',
  });

  const formRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    gsap.from(formRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.inOut',
    });
    gsap.from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.inOut',
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
     

    try {
       const {fullname,email,password,role} = form;
      const response = await API.post('/auth/register',{
        fullname,
        email,
        password,
        role
      });
      

      if((response?.data?.success)){
        alert("Registration successful");
        // Redirect to login page
        
        
      } else{
        alert(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      alert(error.response?.data?.message || "something wnt wrong");
    }
  };

  return (
    <>
    <Nav />

    <div className="min-h-screen flex flex-col md:flex-row gap-3 items-center justify-center  bg-gradient-to-br from-indigo-500 to-purple-600">
      {/* Form Section */}
      <div ref={formRef} className="w-full md:p-3 md:w-99 p-10 bg-white shadow-lg rounded">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded"
            value={form.fullname}
            onChange={handleChange}
            required
          />
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
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </div>

      {/* Image Section */}
      <div
        ref={imageRef}
        className="w-full md:w-99 h-64 md:h-99 bg-cover object-fit bg-center md:rounded md:shadow-lg"
        style={{
          backgroundImage: `url(${registerImg})`,
        }}
      ></div>
    </div>
    </>
    
  );
};

export default Register;
