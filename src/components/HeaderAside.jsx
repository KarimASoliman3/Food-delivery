import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@heroui/react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function HeaderAside({ name, price, img, qty }) {
  return (
    <>
      <Card className="flex max-w-full w-full overflow-hidden">
        <CardHeader className="flex flex-row gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100">
          <Image
            alt={name}
            radius="sm"
            src={img}
            className="object-cover w-[100px] sm:w-[120px] md:w-[150px] h-[80px] sm:h-[90px] md:h-[100px] shrink-0"
          />
          <div className="flex flex-row items-start justify-between gap-3 sm:gap-4 md:gap-6 min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:gap-2.5 min-w-0 flex-1">
              <p className="leading-tight sm:leading-4 text-sm sm:text-base md:text-md font-medium break-words">
                {name}
              </p>
              <div className="h-9 sm:h-8 md:h-9 w-[110px] sm:w-[110px] md:w-[120px] flex border-2 border-orange-500 rounded-lg shadow-md overflow-hidden text-orange-500 shrink-0">
                <button className="w-[30%] bg-white h-full flex justify-center items-center hover:text-orange-700 active:bg-orange-200 transition-all cursor-pointer font-bold text-base sm:text-sm md:text-base hover:bg-orange-300 touch-manipulation">
                  -
                </button>
                <span className="text-center bg-slate-200 w-[40%] h-full flex justify-center items-center text-sm sm:text-xs md:text-sm font-medium">
                  {qty}
                </span>
                <button className="w-[30%] bg-white h-full flex justify-center items-center hover:text-orange-700 active:bg-orange-200 transition-all cursor-pointer font-bold text-base sm:text-sm md:text-base hover:bg-orange-300 touch-manipulation">
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-start items-end gap-1.5 sm:gap-2 shrink-0">
              <h4 className="text-slate-700 font-medium text-sm sm:text-xs md:text-[15px] whitespace-nowrap">
                Price : {price}
              </h4>
              <RiDeleteBin6Line
                className="text-red-600 cursor-pointer hover:scale-110 active:scale-95 transition-transform shrink-0"
                size={20}
              />
            </div>
          </div>
        </CardHeader>

        {/* <Divider className="mt-2.5 w-[94%] mx-auto bg-gray-400 h-0.5 font-bold"/> */}

        {/* <CardBody>
          <div className="space-y-1.5">
            <p className="w-full flex justify-between text-[15px] text-slate-800">
                <span className="">Subtotal</span>
                <span className="text-orange-500">399</span>
            </p>
            <p className="w-full flex justify-between text-[15px] text-slate-800">
                <span className="">Delivery Fee</span>
                <span className="text-orange-500">20</span>
            </p>
            <p className="w-full flex justify-between text-[15px] text-slate-800">
                <span className="">Taxes</span>
                <span className="text-orange-500">1.905</span>
            </p>
          </div>
        </CardBody> */}

        {/* <Divider className="mt-2.5 w-[94%] mx-auto bg-gray-400 h-0.5 font-bold"/> */}

        {/* <CardFooter>
          <div className="w-full space-y-3">
            <p className="w-full flex justify-between">
                <span className="font-medium text-slate-700 text-lg">Total</span>
                <span className="text-orange-500 text-[15px] ">399</span>
            </p>
          <Button className="w-full bg-amber-500 text-slate-100 font-bold">Please Order</Button>
          </div>
        </CardFooter> */}
      </Card>
    </>
  );
}
