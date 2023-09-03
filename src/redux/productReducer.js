// import axios from "axios";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseInit";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
let userData = JSON.parse(localStorage.getItem("userData"));

const initialState = {
  products: [],
};

export const productListAsync = createAsyncThunk(
  "product/getInitialState",
  (args, thunkApi) => {
    let prodQuery = collection(db, "ProductsList");
    

    const unsubscribe = onSnapshot(prodQuery, (snapShot) => {
      let productList = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));


      thunkApi.dispatch(actions.setInitialState(productList));
    });
    return () => unsubscribe();
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async ({ product, quantity }, thunkApi) => {
    const checkCart = query(
      collection(db, "Cart"),
      where("productId", "==", product.id),
      where("uid", "==", userData.uid)
    );
    let productData = {
      brand: product.brand,
      product: product.product,
      category: product.category,
      productId: product.id,
      image: product.image,
      price: product.price,
      quantity: quantity,
      totalPrice: quantity * product.price,
      uid: userData.uid,
    };

    const querySnapshot = await getDocs(checkCart);

    if (!querySnapshot.empty) {
      toast("Product already exists in cart !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
      return;
    }

    const docRef = doc(collection(db, "Cart"));
    await setDoc(docRef, productData);
    toast("Product added to cart !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.products = [...action.payload];
    },
    extraReducers: (builder) => {
      builder
        .addCase(productListAsync.fulfilled, (state, action) => {
          state.products = [...action.payload];
        })
        .addCase(addProductAsync.fulfilled, (state, action) => {
          console.log(state, action);
        });
    },
  },
});

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const productSelector = (state) => state.productReducer.products;
