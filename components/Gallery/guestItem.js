import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GuestItem = ({ img }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`my-masonry-grid_item drop_item touch-manipulation bg-transparent`}
      >
        <figure className="drop_item">
          <Image
            src={img.img}
            alt="image"
            width={400}
            height={400}
            className="w-full h-auto"
          />
          <div></div>
        </figure>
        <ul className="flex gap-2 items-start my-2 justify-end ">
          {img.tags.map((tag) => (
            <li
              key={tag}
              className="capitalize bg-gray-500 px-3 py-2 rounded-md text-white text-center w-fit"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default GuestItem;
