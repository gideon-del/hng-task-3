import React from "react";
import Header from "./header";

import GuestGrid from "./guestGrid";
import useCanDrag from "@/hooks/useCanDrag";

const Gallery = () => {
  const Grid = useCanDrag();
  return (
    <>
      <Header />
      <main>
        <section className="px-14 md:px-20 max-w-5xl mx-auto">
          <h1>Gallery</h1>
          <Grid />
        </section>
      </main>
    </>
  );
};

export default Gallery;
