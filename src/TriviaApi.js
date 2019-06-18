class TriviaApi {
  constructor(baseUrl = ''){
    this.error = '';
    this.baseUrl = baseUrl;
  }

  // getToken() {
  //   return fetch('https://opentdb.com/api_token.php?command=request')
  //     .then(response => {
  //       if (!response.ok) {
  //         this.error = {code: response.status};
  //         return response.json();
  //       }
  //     })
  //     .then (jsonResponse => {
  //       if (this.error) {
  //         this.error.message = jsonResponse.message;
  //         return Promise.reject(this.error);
  //       }
  //     });
  // }

  triviaApiFetch() {
    // setup error variable in scope outside of promise chain
    let error;
    return fetch(this.baseUrl)
      .then(res => {
        if (!res.ok) {
          // if response is not 2xx, start building error object
          error = { code: res.status };
  
          // if response is not JSON type, place Status Text in error object and
          // immediately reject promise
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
  
        // otherwise, return parsed JSON
        return res.json();
      })
      .then(data => {
        // if error exists, place the JSON message into the error object and 
        // reject the Promise with your error object so it lands in the next 
        // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
        // will respond with a JSON object containing message key
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        // otherwise, return the json as normal resolved Promise
        return data;
      });
  }
}

export default TriviaApi;
