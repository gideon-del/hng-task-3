import Image from "next/image";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";

const GridItem = ({ item, index, moveItem }) => {
  const animate = useAnimate();
  const [collect, ref, previewref] = useDrag(() => ({
    type: "MASONRY_ITEM",
    item: { index },
  }));
  const [isHovering, setIsHovering] = useState(false);
  const [{ hovered }, drop] = useDrop(() => ({
    accept: "MASONRY_ITEM",
    hover: (draggedItem, monitor) => {
      setIsHovering(true);
    },
    drop(draggedItem) {
      setIsHovering(false);
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect(monitor) {
      return {
        hovered: !!monitor.isOver(),
      };
    },
  }));

  return (
    <>
      <motion.div
        ref={(node) => {
          ref(drop(node));
          previewref(node, { captureDraggingState: true });
        }}
        className={`my-masonry-grid_item drop_item touch-none`}
        initial={{ opacity: 1, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <figure className="drop_item">
          <Image
            src={item.img}
            alt="image"
            width={400}
            height={400}
            className="w-full h-auto"
          />
          <div></div>
        </figure>

        {isHovering && hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`bg-black/50  text-white font-bold grid place-items-center`}
          >
            <span>Drop Here</span>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default GridItem;
