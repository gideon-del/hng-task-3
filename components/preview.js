import { useSortable } from "@dnd-kit/sortable";
import React from "react";

const Preview = ({ img }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: img.id });
  return <div>Preview</div>;
};

export default Preview;
