import {
  Box,
  Paper,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useMostViewedGet from "./hooks/useMostViewedGet";

function App() {
  const [date, setDate] = useState(null);
  const { results, doGet } = useMostViewedGet(date, 100);
  console.log(results);
  return (
    <>
      <Box p={3}>Take Home Grow Assessment</Box>
      <Paper elevation={3} sx={{ padding: 4 }}>
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
            onClose={() => doGet()}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {results.map((result, index) => {
          return (
            <Card key={index}>
              <CardContent>
                <Box p={2}>
                  <Box fontWeight="fontWeightBold">{result.article}</Box>
                  <Box fontSize=".75rem"> {result.views} views</Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Paper>
    </>
  );
}

export default App;
