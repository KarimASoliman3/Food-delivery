import { useContext, useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { dataContext } from "../../context/UserContext";
import { food_items } from "../../assets/food";
import { useSelector } from "react-redux";

export default function Navbar() {
  let { input, setInput, setCategory, setShowCart } = useContext(dataContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let newList = food_items.filter(
      (item) =>
        item.food_name.includes(input) ||
        item.food_name.toLowerCase().includes(input)
    );
    setCategory(newList);
  }, [input, setCategory]);

  let items = useSelector((state) => state.cart);

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add shadow and background when scrolled
      setIsScrolled(currentScrollY > 10);

      // Always show navbar at the top, hide/show based on scroll direction when scrolled
      if (currentScrollY < 100) {
        // Always visible at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`
        fixed top-0 left-0 right-0 w-full h-[100px] 
        flex items-center justify-between px-8 
        z-40 transition-all duration-300 ease-in-out
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
        ${
          isScrolled
            ? "backdrop-blur-md shadow-md"
            : "backdrop-blur-sm"
        }
      `}
      >
        {/* logo  */}
        <div className="w-[55px] h-[55px] bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200">
          <MdFastfood color="orange" size={"30"} />
        </div>
        {/* input */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" w-[40%] md:w-[70%] h-[60px] px-5 md:px-8 flex items-center bg-white  space-x-1 sm:space-x-2.5 rounded-md shadow-xl focus-within:ring-2 focus-within:ring-orange-300 transition-all duration-200"
        >
          <IoSearch color="orange" size={"20"} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-orange-500 font-medium  text-[14px] sm:text-[15px] w-full outline-none"
            type="text"
            placeholder="Search Items...."
          />
        </form>

        {/* Shopping Bag */}
        <div
          onClick={() => {
            setShowCart(true);
          }}
          className="w-[55px] h-[55px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <span className="absolute top-0 right-2 text-orange-400 font-medium text-[16px]">
            {items.length}
          </span>
          <FiShoppingBag color="orange" size={"27"} />
        </div>
      </div>
    </>
  );
}
