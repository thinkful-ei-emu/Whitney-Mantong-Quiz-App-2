class TriviaApi {
  static BASE_URL = 'https://opentdb.com/api.php';

  triviaApiFetch(count) {
    const url = new URL(TriviaApi.BASE_URL);
    url.searchParams.set('amount', count);
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
