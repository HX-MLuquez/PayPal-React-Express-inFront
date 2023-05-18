import React, { useState, useEffect } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

export default function Card({ product, userId }) {
  // console.log(product)
  const [isFav, setIsFav] = useState(false);
  const [isCart, setIsCart] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8001/electronic/cart/all/${userId}`)
      .then(({ data }) => {
        // console.log("::products::in::cart::", data);
        if (!data.message) {
          const updateCart = data.find(
            (element) => element.productId === product.id
          );
          if (updateCart) setIsCart(true);
        }
      });
  }, []);
  const addCart = () => {
    if (product.stock <= 0) {
      return alert("insufficient stock");
    }
    const productCart = {
      productId: product.id,
      userId: userId,
      amount: 1,
      stock: product.stock
    };
    axios
      .post(`http://localhost:8001/electronic/cart`, productCart)
      .then((results) => {
        // console.log("::products::in::home::", results.data);
      });
    setIsCart(true);
  };
  const removeCart = () => {
    axios
      .delete(`http://localhost:8001/electronic/cart/${product.id}`)
      .then((results) => {
        // console.log("::products::in::home::", results.data);
      });
    setIsCart(false);
  };

  return (
    <div className="card">
      <div className="head_card">
        {isFav ? (
          <button onClick={() => setIsFav(false)}>❤️</button>
        ) : (
          <button onClick={() => setIsFav(true)}>🤍</button>
        )}
      </div>
      <div className="body_card">
        <Link className="link" to={`/detail/${product.id}`}>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title}></img>
        </Link>
      </div>

      <div className="footer_card">
        <h1>u$ {product.price}</h1>
        {!isCart ? (
          <button onClick={addCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
            Add to Cart
          </button>
        ) : (
          <button onClick={removeCart}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ opacity: 0.5, color: "blueviolet" }}
            />
            <div></div>
            Remove to Cart
          </button>
        )}
      </div>
    </div>
  );
}
