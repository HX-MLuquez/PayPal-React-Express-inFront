import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./component/Home";
import ShoppingCart from "./component/ShoppingCart";
import Detail from "./component/Detail";

function App() {
  const [userId, setUserId] = useState(1);
  useEffect(() => {
    axios
      .post(`http://localhost:8001/electronic/product/all`)
      .then((results) => {
        return results.data;
      });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home userId={userId} />}></Route>
        <Route path="/cart" element={<ShoppingCart userId={userId} />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </>
  );
}

export default App;
