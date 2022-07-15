import React from "react";

function Categories({ value, onChangeCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <div>
        {categories.map((category, i) => (
          <button
            key={i}
            className={value === i ? "active" : ""}
            onClick={() => onChangeCategory(i)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
