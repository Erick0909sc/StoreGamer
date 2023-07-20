import Layaout from "@/components/Layaout/Layaout";
import Loader from "@/components/Loader/Loader";
import Slider from "@/components/Slider/Slider";
import { filterByCategory, getAllProducts } from "@/redux/products/productsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products.slice(0, 5));
  const filteredProducts = useSelector(state => state.products.filteredProducts);
  const statusAllProducts = useSelector(
    (state) => state.products.statusAllProducts
  );


  // useEffect(() => {
  //   dispatch(getAllProducts());
  // }, [dispatch]);


 
  return (
    <>
      <Layaout>
        <Slider />
      </Layaout>
    </>
  );
};

export default index;
