import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const authState = onAuthStateChanged(auth, (user) => {
  if (user) {
    let userData = {
      acccessToken: user.accessToken,
      userName: user.displayName,
      email: user.email,
      uid: user.uid,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  }
});

export const filterChecks = [
  {
    label: "Electronics",
    value: "Electronics",
  },
  {
    label: "Jwellery",
    value: "Jwellery",
  },
  {
    label: "Women's Clothing",
    value: "Womens Clothing",
  },
  {
    label: "Men's Clothing",
    value: "mens clothing",
  },
];
