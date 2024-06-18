import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { XCircle } from "@phosphor-icons/react";

const SearchContainer = (props) => {
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

  const handleDeleteClick = async (id) => {
    if (props.deleteOnClick) {
      await props.deleteOnClick(id);
      setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };
  useEffect(() => {
    searchItem();
  }, [inputValue]);

  return (
    <div id={props.searchContainerId} className="searchContainer">
      <form>
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
              <XCircle
                size={20}
                weight="light"
                color="#cf322a"
                onClick={() => handleDeleteClick(item.id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchContainer;
