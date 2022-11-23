import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { DateTime } from "luxon";

const MoreInfoDialog = ({
  article,
  open,
  onClose,
  articleViewsResults,
  articleTextResults,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{article?.replaceAll("_", " ")}</DialogTitle>
      <DialogContent>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <Grid container spacing={2}>
            <Grid sx={{ fontWeight: "fontWeightMedium" }} item xs={8}>
              Date
            </Grid>
            <Grid sx={{ fontWeight: "fontWeightMedium" }} item xs={4}>
              Views
            </Grid>
            {articleViewsResults.map((result) => (
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
            ))}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Box fontWeight="fontWeightMedium" pb={1}>
                Introduction
              </Box>
              {articleTextResults}
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default MoreInfoDialog;
