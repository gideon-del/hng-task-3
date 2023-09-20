import React from "react";
import Header from "./header";
import Grid from "./grid";

const Gallery = () => {
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
