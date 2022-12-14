import axios from "axios";
import { useState } from "react";
import { DateTime } from "luxon";

// API docs: https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews

const findTop3DaysOfViews = (results) => {
    let top3 = [{views: 0}, {views: 0}, {views: 0}]
    results.forEach((element) => {
        if(element.views > top3[0].views){
            top3[2] = top3[1]
            top3[1] = top3[0]
            top3[0] = element
        }else if(element.views > top3[1].views && element.views !== top3[0].views){
            top3[2] = top3[1]
            top3[1] = element
        }else if(element.views > top3[2] && element.views !== top3[1].views){
            top3[2] = element
        }
    })
    return top3
}

const useArticleViewsGet = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const doGet = async (article) => {
    setLoading(true);
    const firstOfMonth = DateTime.local().startOf('month');
    const lastOfMonth = DateTime.local().endOf('month');
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${article.project || "en.wikipedia"}/all-access/all-agents/${article.article}/daily/${firstOfMonth.toFormat("yyyyLLdd")}00/${lastOfMonth.toFormat("yyyyLLdd")}00`;
    try {
      const response = await axios.get(url);
      const top3days = findTop3DaysOfViews(response.data.items);
      setResults(top3days);
    } catch (error) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, doGet, loading };
};

export default useArticleViewsGet;