import React from "react";
import debounce from "lodash.debounce";

import { BiSearchAlt2 } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";

import { SearchContext } from "../../App";

import styles from "./Search.module.scss";

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const testDebounce = debounce(() => {
    console.log("Hello");
  }, 250);

  const onClickClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.search__input}
        placeholder="Поиск пиццы..."
      />
      <BiSearchAlt2 className={styles.search__iconSearch} />
      {searchValue && (
        <GrFormClose
          onClick={onClickClear}
          className={styles.search__iconClear}
        />
      )}
    </div>
  );
};

export default Search;
