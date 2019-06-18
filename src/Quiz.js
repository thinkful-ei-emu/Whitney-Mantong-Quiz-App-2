import Question from './Question';
import TriviaApi from './TriviaApi';

class Quiz {

  static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    this.unasked = []; // Array of Question instances
    this.asked = []; // Array of Question instances
    this.score = 0; // integer
    this.scoreHistory = []; //array of integers
    this.active = false; //boolean
    }

  // Change active to true, puts first question in asked array (per wireframe)
  startGame() {
    this.unasked = [];
    this.asked = [];
    this.active = false;
    this.score = 0;

    const triviaApi = new TriviaApi();
    triviaApi.getQuestions(Quiz.DEFAULT_QUIZ_LENGTH)
      .then(data => {
        data.results.forEach(questionData => {
          this.unasked.push(new Question(questionData));
          this.nextQuestion();
          this.active = true;
        });
    })
    .catch(err => console.log(err.message));
  }

  getCurrentQuestion() {
    return this.asked[0];
  }

  // Adds current score to score history (called by stopGame)
  addScoreHistory() {
    this.scoreHistory.push(this.score);
  }

  // Take first question object out of array, place it in askedQuestions array
  nextQuestion() {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && currentQuestion.AnswerStatus() === -1) {
      return false
    }

    this.asked.unshift(this.unasked.pop());
    return true;
  }

  // if the answer is correct, increment score by 1
  incrementScore() {
    this.score +=1;
  }

  handleAnswer(userInput) {
    const currentQuestion = this.getCurrentQuestion();

    if (!currentQuestion) return false;
    if (currentQuestion.AnswerStatus() !== -1) return false;
    currentQuestion.submitAnswer(userInput);
    if (currentQuestion.AnswerStatus() === 1) {
      this.incrementScore();
    }
    return true;
    }
  }

export default Quiz;
