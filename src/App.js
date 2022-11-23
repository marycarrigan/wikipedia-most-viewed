import {
  AppBar,
  Box,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useMostViewedGet from "./hooks/useMostViewedGet";
import { DateTime } from "luxon";
import ArticleCard from "./components/ArticleCard";
import MoreInfoDialog from "./components/MoreInfoDialog";
import useArticleViewsGet from "./hooks/useArticleViewsGet";
import useArticleTextGet from "./hooks/useArticleTextGet";

function App() {
  const numResultsOptions = [25, 50, 75, 100, 200];

  const yesterday = DateTime.now().plus({ days: -1 });

  const [date, setDate] = useState(yesterday);
  const [numResults, setNumResults] = useState(100);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  const { results: mostViewsResults, doGet: doGetMostViews, loading: mostViewsLoading } = useMostViewedGet(date, numResults);
  const { results: articleViewsResults, loading: articleViewsLoading, doGet: doGetArticleViews } = useArticleViewsGet(selectedArticle);
  const { results: articleTextResults, loading: articleTextLoading, doGet: doGetArticleText } = useArticleTextGet(selectedArticle);

  useEffect(() => {
    doGetMostViews();
  }, []);

  const moreInfoOnClose = () => {
    setSelectedArticle("");
    setMoreInfoOpen(false);
  };

  const onMoreInfo = (article) => {
    setSelectedArticle(article);
    setMoreInfoOpen(true);
    doGetArticleViews(article);
    doGetArticleText(article);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box p={3}>Wikipedia: Most Viewed Pages</Box>
        </Toolbar>
      </AppBar>
      <Paper sx={{ padding: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DatePicker
              disableFuture
              label="Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              disableMaskedInput
              onClose={() => doGetMostViews()}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl>
            <Select
              value={numResults}
              onChange={(event) => setNumResults(event.target.value)}
            >
              {numResultsOptions.map((value) => (
                <MenuItem key={value} value={value}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box pt={2}>
          {mostViewsLoading && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="secondary" />
            </Box>
          )}
          {!mostViewsLoading && (
            <Grid container spacing={2}>
              {mostViewsResults.map((result, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <ArticleCard
                      title={result.article}
                      views={result.views}
                      rank={result.rank}
                      onMoreInfo={onMoreInfo}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Paper>
      <MoreInfoDialog
        article={selectedArticle}
        open={moreInfoOpen}
        onClose={moreInfoOnClose}
        articleViewsResults={articleViewsResults}
        articleTextResults={articleTextResults}
        loading={articleViewsLoading || articleTextLoading}
      />
    </>
  );
}

export default App;
