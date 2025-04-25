import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  email: "",
};

function setData(key, value) {
  const data = JSON.parse(localStorage.getItem("appData")) || {};

  data[key] = value;

  localStorage.setItem("appData", JSON.stringify(data));
}

const customerSlice = createSlice({
  initialState,
  name: "customer",
  reducers: {
    createCustomer(state, action) {
      state.fullname = action.payload.fullName;
      state.email = action.payload.email;
      setData("customer", state);
    },
    update(state, action) {
      state.fullname = action.payload;
      setData("customer", state);
    },
  },
});

console.log(customerSlice);

export const { update, createCustomer } = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullname: action.payload.name,
//         email: action.payload.email,
//       };
//     case "customer/update":
//       return { ...state, fullname: action.payload };

//     default:
//       return state;
//   }
// }

// export function createCustomer(name, email) {
//   return function (dispatch, getState) {
//     dispatch({ type: "customer/createCustomer", payload: { name, email } });
//     const data = getState().customer;

//     setData("customer", data);
//   };
// }

// export function updateCustomer(name) {
//   return function (dispatch, getState) {
//     dispatch({ type: "customer/update", payload: name });
//     const data = getState().customer;

//     setData("customer", data);
//   };
// }
