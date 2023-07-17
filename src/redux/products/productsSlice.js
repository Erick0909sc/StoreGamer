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

//     sortByPriceAsc: (state) => {
//       state.filteredProducts = state.filteredProducts.slice().sort((a, b) => a.price - b.price);
//     },

//     sortByPriceDesc: (state) => {
//       state.filteredProducts = state.filteredProducts.slice().sort((a, b) => b.price - a.price);
//     },

//     sortByRatingDesc: (state) => {
//       state.filteredProducts = state.filteredProducts.slice().sort((a, b) => b.rating - a.rating);
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
// export const { filterByCategory, sortByPriceAsc, sortByPriceDesc, sortByRatingDesc } = productsSlice.actions;

// export default productsSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsByApi } from "./productsApi";

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

const initialState = {
  products: [],
  filteredProducts: [],
  statusAllProducts: "idle",
  precioFiltrado: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      const { categories } = action.payload;
      if (state.precioFiltrado) {
        state.filteredProducts = state.products
          .filter((product) => categories.includes(product.category))
          .filter((product) => product.price <= state.precioFiltrado);
      } else {
        state.filteredProducts = state.products.filter((product) =>
          categories.includes(product.category)
        );
      }
    },

    sortByPriceAsc: (state) => {
      if (state.precioFiltrado) {
        state.filteredProducts = state.filteredProducts
          .slice()
          .sort((a, b) => a.price - b.price);
      } else {
        state.filteredProducts = state.products
          .slice()
          .sort((a, b) => a.price - b.price);
      }
    },

    sortByPriceDesc: (state) => {
      if (state.precioFiltrado) {
        state.filteredProducts = state.filteredProducts
          .slice()
          .sort((a, b) => b.price - a.price);
      } else {
        state.filteredProducts = state.products
          .slice()
          .sort((a, b) => b.price - a.price);
      }
    },

    sortByRatingDesc: (state) => {
      if (state.precioFiltrado) {
        state.filteredProducts = state.filteredProducts
          .slice()
          .sort((a, b) => b.rating - a.rating);
      } else {
        state.filteredProducts = state.products
          .slice()
          .sort((a, b) => b.rating - a.rating);
      }
    },

    filterByPrice: (state, action) => {
      const { precioFiltrado } = action.payload;
      state.precioFiltrado = precioFiltrado;
      if (precioFiltrado) {
        state.filteredProducts = state.products.filter(
          (product) => product.price <= precioFiltrado
        );
      } else {
        state.filteredProducts = state.products;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.statusAllProducts = "success";
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.statusAllProducts = "pending";
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.statusAllProducts = "reject";
    });
  },
});

export const {
  filterByCategory,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByRatingDesc,
  filterByPrice,
} = productsSlice.actions;

export default productsSlice.reducer;
