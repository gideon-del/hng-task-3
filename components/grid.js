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
import Preview from "./preview";
import { useFilter } from "@/context/filters";

const Grid = ({ items }) => {
  const { query, filters, changeFilters } = useFilter();

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
    },
  });

  const sensor = useSensors(touchSensor, useSensor(MouseSensor));
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };
  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = filters.findIndex((item) => item.id === active.id);
      const newIndex = filters.findIndex((item) => item.id === over.id);

      const newfilters = [...filters];
      newfilters.splice(oldIndex, 1);
      newfilters.splice(newIndex, 0, filters[oldIndex]);

      changeFilters(newfilters);
    }
    setActiveId(null);
    setOverId(null);
  };
  const handleDragMove = ({ active, over }) => {
    setOverId(over?.id);
    changeFilters(
      arrayMove(filters, filters.indexOf(active.id), filters.indexOf(over?.id))
    );
  };
  const getSingleImage = (id) => {
    const img = filters.filter((img) => img.id === id) || [];

    return img;
  };
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
      sensors={sensor}
    >
      <motion.div
        layout
        className=" columns-1 md:columns-2 lg:columns-3 space-y-5 "
      >
        <SortableContext items={filters} strategy={rectSortingStrategy}>
          {filters.map((img) => (
            <MasonaryItem key={img.id} img={img} overId={overId} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId && getSingleImage(activeId) ? (
            <Preview img={getSingleImage(activeId)[0]} />
          ) : null}
        </DragOverlay>
      </motion.div>
    </DndContext>
  );
};

export default Grid;
