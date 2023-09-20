import React from "react";
import Header from "./header";
import useCanDrag from "@/hooks/useCanDrag";
import { useFilter } from "@/context/filters";
import { dummyData } from "@/utils/dummyData";
const Loader = () => {
  return <div></div>;
};

const Gallery = () => {
  const Grid = useCanDrag();
  const { filter, query } = useFilter();
  const items = query.trim().length > 0 ? filter : dummyData;
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="px-14 md:px-20 max-w-5xl mx-auto">
          <h1>Gallery</h1>
          <Grid items={items} />
        </section>
      </main>
    </>
  );
};

export default Gallery;
