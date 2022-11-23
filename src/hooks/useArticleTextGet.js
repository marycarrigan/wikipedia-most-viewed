import axios from "axios";
import { useState } from "react";

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
      // make improvements for error handling here
      console.error(error);
      setResults("");
    } finally {
      setLoading(false);
    }
  };

  return { results, doGet, loading };
};

export default useArticleTextGet;
