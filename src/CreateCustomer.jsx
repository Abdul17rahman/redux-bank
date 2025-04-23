import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./slices/customer/customerslice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(createCustomer(fullName, email));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
