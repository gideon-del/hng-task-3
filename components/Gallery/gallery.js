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
  const { filters, query, querying } = useFilter();

  return (
    <>
      <Header />
      <main className="flex-1 relative">
        <section className="px-14 md:px-20 max-w-7xl mx-auto">
          <h1 className="capitalize text-white text-xl lg:text-2xl mb-4">
            {query || "Gallery"}
          </h1>
          {query.trim().length > 0 && filters.length === 0 && (
            <p className="text-white font-bold text-center text-lg">
              No image found with tag{" "}
              <span className="text-red-500">{query}</span>
            </p>
          )}
          <Grid />
        </section>
        {querying && <Loader />}
      </main>
    </>
  );
};

export default Gallery;
