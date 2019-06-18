import Question from './Question';
import TriviaApi from './TriviaApi';

class Quiz {

  //static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    this.unasked = []; // Array of Question instances
    this.asked = []; // Array of Question instances
    this.score = 0; // integer
    this.scoreHistory = []; //array of integers
    this.active = false; //boolean
    this.BASE_URL = 'https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple';
    this.triviaApi = new TriviaApi(this.BASE_URL);
  }

  // Change active to true, puts first question in asked array (per wireframe)
  startGame() {
    this.active = true;
    this.getQuestions().then(() => {
      //console.log(this.unasked);
      this.nextQuestion();
      console.log(this);
      // Start rendering quiz UI
    });
  }

  getQuestions() {
    return this.triviaApi.triviaApiFetch().then((responseObj) => {
      this.unasked = responseObj.results.map(result => {
        return new Question(result.question, result.incorrect_answers, result.correct_answer);
      });
      return Promise.resolve(true);
    });
  }

  // Adds current score to score history (called by stopGame)
  addScoreHistory() {
    this.scoreHistory.push(this.score);
  }

  // Take first question object out of array, place it in askedQuestions array
  nextQuestion() {
    const askedQuestion = this.unasked.shift();
    this.asked.push(askedQuestion);
  }

  // if the answer is correct, increment score by 1
  incrementScore() {
    this.score +=1;
  }
  // $('.submit').submit(() => {
  //   quiz.handleAnswer($('.answer').val());
  // })
  handleAnswer(userInput) {
    const currentQuestion = this.asked[this.asked.length-1];
    currentQuestion.submitAnswer(userInput);
    if (currentQuestion.answerStatus() === 1) {
      this.incrementScore();
    }
    console.log(this);
  }

  // When game is stopped invoke addScoreHistory and set active to false
  stopGame() {
    this.addScoreHistory();
    this.active = false;
  }
}

export default Quiz;
