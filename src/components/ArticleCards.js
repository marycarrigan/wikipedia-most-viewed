import { Box, CircularProgress, Grid } from "@mui/material";
import { ArticleCard } from "./";
import React from "react";

const ArticleCards = ({ articles, loading, onMoreInfo }) => {
  return (
    <Box pt={2}>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress/>
        </Box>
      )}
      {!loading && (
        <>
          {articles.length === 0 && (
            <Box pt={4} display="flex" justifyContent="center">
              No results found.
            </Box>
          )}
          {articles.length !== 0 && (
            <Grid container spacing={2}>
              {articles.map((result, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <ArticleCard result={result} onMoreInfo={onMoreInfo} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};
export default ArticleCards;
