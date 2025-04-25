import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  purpose: "",
};

export function loadAccountFromStorage() {
  try {
    const saved = localStorage.getItem("appData");

    if (!saved) return undefined;

    const { account, customer } = JSON.parse(saved);

    return {
      account,
      customer,
    };
  } catch (err) {
    return undefined;
  }
}

function setData(key, value) {
  const data = JSON.parse(localStorage.getItem("appData")) || {};

  data[key] = value;

  localStorage.setItem("appData", JSON.stringify(data));
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      setData("account", { ...state });
    },
    withdrawal(state, action) {
      if (state.balance <= 0 || state.balance < action.payload) return;
      state.balance -= action.payload;
      setData("account", { ...state });
    },
    requestLoan: {
      // This is used to pass more than one argument into the payload
      prepare(loan, purpose) {
        return {
          payload: {
            loan,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.loan;
        state.purpose = action.payload.purpose;
        state.balance += action.payload.loan;
        setData("account", { ...state });
      },
    },
    payLoan(state) {
      if (!(state.balance > state.loan)) return;
      state.balance -= state.loan;
      state.loan = 0;
      state.purpose = "";
      setData("account", { ...state });
    },
  },
});

// This deposit thunk is calling an API to convert currencies.
export function deposit(amount, currency) {
  if (currency === "USD")
    return function (dispatch) {
      dispatch(accountSlice.actions.deposit(amount));
    };

  return async function (dispatch) {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );

    const { rates } = await res.json();

    const cur = Math.floor(rates.USD * amount);

    dispatch(accountSlice.actions.deposit(cur));
  };
}

export const { withdrawal, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload };
//     case "account/withdrawal":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         purpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         purpose: "",
//       };

//     default:
//       return state;
//   }
// }

// export function withdrawal(amount) {
//   return function (dispatch, getState) {
//     dispatch({ type: "account/withdrawal", payload: amount });

//     const data = getState().account;

//     setData("account", data);
//   };
// }

// export function requestLoan(amount, purpose) {
//   return function (dispatch, getState) {
//     dispatch({
//       type: "account/requestLoan",
//       payload: {
//         amount,
//         purpose,
//       },
//     });
//     const data = getState().account;

//     setData("account", data);
//   };
// }

// export function payLoan() {
//   return function (dispatch, getState) {
//     dispatch({
//       type: "account/payLoan",
//     });
//     const data = getState().account;

//     setData("account", data);
//   };
// }
