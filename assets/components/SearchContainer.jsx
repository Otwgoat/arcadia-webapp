import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const SearchContainer = (props) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [iterableTerm, setIterableTerm] = useState(props.iterableTerm);
  const searchItem = () => {
    if (inputValue === "") {
      setFilteredData([]);
      return;
    }
    const filterData = props.data.filter((item) => {
      return item[iterableTerm]
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });
    setFilteredData(filterData);
  };

  useEffect(() => {
    searchItem();
  }, [inputValue]);
  useEffect(() => {
    if (props.rerender) {
      searchItem();
    }
  }, [props.rerender]);
  return (
    <div id={props.searchContainerId} className="searchContainer">
      <form>
        {isDesktop && <p className="subh1">Recherche</p>}
        <label className="formLabel" htmlFor={props.inputName}>
          {props.label}
        </label>
        <input
          type="text"
          placeholder={props.inputPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <div className="searchResultContainer">
        {filteredData &&
          filteredData.map((item, index) => (
            <div
              key={index}
              className={`searchResultItem ${index % 2 === 0 ? "even" : "odd"}`}
            >
              {props.resultTemplate(item)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchContainer;
