import { useState } from "react";
import MasonaryItem from "./masonaryGrid";
import { dummyData } from "@/utils/dummyData";
import { motion } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const Grid = ({ items }) => {
  const [images, setImages] = useState(items || dummyData);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
    },
  });

  const sensor = useSensors(touchSensor, useSensor(MouseSensor));
  const [activeId, setActiveId] = useState(null);
  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };
  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id);
      const newIndex = images.findIndex((item) => item.id === over.id);

      const newImages = [...images];
      newImages.splice(oldIndex, 1);
      newImages.splice(newIndex, 0, images[oldIndex]);

      setImages(newImages);
    }
    setActiveId(null);
  };
  const handleDragMove = ({ active, over }) => {
    setImages(
      arrayMove(images, images.indexOf(active.id), images.indexOf(over?.id))
    );
  };
  const getSingleImage = (id) => {
    const img = images.filter((img) => img.id === id) || [];

    return img;
  };
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
      sensors={sensor}
      autoScroll={{ enabled: false }}
    >
      <motion.div
        layout
        className=" columns-1 md:columns-2 lg:columns-3 space-y-5 "
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          {images.map((img) => (
            <MasonaryItem key={img.id} img={img} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId && getSingleImage(activeId) ? (
            <MasonaryItem img={getSingleImage(activeId)[0]} />
          ) : null}
        </DragOverlay>
      </motion.div>
    </DndContext>
  );
};

export default Grid;
