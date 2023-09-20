import React from "react";
import { motion } from "framer-motion";
import GuestItem from "./guestItem";
import { dummyData } from "@/utils/dummyData";
import { useFilter } from "@/context/filters";
const GuestGrid = ({ items }) => {
  const { filters, query } = useFilter();
  const images = items;
  return (
    <motion.div
      layout
      className=" columns-1 md:columns-2 lg:columns-3 space-y-5 "
    >
      {images.map((img) => (
        <GuestItem key={img.id} img={img} />
      ))}
    </motion.div>
  );
};

export default GuestGrid;
