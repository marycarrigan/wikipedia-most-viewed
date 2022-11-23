import axios from "axios";
import { useEffect, useState } from "react";

// API docs: https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews
// improvements: make this paginated? don't refetch everything when num results changes

const useMostViewedGet = (date, number, countryCode) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doGet();
  }, [countryCode])

  const doGet = async () => {
    setLoading(true);
    const formattedDate = date.toFormat("yyyy/LL/dd");
    
    const path = countryCode ? `top-per-country/${countryCode}` : `top/en.wikipedia`;

    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/${path}/all-access/${formattedDate}`;

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
