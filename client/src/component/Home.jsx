import React, { useState, useEffect } from "react";
import "./Home.css";

import axios from "axios";
import Cards from "./Cards";

export default function Home({userId}) {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios.get(`http://localhost:8001/electronic/product`).then((results) => {
      // console.log("::products::in::home::", results.data);
      setProducts(results.data);
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  return (
    <div>
      <div className="container">
        <Cards products={products} userId={userId}  />
      </div>
    </div>
  );
}
