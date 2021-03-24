import "./App.css";
import React, { useState, useCallback, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import useFetch from "./components/useFetch";

const Nav = React.lazy(() => import("./components/Nav"));
const Home = React.lazy(() => import("./components/Home"));
const Catalog = React.lazy(() => import("./components/Catalog"));
const ProductPage = React.lazy(() => import("./components/ProductPage"));
const ShoppingCart = React.lazy(() => import("./components/ShoppingCart"));

const App = () => {
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [shoppingCartItems, setShoppingCartItems] = useState([]);

  const { data, error, isPending } = useFetch(
    "https://api.thesneakerdatabase.com/v1/sneakers?limit=50&name=air%20jordan%201%20high&brand=jordan"
  );

  const toggleCart = useCallback(() => {
    setShowShoppingCart((prev) => !prev);
  }, [setShowShoppingCart]);

  // Click handler for all buy buttons
  const handleClick = (e, snkr) => {
    e.preventDefault();

    if (shoppingCartItems.some((x) => x.name === snkr.name)) {
      const add = shoppingCartItems.map((item) => {
        if (item.name === snkr.name) {
          return {
            ...item,
            count: item.count + 1,
            total: (item.count + 1) * item.retailPrice,
          };
        } else {
          return item;
        }
      });
      setShoppingCartItems(add);
    } else {
      setShoppingCartItems([
        ...shoppingCartItems,
        { ...snkr, count: 1, total: snkr.retailPrice },
      ]);
    }

    toggleCart();
  };

  return (
    <div className="bg-primary text-secondary h-screen w-full flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <ShoppingCart
          showShoppingCart={showShoppingCart}
          setShowShoppingCart={setShowShoppingCart}
          shoppingCartItems={shoppingCartItems}
          setShoppingCartItems={setShoppingCartItems}
          data={data}
          error={error}
          isPending={isPending}
          toggleCart={toggleCart}
        />
        <Nav toggleCart={toggleCart} shoppingCartItems={shoppingCartItems} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/catalog">
            <Catalog
              showShoppingCart={showShoppingCart}
              handleClick={handleClick}
              data={data}
              error={error}
              isPending={isPending}
            />
          </Route>
          <Route exact path="/catalog/:linkID">
            <ProductPage
              showShoppingCart={showShoppingCart}
              handleClick={handleClick}
              data={data}
              error={error}
              isPending={isPending}
            />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
