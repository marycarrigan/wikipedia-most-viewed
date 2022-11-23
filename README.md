## SETUP
```
npm install
```

## TO RUN LOCALLY

```
npm start
```

### Design Decisions 

### Performance Considerations
The only request performed on initial rendering is the call to get all 100 most viewed articles - other requests are performed as needed. However, I did not handle caching off the data when changing how many results to display, which means extra API calls to get all results again when the user selects a different number of results to display. If significantly more results were loaded, or pagination was introduced, this would likely need to change. 

#### Error Handling

The API documentation includes information about error responses - however the status codes are somewhat limited from what I can tell - 404 indicates either an error or no results found, and 429 indicates throttling. Because throttling is unlikely with such a small scale app/client, I chose to handle all errors from the server the same. However, this is not helpful to the user and could use improvement. 

#### Features

Future improvements I had in mind would be:
- Paginated results for the most viewed articles (although the API does not provide this, and only returns up to 1000 results)
- Making use of the external javascript - it seemed to be too much overhead for the functionality needed for this app
- Better error handling - all errors from the server cause "No results found" to be shown to the user without presenting any more useful information
- More information displayed for each article

I initially implemented another hook to fetch the first paragraph of the article, but ran into issues with Wikipedia's API not allow CORS. For a while, I used a Chrome extension that allowed the API calls, but could not find a simple or straightforward way to make calls from the UI to that API - it seems like it would be best if the frontend was able to call an internal API that then called the Wikipedia API. Or in a production-like environment, the proxy to point to could be set up to forward the API requests.
 
 http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&titles=${article}&exintro=1
