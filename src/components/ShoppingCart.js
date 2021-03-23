import React, { useRef, useCallback, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import trashIcon from "../imgs/trash.svg";
import logo from "../imgs/logo.png";

const ShoppingCart = ({
  showShoppingCart,
  setShowShoppingCart,
  shoppingCartItems = [],
  setShoppingCartItems,
  data,
  error,
  isPending,
  cartState,
  toggleCart,
}) => {
  const modalRef = useRef();

  const openCart = useSpring({
    config: {
      duration: 250,
    },
    transform: showShoppingCart ? "translateX(58.4%)" : "translateX(100%)",
    opacity: showShoppingCart ? 1 : 0,
  });

  const closeCart = useCallback(
    (e) => {
      if (
        modalRef.current === e.target ||
        (e.key === "Escape" && showShoppingCart)
      ) {
        toggleCart();
      }
    },
    [toggleCart, showShoppingCart]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeCart);
    return () => document.removeEventListener("keydown", closeCart);
  }, [closeCart]);

  const handleClick = useCallback(
    (e, i) => {
      const { id } = e.target;

      const updatedCart = shoppingCartItems.map((item, j) => {
        return j === i
          ? id === "minus"
            ? {
                ...item,
                count: item.count - 1,
                total: (item.count - 1) * item.retailPrice,
              }
            : {
                ...item,
                count: item.count + 1,
                total: (item.count + 1) * item.retailPrice,
              }
          : item;
      });

      const nonZero = updatedCart.filter((item) => item.count !== 0);

      setShoppingCartItems(nonZero);
    },
    [shoppingCartItems, setShoppingCartItems]
  );

  const handleChange = useCallback(
    (e, i) => {
      let { value, min, max } = e.target;
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));

      const updatedCart = shoppingCartItems.map((item, j) => {
        if (j === i) {
          return { ...item, count: value, total: value * item.retailPrice };
        } else {
          return item;
        }
      });

      if (value === 0) {
        updatedCart.splice(i, 1);
        return setShoppingCartItems(updatedCart);
      }
      setShoppingCartItems(updatedCart);
    },
    [shoppingCartItems, setShoppingCartItems]
  );

  const handleDelete = useCallback(
    (i) => {
      const delItem = shoppingCartItems.map((x) => x);
      delItem.splice(i, 1);
      return setShoppingCartItems(delItem);
    },
    [shoppingCartItems, setShoppingCartItems]
  );

  const comma = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const Total = () => {
    let due;
    shoppingCartItems.length > 0
      ? (due = comma(
          shoppingCartItems.map((x) => x.total).reduce((x, y) => x + y)
        ))
      : (due = 0);
    return (
      <div
        id="total"
        className="flex text-2xl text-right bg-primary text-secondary w-full pr-2 border-t-2 pt-2"
      >
        <button className="bg-secondary text-primary rounded-lg ring-4 ring-primary my-2 rounded-full py-1 px-2 hover:text-secondary hover:bg-primary hover:ring-secondary focus:outline-none focus:bg-primary focus:ring-secondary focus:text-secondary py-1">
          Checkout
        </button>
        <div className="ml-auto">Total: ${due}</div>
      </div>
    );
  };

  const CartItems = () => {
    const list = shoppingCartItems.map((item, index) => {
      return (
        <li
          key={item.id}
          id={item.id}
          className="text-lg flex flex-wrap border-b bb-primary p-1"
        >
          <img alt={item.name} src={item.img.smallImg}></img>
          <div className="flex flex-col w-1/2">
            <p className="pt-1">{item.name}</p>
            <p className="pt-1">${item.retailPrice}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="w-full pb-1">
              <div className="border-2 border-primary w-20 ml-auto flex flex-row flex-nowrap">
                <button
                  id="minus"
                  className="pl-2 flex-1"
                  value={item.count}
                  onClick={(e) => handleClick(e, index)}
                >
                  -
                </button>
                <input
                  id="itemTotal"
                  value={item.count}
                  min="0"
                  max="20"
                  type="number"
                  onChange={(e) => handleChange(e, index)}
                  className="text-center appearance-none"
                ></input>
                <button
                  id="plus"
                  className="pr-2 flex-1"
                  onClick={(e) => handleClick(e, index)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="ml-auto">${comma(item.total)}</div>
            <button
              className="ml-auto"
              onClick={() => handleDelete(index)}
              id="delete"
            >
              <img
                alt="delete"
                className="w-8 h-6 filter-pink"
                src={trashIcon}
              ></img>
            </button>
          </div>
        </li>
      );
    });
    return <ul className="px-3 h-auto pb-1 flex-grow">{list}</ul>;
  };

  const InnerCart = () => {
    return (
      <div
        id="cartDrawer"
        className="w-5/12 h-screen bg-secondary flex flex-col shadow-inner z-10 text-primary"
      >
        <h1
          id="header"
          className="w-full h-10 text-4xl text-center text-secondary bg-primary bt-primary"
        >
          Shopping Cart
        </h1>
        <div
          id="itemContainer"
          className="flex flex-column flex-grow bg-secondary w-full"
        >
          {shoppingCartItems.length > 0 ? (
            [<CartItems key="full" />]
          ) : (
            <div id="empty" className="text-center flex flex-col">
              <p className="pt-2">Your Cart is Empty.</p>
              <img alt="logo" src={logo} className="mt-auto pb-10"></img>
            </div>
          )}
        </div>
        <Total />
      </div>
    );
  };

  const SlidingCart = () => {
    return (
      <animated.div
        style={openCart}
        className="flex flex-col h-full overflow-y-auto"
      >
        <InnerCart />
      </animated.div>
    );
  };

  const Modal = () => {
    return (
      <div
        ref={modalRef}
        id="shoppingModal"
        className="h-full w-full bg-opblack flex flex-col fixed z-10"
        onClick={closeCart}
      >
        <SlidingCart />
      </div>
    );
  };

  return showShoppingCart ? <Modal /> : null;
};

export default ShoppingCart;
