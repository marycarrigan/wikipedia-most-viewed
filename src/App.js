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
  InputLabel,
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
import countries from "./countries";

function App() {
  const numResultsOptions = [25, 50, 75, 100, 200];

  const yesterday = DateTime.now().plus({ days: -1 });

  const [date, setDate] = useState(yesterday);
  const [numResults, setNumResults] = useState(100);
  const [countryCode, setCountryCode] = useState("ALL");
  const [selectedArticle, setSelectedArticle] = useState("");
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  const {
    results: mostViewsResults,
    doGet: doGetMostViews,
    loading: mostViewsLoading,
  } = useMostViewedGet(date, numResults, countryCode);
  const {
    results: articleViewsResults,
    loading: articleViewsLoading,
    doGet: doGetArticleViews,
  } = useArticleViewsGet(selectedArticle);

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
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
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
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={8} md={5}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  label="Country"
                >
                  {countries.map((value) => (
                    <MenuItem key={value.code} value={value.code}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} md={2}>
              <FormControl fullWidth>
                <Select
                  value={numResults}
                  onChange={(event) => setNumResults(event.target.value)}
                >
                  {numResultsOptions.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box pt={2}>
          {mostViewsLoading && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="secondary" />
            </Box>
          )}
          {!mostViewsLoading && (
            <>
              {mostViewsResults.length == 0 && (
                <Box pt={4} display="flex" justifyContent="center">
                  No results found.
                </Box>
              )}
              {mostViewsResults.length != 0 && (
                <Grid container spacing={2}>
                  {mostViewsResults.map((result, index) => {
                    return (
                      <Grid key={index} item xs={12} sm={6} md={4}>
                        <ArticleCard
                          result={result}
                          onMoreInfo={onMoreInfo}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </>
          )}
        </Box>
      </Paper>
      <MoreInfoDialog
        article={selectedArticle}
        open={moreInfoOpen}
        onClose={moreInfoOnClose}
        articleViewsResults={articleViewsResults}
        loading={articleViewsLoading}
      />
    </>
  );
}

export default App;
