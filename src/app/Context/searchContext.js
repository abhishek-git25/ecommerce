import { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, productListAsync, productSelector } from "../../redux/productReducer";

const SearchContext = createContext();

function useValue() {
  const value = useContext(SearchContext);
  return value;
}

function CustomSearchContext({ children }) {
  const [search, setSearch] = useState();
  const [data, setData] = useState();

  const productsList = useSelector(productSelector);
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(productListAsync())
  }, [])

  
    // console.log(searchTerm, "24");
    const searchedResults = productsList?.filter((item) => {
        let d = ""
      if (!search || search.trim() == "") {
        d= item; // Return true to include all items when the search term is empty or whitespace
      }
      const searched = search?.toLowerCase();
      const dataName = item.brand?.toLowerCase();
      d = dataName?.includes(searched);
      
      return d;
    });

    console.log(searchedResults , "34");




//   console.log(searchResults , "36");

  return (
    <SearchContext.Provider
      value={{ data, setData, search, setSearch, searchedResults }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { useValue };

export default CustomSearchContext;
