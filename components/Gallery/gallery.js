import React from "react";
import Header from "../header";
import useCanDrag from "@/hooks/useCanDrag";
import { useFilter } from "@/context/filters";
import { dummyData } from "@/utils/dummyData";
const Loader = () => {
  return (
    <div className="absolute top-0 inset-x-0 w-full h-[90vh] grid place-items-center bg-black">
      <span className="loader"></span>
    </div>
  );
};

const Gallery = () => {
  const Grid = useCanDrag();
  const { filter, query, querying } = useFilter();
  const items = query.trim().length > 0 ? filter : dummyData;
  return (
    <>
      <Header />
      <main className="flex-1 relative">
        <section className="px-14 md:px-20 max-w-7xl mx-auto">
          <h1 className="capitalize">{query || "Gallery"}</h1>

          <Grid items={items} />
        </section>
        {querying && <Loader />}
      </main>
    </>
  );
};

export default Gallery;
