import { useState } from "react";
import MasonaryGrid from "./masonaryGrid";
import { dummyData } from "@/utils/dummyData";
import GridItem from "./gridItem";

const Grid = ({ id }) => {
  const [images, setImages] = useState(dummyData);
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...images];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setImages(updatedItems);
  };
  return (
    <MasonaryGrid>
      {images.map((item, i) => (
        <GridItem key={item.img} item={item} moveItem={moveItem} index={i} />
      ))}
    </MasonaryGrid>
  );
};

export default Grid;
