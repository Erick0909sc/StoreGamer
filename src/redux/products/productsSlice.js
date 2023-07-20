import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsByApi,getProductById } from "./productsApi";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductByIdAsync = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  products: [],
  filteredProducts: [],
  productById: {},
  statusProductById: "idle",
  statusAllProducts: "idle",
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      const { categories } = action.payload;
      if (categories.includes("todos")) {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) =>
          categories.includes(product.category)
        );
      }
    },

    sortByPriceAsc: (state) => {
      state.filteredProducts = state.filteredProducts.slice().sort((a, b) => a.price - b.price);
    },

    sortByPriceDesc: (state) => {
      state.filteredProducts = state.filteredProducts.slice().sort((a, b) => b.price - a.price);
    },

    sortByRatingDesc: (state) => {
      state.filteredProducts = state.filteredProducts.slice().sort((a, b) => b.rating - a.rating);
    },
    filterByPrice: (state, action) => {
      const { minPrice, maxPrice } = action.payload;

      if (!minPrice && !maxPrice) {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) =>
            (!minPrice || product.price >= minPrice) &&
            (!maxPrice || product.price <= maxPrice)
        );
      }
    },

    resetPriceFilter: (state) => {
      state.filteredProducts = state.products;
    },
  
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, actions) => {
      state.products = actions.payload;
      state.filteredProducts = actions.payload;
      state.statusAllProducts = "success";
    });
    builder.addCase(getAllProducts.pending, (state, actions) => {
      state.statusAllProducts = "pending";
    });
    builder.addCase(getAllProducts.rejected, (state, actions) => {
      state.statusAllProducts = "reject";
    });
    builder.addCase(getProductByIdAsync.fulfilled, (state, action) => {
      state.productById = action.payload;
      state.statusProductById = "success";
    })
    builder.addCase(getProductByIdAsync.pending, (state) => {
      state.statusProductById = "pending";
    })
    builder.addCase(getProductByIdAsync.rejected, (state) => {
      state.statusProductById = "rejected";
    });
  },
});
export const { filterByCategory, sortByPriceAsc, sortByPriceDesc, sortByRatingDesc, filterByPrice } = productsSlice.actions;

export default productsSlice.reducer;
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getProductsByApi } from "./productsApi";

// export const getAllProducts = createAsyncThunk(
//   "products/getAllProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getProductsByApi();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const initialState = {
//   products: [],
//   filteredProducts: [],
//   statusAllProducts: "idle",
// };
// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//       filterByCategory: (state, action) => {
//         const { category } = action.payload;
//         if (category === "todos") {
//           state.filteredProducts = state.products;
//         } else {
//           state.filteredProducts = state.products.filter(
//             (product) => product.category === category
//           );
//         }
//       },
//     },
//     filterByCategory: (state, action) => {
//       const { categories } = action.payload;
//       if (categories.includes("todos")) {
//         state.filteredProducts = state.products;
//       } else {
//         state.filteredProducts = state.products.filter((product) =>
//           categories.includes(product.category)
//         );
//       }
//     },
//   },

//   extraReducers: (builder) => {
//     builder.addCase(getAllProducts.fulfilled, (state, actions) => {
//       state.products = actions.payload;
//       state.filteredProducts = actions.payload;
//       state.statusAllProducts = "success";
//     });
//     builder.addCase(getAllProducts.pending, (state, actions) => {
//       state.statusAllProducts = "pending";
//     });
//     builder.addCase(getAllProducts.rejected, (state, actions) => {
//       state.statusAllProducts = "reject";
//     });
//   },
// });
// export const { filterByCategory } = productsSlice.actions;

// export default productsSlice.reducer;
