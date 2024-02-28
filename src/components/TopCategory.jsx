import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSelectedCategory } from '../states/categories/action';

function TopCategory() {
  const { categories: { value, selectedCategory } } = useSelector((states) => states);
  const dispatch = useDispatch();

  const handleClickCategory = (category) => {
    dispatch(asyncSelectedCategory(category));
  };

  if (value.length > 0) {
    return (
      <div className="flex flex-col gap-3 py-4 border-b-2 items-center px-2">
        <h2 className=" text-md font-semibold">Popular Categories</h2>
        <div className="flex gap-3 flex-wrap">
          { value.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleClickCategory(category)}
              className={`${selectedCategory === category && 'bg-slate-100'} border p-2 rounded-lg w-fit hover:bg-slate-100 transition transform scale-90 hover:scale-105 ease-in duration-100`}
            >
              #
              {category}
            </button>
          )) }
        </div>
      </div>
    );
  }

  return null;
}

export default TopCategory;
