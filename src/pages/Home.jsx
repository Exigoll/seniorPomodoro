import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  /**
   * data received from the server (pizza)
   */
  const [items, setItems] = React.useState([]);
  /**
   * loading info
   * default value = true - isLoading, show <Skeleton/>
   * false - loading completed, show <PizzaBlock/>
   */
  const [isLoading, setIsLoading] = React.useState(true);
  /**
   * filtration for <Categories/>
   * default value = 0 - category with index = 0
   */
  const [category, setCategory] = React.useState(0);
  /**
   * hardcode current of pizza pages
   */
  const [currentPage, setCurrentPage] = React.useState(1);
  /**
   * sorting for <Sort/>
   */
  const [sort, setSort] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  /**
   * server request
   */
  React.useEffect(() => {
    setIsLoading(true);

    const categories = category > 0 ? `category=${category}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://628ed77fdc478523653552ff.mockapi.io/items?page=${currentPage}&limit=4&${categories}${search}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories value={category} onClickCategory={(i) => setCategory(i)} />
        <Sort value={sort} onClickSort={(i) => setSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
