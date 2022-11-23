import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { DateTime } from "luxon";

const MoreInfoDialog = ({ article, open, onClose, articleResults }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{article?.replaceAll("_", " ")}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid sx={{ fontWeight: "fontWeightMedium" }} item xs={8}>
            Date
          </Grid>
          <Grid sx={{ fontWeight: "fontWeightMedium" }} item xs={4}>
            Views
          </Grid>
          {articleResults.map((result, index) => (
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
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default MoreInfoDialog;
