import {
  AppBar,
  Box,
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
import { useMostViewedGet, useArticleViewsGet } from "./hooks";
import { DateTime } from "luxon";
import countries from "./countries";
import { ArticleCards, MoreInfoDialog } from "./components";

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
        <ArticleCards articles={mostViewsResults} loading={mostViewsLoading} onMoreInfo={onMoreInfo}/>
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
