import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import loginImg from "../assets/login.svg";
import Nav from '../components/Nav';
import API from '../services/API';
import { useDispatch}from 'react-redux'
import { login  } from '../redux/authSlice';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const formRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
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
      ease:'power4.inOut'
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const dispatch = useDispatch();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { email, password, role} = form;
      const response = await API.post('/auth/login',{
        email,
        password,
        role
      })
        
      
      if((response?.data?.success)){
        
        alert("Loging scuccessful");
        dispatch(login(response.data.user))
        // Redirect to dashboard or home page
        navigate('/dashboard');
      }
      else{
        alert(response?.data?.message || "Login failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <>
    <Nav/>
    <div className="min-h-screen flex flex-col md:flex-row gap-3 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      {/* Login Form */}
      <div ref={formRef} className="w-full md:w-99 p-10 bg-white shadow-lg rounded">
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
        {/* Image Section */}
      <div
        ref={imageRef}
        className="hidden md:block w-full md:w-99 h-64 md:h-99  bg-cover object-fit bg-center  md:rounded md:shadow-lg "
        style={{
          backgroundImage:
            `url(${loginImg})`
        }}
      ></div>
    </div>
    </>
    
  );
};

export default Login;
