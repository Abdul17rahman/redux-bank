import { useSelector } from "react-redux";

function Customer() {
  const { fullname } = useSelector((store) => store.customer);
  return <h2>👋 Welcome, {fullname}</h2>;
}

export default Customer;
