import axios from "axios";
import { useEffect, useState } from "react";

const UseFetch = (endpoint) => {
  const [items, setItems] = useState();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + endpoint, {
        headers: headers,
      })
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [items];
};

export default UseFetch;
