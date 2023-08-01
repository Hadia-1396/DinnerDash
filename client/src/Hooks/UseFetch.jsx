import axios from "axios";
import { useEffect, useState } from "react";

const UseFetch = (endpoint) => {
  const [items, setItems] = useState();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + endpoint)
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [items];
};

export default UseFetch;
