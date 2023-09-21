import React from "react";
import { motion } from "framer-motion";
import GuestItem from "./guestItem";
import { dummyData } from "@/utils/dummyData";
import { useFilter } from "@/context/filters";
const GuestGrid = () => {
  const { filters } = useFilter();

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 "
    >
      {filters.map((img) => (
        <GuestItem key={img.id} img={img} />
      ))}
    </motion.div>
  );
};

export default GuestGrid;
