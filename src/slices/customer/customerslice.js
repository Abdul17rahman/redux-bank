const initialStateCustomer = {
  fullname: "",
  email: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullname: action.payload.name,
        email: action.payload.email,
      };
    case "customer/update":
      return { ...state, fullname: action.payload };

    default:
      return state;
  }
}

export function createCustomer(name, email) {
  return { type: "customer/createCustomer", payload: { name, email } };
}

export function updateCustomer(name) {
  return { type: "customer/update", payload: name };
}
