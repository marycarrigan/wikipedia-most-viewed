import axios from "axios";
import { useState } from "react";

// API docs: https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews
// improvements: make this paginated? don't refetch everything when num results changes

const useMostViewedGet = (date, number) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const doGet = async () => {
    setLoading(true);
    const formattedDate = date.toFormat("yyyy/LL/dd");
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${formattedDate}`;
    try {
      const response = await axios.get(url);
      setResults(response.data.items[0].articles.slice(0, number));
    } catch (error) {
      // make improvements for error handling here
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, doGet, loading };
};

export default useMostViewedGet;
