class TriviaApi {
  static BASE_URL = 'https://opentdb.com/api.php';
  static TOKEN = ''; 

tokenValidation() {
  if(this.TOKEN === '') {
    console.log('No token detected, getting new token')
    this.tokenFetch();
  }
}

  tokenFetch() {
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then(res => {
        if (!res.ok) {
          return Promise.reject({message: res.statusText});
        }
        return res.json();
      })
      .then(data => {
        if (data.response_code !== 0) {
          return Promise.reject({message: "Token not made!"});
        }
        this.TOKEN = JSON.stringify(data.token);
        console.log('Got the new token, and assigned it', this.TOKEN);
      })
  }
  
  triviaApiFetch(count) {
    const url = new URL(TriviaApi.BASE_URL);
    url.searchParams.set('amount', count);
    url.searchParams.set('token', TriviaApi.TOKEN);
    console.log(url);
    return fetch(url)
      .then(res => {
        if (!res.ok) {
          return Promise.reject({message: res.statusText});
        }
        return res.json();
      })
      .then(data => {
        if (data.response_code !== 0) {
          return Promise.reject({message: `API returned error code: ${data.response_code}.  Try a different request.`});
        }
        return data
      });
    }
  }

export default TriviaApi;
