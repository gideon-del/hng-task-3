import Image from "next/image";
import React from "react";
import Masonry from "react-masonry-css";

const MasonaryGrid = ({ children }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  );
};

export default MasonaryGrid;
