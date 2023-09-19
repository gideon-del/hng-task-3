import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Grid from "./grid";

const Desktop = ({ items }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid />
    </DndProvider>
  );
};

export default Desktop;
