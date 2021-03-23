import React, { useCallback } from "react";
import { Link } from "react-router-dom";

const ProductsAll = ({
  handleClick,
  data,
  error,
  isPending,
  showShoppingCart,
}) => {
  const addToCart = useCallback(
    (e) => {
      const { id } = e.target.parentNode.parentNode;
      const copy = data.map((x) => x);
      const snkr = copy.find((x) => x.id === id);

      handleClick(e, snkr);
    },
    [handleClick, data]
  );

  const CardStructure = () => {
    if (data) {
      const copy = data.map((x) => x);
      return copy.map((snkr) => {
        return (
          <div
            key={snkr.id}
            id={snkr.id}
            className="flex flex-col self-center justify-evenly rounded-lg border-2 border-white w-11/12 h-auto py-2 px-2 my-2 mx-auto mb-5"
          >
            <div className="text-center">
              <Link to={`/catalogue/${snkr.linkID}`}>
                <div className="bg-secondary">
                  <img
                    className="rounded-xl mx-auto transform hover:scale-90 duration-200 hover:shadow-lg"
                    alt="snkrImg"
                    src={snkr.img.smallImg}
                  ></img>
                </div>
              </Link>
              <h2 className="text-3xl">{snkr.shoe}</h2>
              <h2 className="text-5xl whitespace-nowrap">"{snkr.name}"</h2>
              <h2 className="text-3xl">${snkr.retailPrice}</h2>
              <button
                className="bg-secondary text-primary rounded-lg ring-4 ring-primary my-2 rounded-full py-1 px-2 hover:text-secondary hover:bg-primary hover:ring-secondary focus:outline-none focus:bg-primary focus:ring-secondary focus:text-secondary"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      });
    }
  };

  const Container = () => (
    <div className=" mx-auto h-full mt-10 pb-8 bg-primary md:w-full md:grid md:mx-auto md:grid-cols-2 md:grid-flow-cols md:auto-cols-max xl:grid-cols-3">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <CardStructure />}
    </div>
  );

  return (
    <div
      className={`bg-primary pb-10 ${
        showShoppingCart ? "overflow-hidden" : ""
      }`}
    >
      <Container />
    </div>
  );
};

export default ProductsAll;
