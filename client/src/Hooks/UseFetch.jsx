import axios from "axios";
import { useEffect, useState } from "react";

const UseFetch = (endpoint) => {
  const [items, setItems] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/" + endpoint)
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  return [items];
};

export default UseFetch;
