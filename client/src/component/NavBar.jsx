import React from "react";
import "./NavBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to={"/cart"}>
              <button>
                <FontAwesomeIcon icon={faShoppingCart} />
                Cart
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
