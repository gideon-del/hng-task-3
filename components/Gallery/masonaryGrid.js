import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
export const MasonaryItem = ({ img, overId }) => {
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
      className="touch-mainpulation drop_item"
    >
      <div className={`my-masonry-grid_item drop_item  bg-transparent`}>
        <figure className="drop_item">
          <Image
            src={img.img}
            alt="image"
            width={500}
            height={500}
            className="h-full"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvXN1PQAGtgKQxVTcnwAAAABJRU5ErkJggg=="
          />
          <div></div>
        </figure>
        <ul className="flex gap-2 items-start my-2 justify-end ">
          <li className="capitalize bg-gray-500 px-3 py-2 rounded-md text-white text-center w-fit">
            {img.tags}
          </li>
        </ul>
      </div>
      {overId && overId === img.id && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-black/40 grid place-content-center"
        >
          <span className="text-white font-bold">Drop Here</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MasonaryItem;
