import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Detail.css'

export default function Detail() {
  const { id } = useParams();
  // console.log(id)
  const [product, setProduct] = useState();
  useEffect(() => {
    axios.get(`http://localhost:8001/electronic/product`).then((results) => {
      // console.log("::products::in::home::", results.data);
      const productResult = results.data.find((product) => {
        return product.id === Number(id);
      });
      setProduct(productResult);
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  return (
    <div className="detail-container">
      {product ? (
        <div className="info">
          <div className="detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="detail-info">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Condition: {product.condition}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
