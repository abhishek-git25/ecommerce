import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseInit";
import { toast } from "react-toastify";
let userData = JSON.parse(localStorage.getItem("userData"));

const initialState = {
  cartData: [],
};

export const fetchCartAsync = createAsyncThunk(
  "Cart/getInitialState",
  (args, thunkApi) => {
    try {
      onSnapshot(
        query(collection(db, "Cart"), where("uid", "==", userData?.uid)),
        (snapshot) => {
          const cartList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          thunkApi.dispatch(actions.setInitialState(cartList));
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartAsync = createAsyncThunk(
  "Cart/deleteCart",
  async (args, thunkApi) => {
    const cartQuery = query(
      collection(db, "Cart"),
      where("uid", "==", userData?.uid)
    );

    const querySnapshot = await getDocs(cartQuery);

    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs;
      cartDoc.forEach(async (cartDoc) => {
        await deleteDoc(doc(db, "Cart", cartDoc.id));
      });
    }
  }
);

export const checkoutCartAsync = createAsyncThunk(
  "Cart/checkoutCart",
  async (cartData, thunkApi) => {
    var d = new Date();
    thunkApi.dispatch(actions.startLoading());
    const orderQuery = query(
      collection(db, "Users"),
      where("uid", "==", userData?.uid)
    );

    try {
      const userSnapShot = await getDocs(orderQuery);
      if (!userSnapShot.empty) {
        userSnapShot.forEach(async (docs) => {
          const docRef = doc(db, "Users", docs.id);
          const data = docs.data();

          const updatedProduct = [
            ...(data.productData || []),
            { ...cartData, createOn: d },
          ];

          await updateDoc(docRef, {
            productData: updatedProduct,
          });
        });
        thunkApi.dispatch(deleteCartAsync());
        thunkApi.dispatch(actions.stopLoading());
        toast("Purchase successfull!", {
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
      } else {
        const userDocRef = doc(db, "Users", userData?.uid);
        await setDoc(userDocRef, {
          uid: userData?.uid,
          productData: [{ ...cartData, createOn: d }],
        });
        thunkApi.dispatch(deleteCartAsync());
        thunkApi.dispatch(actions.stopLoading());
        toast("Purchase successfull!", {
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
    } catch (error) {
      thunkApi.dispatch(actions.stopLoading());
      toast("Purchase unsuccessfull!", {
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
    }
  }
);

export const productQuantityAsync = createAsyncThunk(
  "Cart/productQuantity",
  async ({ product, quantity }, thunkApi) => {
    const cartQuery = query(
      collection(db, "Cart"),
      where("productId", "==", product.productId),
      where("uid", "==", userData?.uid)
    );

    const querySnapshot = await getDocs(cartQuery);

    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs[0];
      if (quantity >= 1) {
        await updateDoc(cartDoc.ref, {
          quantity: quantity,
          totalPrice: quantity * product.price,
        });
        toast("Quantity updated !", {
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
    } else {
      toast("Something Went Wrong !", {
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
    }
  }
);

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartData: [],
    isLoading: false,
  },
  reducers: {
    setInitialState: (state, action) => {
      state.cartData = [...action.payload];
    },
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    stopLoading: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const actions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer.cartData;
export const loadingSelector = (state) =>  state.cartReducer.isLoading;
