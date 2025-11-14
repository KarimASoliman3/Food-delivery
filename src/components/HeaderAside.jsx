import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
  addToast,
} from "@heroui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { DecrementQty, IncrementQty, RemoveItem } from "../redux/cartSlice";

export default function HeaderAside({ name,id, price, img, qty }) {
  let dispatch = useDispatch();

  return (
    <>
      <Card className="flex max-w-full w-full overflow-hidden">
        <CardHeader className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 p-2 sm:p-3 md:p-4 lg:p-5 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100 ">
          <Image
            alt={name}
            radius="sm"
            src={img}
            className="object-cover w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 aspect-square sm:aspect-auto shrink-0"
          />
          <div className="flex flex-row items-start justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-1 min-w-0">
            <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 flex-1 min-w-0 max-w-full">
              <p className="leading-tight sm:leading-4 text-xs sm:text-sm md:text-base lg:text-md font-medium wrap-break-word line-clamp-2 sm:line-clamp-none">
                {name}
              </p>
              <div className="h-7 sm:h-8  w-full sm:w-auto sm:min-w-22 md:min-w-26 lg:min-w-30 max-w-32 flex border-1.5 border-orange-500 rounded-lg shadow-md overflow-hidden text-orange-500 shrink-0">
                <button onClick={()=>{qty>1 ? dispatch(DecrementQty(id)) : 1}} className="w-[30%] bg-white h-full flex justify-center items-center hover:text-orange-700 active:bg-orange-200 transition-all cursor-pointer font-bold text-sm sm:text-xs md:text-sm hover:bg-orange-300 touch-manipulation">
                  -
                </button>
                <span className="text-center bg-slate-200 w-[40%] h-full flex justify-center items-center text-xs sm:text-xs md:text-sm font-medium">
                  {qty}
                </span>
                <button onClick={()=>{dispatch(IncrementQty(id))}} className="w-[30%] bg-white h-full flex justify-center items-center hover:text-orange-700 active:bg-orange-200 transition-all cursor-pointer font-bold text-sm sm:text-xs md:text-sm hover:bg-orange-300 touch-manipulation">
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-start items-end gap-2  md:gap-4 shrink-0 ml-1 sm:ml-0 min-w-fit">
              <h4 className="text-slate-700 font-medium text-[13px] lg:text-[16px] whitespace-nowrap">
                 {price} $
              </h4>
              <RiDeleteBin6Line
                onClick={()=>{dispatch(RemoveItem(id));
                  addToast({
                description: "Item removed successfully",
                color: "warning",
                hideIcon: true,
                timeout: 1500,
                variant: "solid",
                classNames: {
                 description:' pl-3 text-white font-meduim text-[16px]',
                },
              });
                }}
                className="text-red-600 cursor-pointer hover:scale-110 active:scale-95 transition-transform shrink-0"
                size={18}
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
