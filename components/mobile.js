import React from "react";
import { DndProvider } from "react-dnd";
import Grid from "./grid";
import { TouchBackend } from "react-dnd-touch-backend";

const Mobile = () => {
  return (
    <DndProvider backend={TouchBackend}>
      <Grid />
    </DndProvider>
  );
};

export default Mobile;
