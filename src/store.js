import { configureStore } from "@reduxjs/toolkit";
import accountReducer, {
  loadAccountFromStorage,
} from "./slices/account/accountslice";
import customerReducer from "./slices/customer/customerslice";

const persistentData = loadAccountFromStorage();

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
  preloadedState: persistentData,
});

export default store;
