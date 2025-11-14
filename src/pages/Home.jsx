import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import Categories from "../Category";
import Card from "../components/Card";
import { food_items } from "../assets/food";
import { dataContext } from "../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import HeaderAside from "../components/HeaderAside";
import { useSelector } from "react-redux";

export default function Home() {
  let { category, setCategory, input ,showCart ,setShowCart} = useContext(dataContext);

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


  let items = useSelector(state=>state.cart);
  // console.log(items);
  


  return (
    <div className="home w-full min-h-screen bg-slate-200">
      <Navbar />

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
                    There are no products 😔
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
      <div className={`w-[60vh] md:w-[90vh] h-full fixed top-0 right-0 bg-white shadow-xl z-30 px-3 transition-all duration-500 ${showCart? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="w-full flex justify-between items-center px-2 py-4">
          <span className="text-orange-400 font-bold text-[19px]">Order items</span>
          <RxCross2 onClick={()=>{setShowCart(false)}} className="text-orange-500 hover:text-orange-800 cursor-pointer hover:rotate-12 transition-all duration-200" size={25}/>

          
        </header>
        <div className="mt-5 space-y-2.5">
        {items.map((item)=>(
          <HeaderAside name={item.name} img={item.img} price={item.price} id={item.id} qty={item.qty}/>    
        ))}
        </div>
      </div>

    </div>
  );
}
