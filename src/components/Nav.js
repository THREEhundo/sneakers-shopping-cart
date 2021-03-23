import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import cartLogo from "../imgs/shopping-bag.png";

const Nav = ({ toggleCart, shoppingCartItems = [] }) => {
  const TotalInCart = () => {
    let currentTotal;

    shoppingCartItems instanceof Array && shoppingCartItems.length > 0
      ? (currentTotal = shoppingCartItems
          .map((x) => x.count)
          .reduce((x, y) => x + y))
      : (currentTotal = "");

    return (
      <span
        className={`
          ${currentTotal > 9 ? "w-6" : ""}
          ${
            currentTotal > 0 ? "border-2 rounded-full w-5" : ""
          } inline-block px-1 text-xs bg-secondary text-primary`}
      >
        {currentTotal}
      </span>
    );
  };

  const ShoppingCartBtn = () => {
    return (
      <div className="w-18">
        <TotalInCart />
        <button className="my-auto align-bottom" onClick={toggleCart}>
          <img className="w-7 filter-white" alt="cart" src={cartLogo}></img>
        </button>
      </div>
    );
  };

  return (
    <nav className="border-b-2 border-white">
      <div>
        <ul className="flex">
          <li className="ml-0 w-20">
            <Link to="/">
              <img src={logo} alt="logo"></img>
            </Link>
          </li>
          <div className="mt-3 mr-1 flex ml-auto">
            <li className="mr-3 text-2xl hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li id="catalogueLink" className="mr-2 text-2xl hover:underline">
              <Link to="/catalogue">Catalogue</Link>
            </li>
            <li className="flex flex-nowrap justify-center self-center h-full">
              <ShoppingCartBtn />
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
