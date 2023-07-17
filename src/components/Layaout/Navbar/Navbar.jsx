import React, { useEffect, useState, useRef } from "react";
import log from "@/assets/consola.png";
import Image from "next/image";
import { FaSearch, FaStar } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllProducts } from "@/redux/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const statusAllProducts = useSelector(
    (state) => state.products.statusAllProducts
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
  const [isHoveredProduct, setIsHoveredProduct] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNavbarMenuOpen(false);
  };

  const toggleNavbarMenu = () => {
    setIsNavbarMenuOpen(!isNavbarMenuOpen);
    setIsUserMenuOpen(false);
  };

  const router = useRouter();

  const isActivePage = (path) => {
    return router.pathname === path ? "text-blue-500" : "";
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filteredProductsByName = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMouseEnter = (productId) => {
    setIsHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setIsHoveredProduct(null);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.id !== "search-input" &&
      event.target.id !== "search-button" // Evitar desactivar al hacer clic en el botón de búsqueda
    ) {
      setIsHoveredProduct(null);
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <div className="relative w-16 h-16 bg-white">
            <Image src={log} alt="logo" width={60} height={60} />
          </div>
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            Gaming Thrones
          </span>
        </a>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isUserMenuOpen}
            onClick={toggleUserMenu}
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-5 h-5 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>
          {/* Dropdown menu */}
          <div
            className={`z-50 absolute top-14 right-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
              isUserMenuOpen ? "block" : "hidden"
            }`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
              isNavbarMenuOpen ? "hidden" : ""
            }`}
            aria-controls="navbar-user"
            aria-expanded={isNavbarMenuOpen}
            onClick={toggleNavbarMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-5 h-5 ${isNavbarMenuOpen ? "hidden" : "block"}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
              isNavbarMenuOpen ? "block" : "hidden"
            }`}
            aria-controls="navbar-user"
            aria-expanded={isNavbarMenuOpen}
            onClick={toggleNavbarMenu}
          >
            <span className="sr-only">Close main menu</span>
            <svg
              className={`w-5 h-5 ${isNavbarMenuOpen ? "block" : "hidden"}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:w-auto md:order-1 md:flex ${
            isNavbarMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/home">
                <a
                  className={`block py-2 pl-3 pr-4 rounded md:p-0 md:dark:text-blue-500 ${isActivePage(
                    "/home"
                  )} hover:text-blue-500`}
                  aria-current={
                    router.pathname === "/home" ? "page" : undefined
                  }
                >
                  Inicio
                </a>
              </Link>
            </li>
            <li>
              <Link href="/conocenos">
                <a
                  className={`block py-2 pl-3 pr-4 rounded md:p-0 dark:text-white ${isActivePage(
                    "/conocenos"
                  )} hover:text-blue-500`}
                >
                  Conócenos
                </a>
              </Link>
            </li>
            <li>
              <Link href="/productos">
                <a
                  className={`block py-2 pl-3 pr-4 rounded md:p-0 dark:text-white ${isActivePage(
                    "/productos"
                  )} hover:text-blue-500`}
                >
                  Productos
                </a>
              </Link>
            </li>
            <li>
              <Link href="/carrito">
                <a
                  className={`block py-2 pl-3 pr-4 rounded md:p-0 dark:text-white ${isActivePage(
                    "/carrito"
                  )} hover:text-blue-500`}
                >
                  Carrito
                </a>
              </Link>
            </li>
          </ul>
          <div className="max-w-screen-xl mx-auto mt-2">
            <div
              className={`border-b-blue-600 ml-8 focus-within:border-none focus-within:ring focus-within:ring-offset-2 my-6 flex h-8 items-center justify-start border-b-2 bg-gray-100 leading-4 ring-blue-600 sm:w-80 ${
                isSearchActive ? "ring" : ""
              }`}
              ref={dropdownRef}
            >
              <input
                id="search-input"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="peer ml-2 flex-grow bg-transparent text-gray-500 outline-none text-sm"
                onClick={handleSearchClick}
              />
              <button
                type="button"
                className="peer-focus:mr-2 z-20 cursor-pointer text-blue-600 outline-none duration-150 hover:scale-125"
              >
                <svg
                  className="h-4 w-4 stroke-2"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <circle
                    cx="15"
                    cy="14"
                    r="8"
                    stroke="currentColor"
                    fill="transparent"
                  ></circle>
                  <line
                    x1="21.1514"
                    y1="19.7929"
                    x2="26.707"
                    y2="25.3484"
                    stroke="currentColor"
                    fill="transparent"
                  ></line>
                </svg>
              </button>
            </div>

            {isSearchActive && searchTerm.length > 0 && (
              <div className="absolute z-10 mt-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-white border border-gray-300 rounded-lg shadow-md">
                  <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
                    {filteredProductsByName.length > 0 ? (
                      <div className="p-4 space-y-2">
                        {filteredProductsByName.map((product) => (
                          <div
                            key={product.id}
                            className={`flex items-center space-x-2 ${
                              isHoveredProduct === product.id
                                ? "bg-blue-100"
                                : ""
                            }`}
                            onMouseEnter={() => handleMouseEnter(product.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {product.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                ${product.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-gray-500">
                        No se encontraron productos.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
