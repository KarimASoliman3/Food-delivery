import { motion } from "framer-motion";
import {
  Card as MainCard,
  CardBody,
  CardFooter,
  Image,
  Button,
  addToast,
} from "@heroui/react";
import { TbLeaf } from "react-icons/tb";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/cartSlice";

export default function Card({ name, img, id, price, type }) {
  let dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 20px rgba(255, 165, 0, 0.3)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <MainCard className="pb-2 border border-transparent">
        <CardBody className="overflow-hidden">
          <Image
            alt={name}
            className="w-full object-cover h-[200px]"
            radius="md"
            src={img}
            width="100%"
          />
        </CardBody>

        <CardFooter className="text-medium flex-col pt-0 space-y-3">
          <div className="w-full text-left mb-4">
            <h4 className="text-gray-800 font-bold text-[17px]">{name}</h4>
          </div>
          <div className="flex flex-wrap gap-x-4 justify-between w-full">
            <b className="text-orange-500">Price: {price}</b>
            <b className="text-orange-500 flex items-center gap-x-1.5">
              {type === "veg" ? (
                <TbLeaf className="-mb-1" />
              ) : (
                <GiChickenOven className="-mb-0.5" />
              )}
              {type}
            </b>
          </div>
          <Button
            onPress={() => {
              dispatch(
                AddItem({ id: id, name: name, price: price, img: img, qty: 1 })
              );
              addToast({
                description: "Item added successfully",
                color: "success",
                hideIcon: true,
                timeout: 1500,
                variant: "solid",
                classNames: {
                 description:'pl-3 text-white font-meduim text-[16px]',
                },
              });
            }}
            className="bg-orange-500 w-full text-lime-100 font-semibold mt-1 "
          >
            Add to dish
          </Button>
        </CardFooter>
      </MainCard>
    </motion.div>
  );
}
