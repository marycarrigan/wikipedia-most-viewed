import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ArticleCard = ({ result, onMoreInfo }) => {
  return (
    <Card raised>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Rank: {result.rank}
        </Typography>
        <Typography sx={{ mb: 0.5 }} variant="h5" component="div">
          {result.article.replaceAll("_", " ")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {result.views} views
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onMoreInfo(result)}>More Info</Button>
      </CardActions>
    </Card>
  );
};
export default ArticleCard;
