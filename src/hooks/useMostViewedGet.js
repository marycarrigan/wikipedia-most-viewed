import axios from "axios";
import { useState } from "react";

// https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews
const useMostViewedGet = (date, number) => {
  const [results, setResults] = useState([]);

  const doGet = async () => {
    const formattedDate = date.toFormat("yyyy/LL/dd");
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${formattedDate}`;
    try {
      const response = await axios.get(url);
      setResults(response.data.items[0].articles);
    } catch (error) {
      console.error(error);
      setResults([]);
    }
  };

  // TODO handle error response
  return { results, doGet };
};

export default useMostViewedGet;
