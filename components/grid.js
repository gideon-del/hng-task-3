import { useState } from "react";
import MasonaryGrid from "./masonaryGrid";
import { dummyData } from "@/utils/dummyData";
import GridItem from "./gridItem";
import {
  DndContext,
  DragOverlay,
  DragOverlayItem,
  closestCenter,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

const Grid = ({ item }) => {
  const [images, setImages] = useState(item || dummyData);
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
  };
  const handleDragMove = ({ active, over }) => {
    setImages(
      arrayMove(images, images.indexOf(active.id), images.indexOf(over?.id))
    );
  };
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
    >
      <SortableContext items={images}>
        <MasonaryGrid items={images} />;
      </SortableContext>
    </DndContext>
  );
};

export default Grid;
