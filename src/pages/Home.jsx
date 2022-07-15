import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filterSlice);

  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
  };

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
   * hardcode current of pizza pages
   */
  const [currentPage, setCurrentPage] = React.useState(1);

  /**
   * server request
   */
  React.useEffect(() => {
    setIsLoading(true);

    const categories = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";
    axios
      .get(
        `https://628ed77fdc478523653552ff.mockapi.io/items?page=${currentPage}&limit=4&${categories}${search}&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
