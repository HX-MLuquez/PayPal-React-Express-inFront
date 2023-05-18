import React, { useEffect, useState } from "react";
import "./Cards.css";

import Card from "./Card";

export default function Cards({ products, userId }) {
  // console.log("view update products db", products); // x*xx**xxx***
  // console.log("view update products db", products?.cartCode);
  return (
    <div className="cards_container">
      {products &&
        products.map((element) => {
          return <Card key={element.id} product={element} userId={userId} />;
        })}
      {/* NO OLVIDAR el fuck RETURN en el map */}
    </div>
  );
}
