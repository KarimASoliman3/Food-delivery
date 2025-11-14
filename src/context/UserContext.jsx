import { createContext, useState } from "react";
import { food_items } from "../assets/food";

export const dataContext = createContext();

export default function UserContext({ children }) {
  const [category, setCategory] = useState(food_items);
  const [input, setInput] = useState("");
  const [showCart, setShowCart] = useState(false);
  let data = {
    input,
    setInput,
    category,
    setCategory,
    showCart,
    setShowCart,
  };
  return (
    <>
      <div>
        <dataContext.Provider value={data}>{children}</dataContext.Provider>
      </div>
    </>
  );
}
