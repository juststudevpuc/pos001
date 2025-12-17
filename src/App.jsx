// render data , search data , filter data, delete data
// import { useState } from "react";

// import { useState } from "react";

// export default function App() {
//   //How to declare state
//   //syntax
//   const [data, setData] = useState(["Iphone", "Samsung", "Xiaomi", "Oppo",  "Vivo", "Realme", "Nokia", "Sony", "Asus",]);
//   const [query, setQuery] = useState("");
//   const [querySearch, setQuerySearch] = useState("");

//   function onSubmit(e) {
//     e.preventDefault();
//     setData([...data, query]);
//   }
//   function onDelete(itemDelete) {
//     setData(data.filter((_, index) => index !== itemDelete));
//   }

//   const filterData = data.filter((item) =>
//     item.toLowerCase().includes(querySearch.toLowerCase())
//   );

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "lightgrey", padding: "15px"}}>
//         <input
//           style={{ width: "300px", height: "20px", borderRadius: "10px", border: "none", padding: "10px"}}
//           placeholder="Search data"
//           value={querySearch}
//           onChange={(e) => setQuerySearch(e.target.value)}
//           type="text"
//         />
//         <form onSubmit={onSubmit} action="">
//           <input style={{ width: "300px", height: "20px", borderRadius: "10px", border: "none", padding: "10px", marginRight:"8px"}}

//             placeholder="Input data"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             type="text"
//           />
//           <button style={{ borderRadius: "10px", border: "none", padding: "10px",backgroundColor:"Darkblue", color:"white" }} type="submit">Submit</button>
//         </form>
//       </div>
//       <div style={{ display:"block",marginLeft:"auto", marginRight: "auto",marginTop:"1rem",width:"50%", padding:"20px", border:"1px solid lightgrey", borderRadius:"10px", boxShadow:"0 0 20px lightgrey",}}>
//         {/* table */}
//         {filterData && (
//             <ul style={{ listStyleType: "none",  }}>
//             {filterData.map((item, index) => {
//               return (
//                 <div style={{display:"flex", justifyContent:"space-between", margin:"10px"}}>
//                   <li key={index}>{item}</li>
//                   <li>
//                     <button style={{backgroundColor:"red",color:"white", borderRadius:"10px", padding:"12px",border:"none"}} onClick={() => onDelete(index)}>Delete</button>
//                   </li>
//                 </div>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
// ----------------------------------- no style state-----------------------------------
// import { useState } from "react";

// export default function App() {
//   //How to declare state
//   //syxtax
//   // const [variableState,setFunctonState] = useState(initailVulue);

//   const [data, setData] = useState(["Apple", "Banana", "Mango"]);
//   const [query, setQuery] = useState("");
//   const [querySearch, setQuerySearch] = useState("");

//   function onSubmit(e) {
//     e.preventDefault();
//     setData([...data, query]);
//   }
//   function onDelete(itemDelete) {
//     setData(data.filter((_, index) => index !== itemDelete));
//   }

//   const filterData = data.filter((item) =>
//     item.toLowerCase().includes(querySearch.toLowerCase())
//   );

//   return (
//     <div>
//       <div>
//         <input
//           placeholder="Search data"
//           value={querySearch}
//           onChange={(e) => setQuerySearch(e.target.value)}
//           type="text"
//         />
//         <form onSubmit={onSubmit} action="">
//           <input
//             placeholder="Input data"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             type="text"
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//       <div>
//         {filterData && (
//           <ul>
//             {filterData.map((item, index) => {
//               return (
//                 <div>
//                   <li key={index}>{item}</li>
//                   <li>
//                     <button onClick={() => onDelete(index)}>Delete</button>
//                   </li>
//                 </div>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
// -------------------Counter-----------------------------

// import { useEffect, useState } from "react";

// export default function App(){
//   const [counter,setCounter] = useState(0);

//   useEffect(() =>{

//   })
// }

// ----------------fetching data jSON---------------
// import { useEffect, useState } from 'react';
// import './App.css'

// const App = () => {
//   const [products,setProducts] = useState([]);

//   useEffect(()=>{
//     const fetchingData = async ()=>{
//       const res = await fetch("https://dummyjson.com/products")
//       const data = await res.json();

//       if(data){
//         setProducts(data.products);
//         console.log(data.products)
//       }
//     };
//     fetchingData();
//   },[]);
//   return (
//     <div >
//       <p>{products[0]?.brand}</p>
//         <div style={{ display:"flex", flexWrap:"wrap", gap:"20px"}}>
//           {products.map((item, index) =>{
//             return(
//               <div key={index} className='container'>
//                 <div >
//                   <img src= {item.images} className='img'/>
//                 </div>
//                 <h3>{item.title}</h3>
//                 <p>{item.description}</p>
//                 <p>{item.category}</p>
//                 <div>
//                   <h3>{item.price}</h3>
//                 </div>
//               </div>
//             )
//           })
//           }
//         </div>
//     </div>
//   )
// }

// export default App;

// ----------------------route----------------------
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFound from "./pages/404/NotFound";
import MasterLayout from "./components/layout/MasterLayout";
import LoginPage from "./pages/auth/LoginPage";
import AuthLayout from "./components/layout/AuthLayout";
import RegisterPage from "./pages/auth/RegisterPage";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import BrandPage from "./pages/admin/BrandPage";
import ProductAdminPage from "./pages/admin/ProductAdminPage";
import UserPage from "./pages/admin/UserPage";
import CategoryPage from "./pages/admin/CategoryPage";
import PosPage from "./pages/admin/PosPage";
import SupplierPage from "./pages/admin/SupplierPage";
import PurchasePage from "./pages/admin/PurchasePage";
import DashboardPage from "./pages/admin/DashboardPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<MasterLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<ProfilePage />}/>
          </Route> */}
          {/* auth */}
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* main */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />{" "}
            {/* This renders at "/" */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="brand" element={<BrandPage />} />
            <Route path="product" element={<ProductAdminPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="pos" element={<PosPage />} />
            <Route path="purchase" element={<PurchasePage />} />
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
