import { createContext, useContext, useState } from "react";

const FitlerContext = createContext();

function useFilterValue() {
  const value = useContext(FitlerContext);
  return value;
}

function FilterSearchContext({ children }) {
  const [filter, setFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(0)

  const handleFilterChecks = (checked, value) => {
    if (checked) {
      setFilter([...filter, value]);
    } else {
      const updatedFilter = filter.filter((item) => item !== value);
      setFilter(updatedFilter);
    }
  };


  return (
    <FitlerContext.Provider value={{ filter, setFilter, handleFilterChecks,setPriceFilter , priceFilter }}>
      {children}
    </FitlerContext.Provider>
  );
}

export { useFilterValue };

export default FilterSearchContext;
