import axios from "axios";
import { useState } from "react";

/**
 * Ultimately, I decided not to use this as I encountered an issue with wikipedia's CORS policy blocking
 * development - I used a Chrome extension for some testing but as that convoluted the set up, 
 * I didn't think it was a viable solution
 * 
 */
const useArticleTextGet = () => {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

  const doGet = async (article) => {
    setLoading(true);

    const url = `http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&titles=${article}&exintro=1`;
    try {
      const response = await fetch(url);
      const t = await response.json();
      setResults(Object.values(t.query.pages)[0].extract);
    } catch (error) {
      console.error(error);
      setResults("");
    } finally {
      setLoading(false);
    }
  };

  return { results, doGet, loading };
};

export default useArticleTextGet;
