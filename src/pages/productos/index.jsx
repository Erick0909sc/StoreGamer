import Layaout from "@/components/Layaout/Layaout";
import {
  filterByCategory,
  getAllProducts,
} from "@/redux/products/productsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [selectedCategories, setSelectedCategories] = useState({
    todos: true,
    videojuegos: false,
    consolas: false,
    accesorios: false,
  });

  const handleCategoryChange = (category) => {
    const updatedCategories = {
      ...selectedCategories,
      [category]: !selectedCategories[category],
    };
    setSelectedCategories(updatedCategories);
    setCurrentPage(1); // Actualiza la página actual a la primera cuando se realiza un cambio en las categorías seleccionadas
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filterProductsByCategory = (products) => {
    const selected = Object.keys(selectedCategories).filter(
      (category) => selectedCategories[category]
    );

    if (selected.includes("todos")) {
      return products;
    } else {
      return products.filter((product) =>
        selected.includes(product.category.toLowerCase())
      );
    }
  };

  const products = filterProductsByCategory(allProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Layaout>
        <div className="flex flex-col md:flex-row justify-start md:justify-start  gap-8 py-8 ">
          <div className="relative ">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center gap-2  border-gray-400 pb-0 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium">Categorias</span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
                <div className="w-80 sm:w-80 rounded border border-gray-200 bg-white">
                  <ul className="space-y-1 border-t border-gray-200 p-4">
                    <li>
                      <label
                        htmlFor="FilterInStock"
                        className={`inline-flex items-center gap-2 ${
                          selectedCategories.todos ? "font-bold" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="FilterInStock"
                          className="h-5 w-5 rounded border-gray-300"
                          checked={selectedCategories.todos}
                          onChange={() => handleCategoryChange("todos")}
                        />

                        <span className="text-sm font-medium text-gray-700">
                          Todos
                        </span>
                      </label>
                    </li>

                    <li>
                      <label
                        htmlFor="FilterPreOrder"
                        className={`inline-flex items-center gap-2 ${
                          selectedCategories.videojuegos ? "font-bold" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="FilterPreOrder"
                          className="h-5 w-5 rounded border-gray-300"
                          checked={selectedCategories.videojuegos}
                          onChange={() => handleCategoryChange("videojuegos")}
                        />

                        <span className="text-sm font-medium text-gray-700">
                          Videojuegos
                        </span>
                      </label>
                    </li>

                    <li>
                      <label
                        htmlFor="FilterOutOfStock"
                        className={`inline-flex items-center gap-2 ${
                          selectedCategories.consolas ? "font-bold" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="FilterOutOfStock"
                          className="h-5 w-5 rounded border-gray-300"
                          checked={selectedCategories.consolas}
                          onChange={() => handleCategoryChange("consolas")}
                        />

                        <span className="text-sm font-medium text-gray-700">
                          Consolas
                        </span>
                      </label>
                    </li>
                    <li>
                      <label
                        htmlFor="FilterOutOfStock"
                        className={`inline-flex items-center gap-2 ${
                          selectedCategories.accesorios ? "font-bold" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="FilterOutOfStock"
                          className="h-5 w-5 rounded border-gray-300"
                          checked={selectedCategories.accesorios}
                          onChange={() => handleCategoryChange("accesorios")}
                        />

                        <span className="text-sm font-medium text-gray-700">
                          Accesorios
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </details>
          </div>

          <div className="relative mt-4 md:mt-0">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center gap-2  border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium">Price</span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
                <div className="w-80 sm:w-80 rounded border border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-700">
                      The highest price is $600
                    </span>

                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                    >
                      Reset
                    </button>
                  </header>

                  <div className="border-t border-gray-200 p-4">
                    <div className="flex justify-between gap-4">
                      <label
                        htmlFor="FilterPriceFrom"
                        className="flex items-center gap-2"
                      >
                        <span className="text-sm text-gray-600">$</span>

                        <input
                          type="number"
                          id="FilterPriceFrom"
                          placeholder="From"
                          className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </label>

                      <label
                        htmlFor="FilterPriceTo"
                        className="flex items-center gap-2"
                      >
                        <span className="text-sm text-gray-600">$</span>

                        <input
                          type="number"
                          id="FilterPriceTo"
                          placeholder="To"
                          className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>

        <section className="bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {currentProducts.map((product, index) => (
              <div key={index} className="flex flex-col items-center p-2">
                <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
                  <a href="#">
                    <div className="relative flex items-end overflow-hidden rounded-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-64 h-64"
                      />
                    </div>

                    <div className="mt-1 p-2">
                      <h2 className="text-slate-700">{product.name}</h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {product.category}
                      </p>

                      <div className="mt-3 flex items-end justify-between">
                        <p className="text-lg font-bold text-blue-500">
                          ${product.price}
                        </p>

                        <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>

                          <button className="text-sm">Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              </div>
            ))}
          </div>
        </section>
        <nav className="flex justify-center my-4">
          <ul className="flex space-x-2">
            <li>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white hover:bg-indigo-100"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </Layaout>
    </>
  );
};

export default index;
