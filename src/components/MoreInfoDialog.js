import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import { DateTime } from "luxon";
import React from "react";

const ViewRow = ({ result }) => {
  return (
    <>
      <Grid item xs={8}>
        {DateTime.fromFormat(result.timestamp, "yyyyMMddhh").toFormat(
          "MMMM dd, yyyy"
        )}
      </Grid>
      <Grid item xs={4}>
        {result.views}
      </Grid>
    </>
  );
};

const MoreInfoDialog = ({
  article,
  open,
  onClose,
  articleViewsResults,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{article?.article?.replaceAll("_", " ")}</DialogTitle>
      <DialogContent>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <>
            <Box display="flex" justifyContent="center">
              Most Viewed Days in {DateTime.local().monthLong}
            </Box>
            <Box py={2}>
              <Divider />
            </Box>
            {articleViewsResults.length !== 0 && (
              <Grid container spacing={2}>
                <Grid sx={{ fontWeight: "fontWeightMedium" }} item xs={8}>
                  Date
                </Grid>
                <Grid sx={{ fontWeight: "fontWeightMedium" }} item xs={4}>
                  Views
                </Grid>
                {articleViewsResults.map((result, index) => (
                  <ViewRow key={index} result={result} />
                ))}
              </Grid>
            )}
            {articleViewsResults.length === 0 && (
              <Box>No information about top views this month available.</Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default MoreInfoDialog;
