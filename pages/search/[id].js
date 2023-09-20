import Grid from "@/components/grid";
import Header from "@/components/header";
import { getSingleTags } from "@/utils/dummyData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchResult = ({ results }) => {
  const {
    query: { id },
  } = useRouter();
  const [items, setItems] = useState(getSingleTags(id.trim().toLowerCase()));

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-20">
          <h1 className="text-2xl capitalize text-center md:text-start text-white mb-5">
            {id}
          </h1>
          {items.length > 0 ? (
            <Grid item={items} />
          ) : (
            <p className="text-center font-bold text-white">
              No image with the tag of {id}
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default SearchResult;

export const getServerSideProps = ({ query: { id } }) => {
  if (id.trim().length === 0) {
    return {
      props: {
        results: [],
      },
    };
  }
  const results = getSingleTags(id.trim().toLowerCase());
  return {
    props: {
      results,
    },
  };
};
