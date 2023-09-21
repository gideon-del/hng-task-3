import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
const Preview = ({ img }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: img.id,
    });
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
      className="touch-mainpulation drop_item w-fit"
    >
      <div className={`my-masonry-grid_item drop_item  bg-transparent `}>
        <figure className="drop_item">
          <Image
            src={img.img}
            alt="image"
            width={100}
            height={100}
            className="w-44 h-44"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvXN1PQAGtgKQxVTcnwAAAABJRU5ErkJggg=="
          />
        </figure>
      </div>
    </motion.div>
  );
};

export default Preview;
