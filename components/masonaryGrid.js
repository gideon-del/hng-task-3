import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from "react";
import Masonry from "react-masonry-css";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
const MasonaryItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });
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
      whileDrag={{ scale: 1.05, zIndex: 999, transition: spring }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
const MasonaryGrid = ({ items }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((img) => (
        <MasonaryItem key={img.id} id={img.id}>
          <div className={`my-masonry-grid_item  touch-none bg-transparent`}>
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
            <ul className="flex gap-2 items-center my-2">
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
        </MasonaryItem>
      ))}
    </Masonry>
  );
};

export default MasonaryGrid;
