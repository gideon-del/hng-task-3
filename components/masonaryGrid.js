import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from "react";
import Masonry from "react-masonry-css";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
export const MasonaryItem = ({ img }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: img.id });
  const transition = "transform 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55)";
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? transition : "none",
  };
  const spring = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };
  return (
    <motion.div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      layout
      whileDrag={{ scale: 1.05, zIndex: 999, transition: spring }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="touch-none"
    >
      <div
        className={`my-masonry-grid_item drop_item touch-none bg-transparent`}
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
const MasonaryGrid = ({ items }) => {
  return (
    <>
      {items.map((img) => (
        <MasonaryItem key={img.id} id={img.id} img={img} />
      ))}
    </>
  );
};

export default MasonaryGrid;
