import CreateCustomer from "./CreateCustomer";
import Customer from "./Customer";
import AccountOperations from "./AccountOperations";
import BalanceDisplay from "./BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const { fullname } = useSelector((store) => store.customer);

  return (
    <div>
      <h1>🏦 The React-Redux Bank</h1>
      {fullname ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
}

export default App;
