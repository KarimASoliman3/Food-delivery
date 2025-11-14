import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Categories from "../Category";
import Card from "../components/Card";
import { food_items } from "../assets/food";
import { dataContext } from "../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import { IoArrowUp } from "react-icons/io5";
import HeaderAside from "../components/HeaderAside";
import { useSelector } from "react-redux";
import { addToast, Button, Divider } from "@heroui/react";

export default function Home() {
  let { category, setCategory, input, showCart, setShowCart } =
    useContext(dataContext);

  function filterCategory(categoryName) {
    if (categoryName === "All") {
      setCategory(food_items);
    } else {
      let newList = food_items.filter(
        (item) => item.food_category === categoryName
      );
      setCategory(newList);
    }
  }

  // فلترة المنتجات حسب input
  const filteredItems = category.filter((item) =>
    item.food_name.toLowerCase().includes(input.toLowerCase().trim())
  );

  let items = useSelector((state) => state.cart);
  // console.log(items);

  let subTotal = items.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  let deliveryFee = 20;
  let taxes = (subTotal * 0.5) / 100;
  let total = Math.floor(subTotal + deliveryFee + taxes);

  // Scroll to top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="home w-full min-h-screen bg-slate-200 pb-4">
      <Navbar />
      <div className="pt-[100px]">
        {/* Categories تظهر فقط لو input فارغ */}
        {input === "" && (
          <div className="w-full flex flex-wrap justify-center gap-5 mt-6">
            {Categories.map((item) => (
              <div
                key={item.name}
                onClick={() => filterCategory(item.name)}
                className="text-center space-y-1 w-[100px] h-[95px] bg-white flex flex-col p-3 items-center rounded-lg shadow-xl hover:bg-orange-200 transition-all duration-200 cursor-pointer"
              >
                <div>{item.icon}</div>
                <div className="text-gray-600 font-medium">{item.name}</div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Food items */}
        <div className="my-10 w-[80%] sm:w-[85%] md:w-[90%] px-5 sm:px-8 lg:px-10 mx-auto">
          <div
            className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5
            gap-5 sm:gap-6 md:gap-8 
            max-w-[1400px] 
            mx-auto
          "
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card
                  key={item.id}
                  name={item.food_name}
                  img={item.food_image}
                  id={item.id}
                  price={item.price}
                  type={item.food_type}
                />
              ))
            ) : (
              <>
                {/* no items */}
                <div className="col-span-full flex flex-col justify-center items-center py-20">
                  <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                      No dish found 😔
                    </h2>
                    <p className="text-gray-500 text-md font-medium text-center">
                      Try searching with another word or check your spelling !!
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* header asidebar  */}
        <div
          className={`header-aside
          w-full 
          max-w-[100vw] 
          sm:max-w-[450px] 
          md:max-w-[500px] 
          lg:max-w-[620px] 
          xl:max-w-[700px] 
          h-screen 
          fixed 
          top-0 
          right-0 
          bg-slate-50 
          shadow-xl 
          ${showCart ? "z-99" : "z-30"} 
          transition-all 
          duration-500 
          flex 
          flex-col 
          ${showCart ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <header className="w-full flex justify-between items-center px-3 sm:px-4 py-4 shrink-0 ">
            <span className="text-orange-400 font-bold text-lg sm:text-xl">
              Order items
            </span>
            <RxCross2
              onClick={() => {
                setShowCart(false);
              }}
              className="text-orange-500 hover:text-orange-800 cursor-pointer hover:rotate-12 transition-all duration-200"
              size={25}
            />
          </header>

          {/* Scrollable content container - wraps all content */}
          {items.length === 0 ? (
            // Empty cart state - show only empty message
            <div className="flex-1 flex pt-12 justify-center">
              <p className="text-gray-500 text-[20px] font-medium">
                Your cart is empty 😔
              </p>
            </div>
          ) : (
            // Cart with items - show items and pricing
            <div className="flex-1 overflow-y-auto min-h-0 space-y-3 mx-3">
              <div className="px-3 py-4 space-y-2.5">
                {items.map((item) => (
                  <HeaderAside
                    key={item.id}
                    name={item.name}
                    img={item.img}
                    price={item.price}
                    id={item.id}
                    qty={item.qty}
                  />
                ))}
              </div>

              {/* Pricing section */}
              <>
                <Divider className="mt-2 w-[92%] mx-auto bg-gray-400 font-bold" />
                <div className="space-y-2 py-2 px-5">
                  <p className="w-full flex justify-between text-[14px] text-slate-800">
                    <span className="font-medium">Subtotal</span>
                    <span className="text-orange-500">{subTotal} $</span>
                  </p>
                  <p className="w-full flex justify-between text-[14px] text-slate-800">
                    <span className="font-medium">Delivery Fee</span>
                    <span className="text-orange-500">{deliveryFee} $</span>
                  </p>
                  <p className="w-full flex justify-between text-[14px] text-slate-800">
                    <span className="font-medium">Taxes</span>
                    <span className="text-orange-500">{taxes} $</span>
                  </p>
                </div>
                <Divider className="mt-1.5 w-[92%] mx-auto bg-gray-400 font-bold" />
                <div className="w-full space-y-4 pt-1.5 pb-3 px-5">
                  <p className="w-full flex justify-between">
                    <span className="font-medium text-slate-700 text-[18px]">
                      Total
                    </span>
                    <span className="text-orange-500 font-medium text-[16px]">
                      {total} $
                    </span>
                  </p>
                  <Button onPress={()=>{
                    addToast({
                description: "Order placed....",
                color: "success",
                hideIcon: true,
                timeout: 1500,
                variant: "solid",
                classNames: {
                 description:'pl-3 text-white font-meduim text-[16px]',
                },
              });
                  }} className="w-full bg-amber-500 text-slate-100 font-medium text-[15px]">
                    Place Order
                  </Button>
                </div>
              </>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-7 right-5
          w-12 h-12
          bg-orange-500 hover:bg-orange-600
          text-white
          rounded-full
          shadow-xl
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          z-20
          hover:scale-110
          active:scale-95
          ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
        aria-label="Scroll to top"
      >
        <IoArrowUp size={24} />
      </button>
    </div>
  );
}
