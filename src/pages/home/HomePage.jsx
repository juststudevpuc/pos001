import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../App.css';
import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../store/counterSlice';
import Counter from '../../components/counter/Counter';
import { logout } from '../../store/userSlice';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchingData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  fetchingData();
}, []);

  const counter = useSelector((state) => state.counter.counter);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onIncrement = () => {
    dispatch(increment());
  };
  const onDecrement = () => {
    dispatch(decrement());
  };

  if (!user || !user?.username) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="bg-gray-900">
      {/* Counter Section */}
      <div className='flex justify-center items-center '>
        <div className="bg-blue-900 text-xl text-white font-mono border-white rounded-xl w-100 m-10">
          {user?.username && (
            <div className='ml-12 mt-3'><h1>Username: {user?.username}</h1></div>)}

          {user?.password && (
            <div className='ml-12'><h1>Password: {user?.password}</h1></div>)}

          {counter !== 0 && (
            <div className='flex justify-center font-bold text-amber-300'><h1>Counter: {counter}</h1></div>)}

          <Counter
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </div>

      </div>
      <div className='flex justify-center'>
        <button
          type="submit"
          className="bg-blue-900 text-white font-mono border-white rounded-xl w-30 h-10 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          onClick={() => { dispatch(logout()); navigate('/auth/login'); }}
        >
          Logout
        </button>
      </div>
      {/* Products  */}
      <div className='flex justify-center'>
        <div className=" flex flex-wrap justify-center gap-6 w-full ">
          {products.map((item, index) => (
            <div key={index} className=" bg-blue-900 font-mono text-amber-400 border border-white hover:bg-blue-700 hover:scale-105 transition-all duration-300 rounded-xl w-64 mt-5">
              <div className='flex justify-center'>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-50"
                />
              </div>
              <div className='m-3'>
                <h3 className='font-black text-xl'>{item.title}</h3>
                <p className='text-amber-200'>{item.description}</p>
                <p>{item.category}</p>
              </div>
              <div className="flex justify-center m-2">
                <div className="bg-amber-500 text-white font-mono border-white rounded-xl w-30 h-10 
                  hover:bg-amber-600 hover:scale-105 transition-all duration-300 
                  flex justify-center items-center">
                  <h3>${item.price}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default HomePage;