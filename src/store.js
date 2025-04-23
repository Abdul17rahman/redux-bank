import { combineReducers, createStore } from "redux";
import accountReducer, {
  deposit,
  withdrawal,
  requestLoan,
  payLoan,
} from "./slices/account/accountslice";
import customerReducer, {
  createCustomer,
  updateCustomer,
} from "./slices/customer/customerslice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;

// store.dispatch(deposit(1000));
// console.log(store.getState());

// store.dispatch(requestLoan(10000, "Buy a Car"));
// console.log(store.getState());

// store.dispatch(payLoan());
// console.log(store.getState());

// store.dispatch(withdrawal(300));
// console.log(store.getState());

// store.dispatch(createCustomer("Abdul", "abdul@gmail.com"));
// console.log(store.getState());

// store.dispatch(updateCustomer("Abdul Rahman"));
// console.log(store.getState());
