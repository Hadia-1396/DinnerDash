import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const UseFetch = (endpoint) => {
  const [items, setItems] = useState();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchData = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + endpoint, {
        headers: headers,
      })
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return [items, fetchData];
};

export default UseFetch;
