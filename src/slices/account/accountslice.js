const initialStateAccount = {
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

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdrawal":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        purpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        purpose: "",
      };

    default:
      return state;
  }
}

export function deposit(amount) {
  // return {
  //   type: "account/deposit",
  //   payload: amount,
  // };

  return function (dispatch, getState) {
    dispatch({
      type: "account/deposit",
      payload: amount,
    });

    const data = getState().account;

    setData("account", data);
  };
}

export function withdrawal(amount) {
  // return { type: "account/withdrawal", payload: amount };

  return function (dispatch, getState) {
    dispatch({ type: "account/withdrawal", payload: amount });

    const data = getState().account;

    setData("account", data);
  };
}

export function requestLoan(amount, purpose) {
  return function (dispatch, getState) {
    dispatch({
      type: "account/requestLoan",
      payload: {
        amount,
        purpose,
      },
    });
    const data = getState().account;

    setData("account", data);
  };
}

export function payLoan() {
  return function (dispatch, getState) {
    dispatch({
      type: "account/payLoan",
    });
    const data = getState().account;

    setData("account", data);
  };
}
