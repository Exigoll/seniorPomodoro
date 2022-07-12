import React from "react";

import { BiSearchAlt2 } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";

import { SearchContext } from "../../App";

import styles from "./Search.module.scss";

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <div className={styles.search}>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.search__input}
        placeholder="Поиск пиццы..."
      />
      <BiSearchAlt2 className={styles.search__iconSearch} />
      {searchValue && (
        <GrFormClose
          onClick={() => setSearchValue("")}
          className={styles.search__iconClear}
        />
      )}
    </div>
  );
};

export default Search;
