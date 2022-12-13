import { useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
import API from "./mockAPI";

function Calculate() {
  const [cart, setCart] = useState(API);

  const addToCart = (i) => {
    setCart((prevState) =>
      prevState.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            inCart: true,
            count: item.counterVal,
          };
        }
        return item;
      })
    );
  };

  const increaseQuantity = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 9) {
            return item;
          } else return { ...item, count: item.count + 1 };
        } else if (i === o) {
          if (item.counterVal > 9) {
            return item;
          } else
            return {
              ...item,
              counterVal: item.counterVal + 1,
            };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 1) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        } else if (i === o && item.counterVal > 1) {
          return {
            ...item,
            counterVal: item.counterVal - 1,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            count: 0,
            counterVal: 1,
            inCart: false,
          };
        }
        return item;
      })
    );
  };

  const cartCountTotal = cart.reduce((acc, item) => acc + item.count, 0);
  const cartPriceTotal = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const cartTotals = () =>
    cartCountTotal === 0 ? (
      <b>Cart is empty</b>
    ) : (
      <>
        <b>
          <p>Items in Cart: {cartCountTotal}</p>
          <p>
            Total Price: $
            {Number.isInteger(cartPriceTotal)
              ? cartPriceTotal
              : cartPriceTotal.toFixed(2)}
          </p>
        </b>
      </>
    );

  const cartItems = cart.map((item, i) => (
    <React.Fragment key={item.name}>
      {item.inCart && (
        <>
          <p> Item Name: {item.name}</p>

          <p>
            Item Count: <button onClick={() => decreaseQuantity(i)}>-</button>{" "}
            {item.count} <button onClick={() => increaseQuantity(i)}>+</button>
          </p>
          <p>
            Item Subtotal: $
            {Number.isInteger(item.count * item.price)
              ? item.count * item.price
              : `${(item.count * item.price).toFixed(2)}`}
          </p>
          <button onClick={() => removeFromCart(i)}>Remove From Cart</button>
          <hr />
        </>
      )}
    </React.Fragment>
  ));

  const updateFormData = (event) =>
    setCart({
      ...cart,
      [event.target.name]: event.target.value,
    });

  const cartProducts = () => (
    <div className="flexParent">
      {cart.map((item, i) => (
        <div key={item.name}>
          <input
            value={item.name}
            onChange={(e) => updateFormData(e)}
            placeholder="First name"
            type="text"
            name="firstName"
            required
          />
          <p>Price: ${item.price}</p>
          {!item.inCart ? (
            <>
              <button onClick={() => decreaseQuantity(i)}>-</button>
              <input readOnly type="number" value={item.counterVal} />
              <button onClick={() => increaseQuantity(i)}>+</button>
              <br />
              <button onClick={() => addToCart(i)}>add</button>
            </>
          ) : (
            <p>
              <b>Item added!</b>
            </p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-col h-auto w-full flex justify-center items-center gap-12 py-5 md:py-52 ">
      {/* <h1>useState() Cart</h1>
      {cartItems}
      {cartTotals()}
      {cartProducts()} */}
      <ChoreForm></ChoreForm>
    </div>
  );
}

export default Calculate;

function ChoreForm({ addChoreLog }) {
  const [choreDesc, setChoreDesc] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [goal, setGoal] = useState();
  const [amount, setAmount] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert([choreDesc, name, date, goal, amount]);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="bg-red-400"
    >
      <label>First Name:</label>
      <br />
      <input
        name="choreDesc"
        type="text"
        value={choreDesc}
        onChange={(e) => setChoreDesc(e.target.value)}
      />
      <br />
      <label>Last Name:</label>
      <br />
      <input
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Age:</label>
      <br />
      <input
        name="date"
        type="number"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <label>Goal:</label>
      <br />
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      <br />
      <label>Amount:</label>
      <br />
      <input
        name="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <input type="submit" value="Add Log" />
    </form>
  );
}
