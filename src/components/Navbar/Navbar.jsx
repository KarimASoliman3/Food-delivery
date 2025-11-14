import { useContext, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { dataContext } from "../../context/UserContext";
import { food_items } from "../../assets/food";
import { useSelector } from "react-redux";

export default function Navbar() {
  let {input,setInput,category,setCategory,showCart,setShowCart} = useContext(dataContext);

  
  useEffect(()=>{
    let newList = food_items.filter((item)=>item.food_name.includes(input) || item.food_name.toLowerCase().includes(input));
    setCategory(newList);
  },[input])

  let items = useSelector(state=>state.cart);
  console.log(items);


  return <>
    <div className="w-full h-[100px] flex items-center justify-between px-8">
      {/* logo  */}
      <div className="w-[55px] h-[55px] bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointer">
        <MdFastfood color="orange" size={'30'}/>
      </div>
      {/* input */}
      <form onSubmit={(e)=>e.preventDefault()} className=" w-[40%] md:w-[70%] h-[60px] px-5 md:px-8 flex items-center bg-white  space-x-1 sm:space-x-2.5 rounded-md shadow-xl">
        <IoSearch color="orange" size={'20'}/>
        <input value={input} onChange={(e)=>setInput(e.target.value)} className="text-orange-500 font-medium  text-[14px] sm:text-[15px] w-full outline-none" type="text" placeholder="Search Items...." />
      </form>

      {/* Shopping Bag */}
      <div onClick={()=>{setShowCart(true)}} className="w-[55px] h-[55px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer">
        <span className="absolute top-0 right-2 text-orange-400 font-medium text-[16px]">{items.length}</span>
        <FiShoppingBag color="orange" size={'27'}/>
      </div>
    </div>
  </>
}
