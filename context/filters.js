import { dummyData } from "@/utils/dummyData";
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";

const FilterCtx = createContext({
  filters: [],
  query: "",
  changeQuery: () => {},
  querying: false,
  changeFilters: () => {},
});

const FilterProvider = ({ children }) => {
  const [filters, setFilter] = useState(dummyData);
  const [query, setQuery] = useState("");
  const [querying, setQuerying] = useState(false);
  const changeQuery = useCallback((value) => {
    setQuery(value);
  }, []);
  const debounce = useCallback((func = () => {}, timer = 500) => {
    let timerId;
    return function (...args) {
      setQuerying(true);
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(null, args);
        setQuerying(false);
      }, timer);
    };
  }, []);
  const changeFilters = (func) => {
    setFilter(func);
  };
  const filterByQuery = useCallback((val) => {
    if (val.length === 0) {
      setFilter(dummyData);
      return;
    }
    const filter = dummyData.filter((img) => img.tags.includes(val)) || [];
    setFilter(filter);
  }, []);
  const debounceFunc = debounce(changeQuery);
  useEffect(() => {
    filterByQuery(query.trim().toLowerCase());
  }, [query, filterByQuery]);

  return (
    <FilterCtx.Provider
      value={{
        filters,
        query,
        changeQuery: debounceFunc,
        querying,
        changeFilters,
      }}
    >
      {children}
    </FilterCtx.Provider>
  );
};

export default FilterProvider;
export const useFilter = () => useContext(FilterCtx);
