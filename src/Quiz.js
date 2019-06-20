import Question from './Question';
import TriviaApi from './TriviaApi';
import Model from './lib/Model';

class Quiz extends Model {

  static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    super();
    
    this.highScore = 0;
    this.unasked = []; // Array of Question instances
    this.asked = []; // Array of Question instances
    this.score = 0; // integer
    this.scoreHistory = []; //array of integers
    this.active = false; //boolean
    this.token = ''; // string
    this.currentQuestion = this.getCurrentQuestion();
    this.triviaApi = new TriviaApi();
    }
   
    tokenValidation() {
      return new Promise((resolve, reject) => {
        if(this.token === '') {
          console.log('No token detected, getting new token')
          this.triviaApi.tokenFetch()
            .then((token) => {
              this.token = token;
              resolve();
            })
        } else {
          resolve();
        }
      }) 
    }

  // Change active to true, puts first question in asked array (per wireframe)
  startGame() {
    console.log(TriviaApi.BASE_URL);
    this.unasked = [];
    this.asked = [];
    this.active = false;
    this.score = 0;
    
    this.tokenValidation()
      .then(() => {
        return this.triviaApi.triviaApiFetch(Quiz.DEFAULT_QUIZ_LENGTH, this.token)
        .then(data => {
          data.results.forEach(questionData => {
            this.unasked.push(new Question(questionData));
          });
          this.active = true;
          this.nextQuestion();
          this.update();
        })
      })
      .catch(err => console.log(err.message));
  }

  totalQuestions (){
    return this.asked.length + this.unasked.length;
  }

  getCurrentQuestion() {
    //console.log(this.asked[0]);
    return this.asked[0];
  }

  // Adds current score to score history (called by stopGame)
  addScoreHistory() {
    this.scoreHistory.push(this.score);
  }

  progress(){
    if (this.active === false){
      return 'Inactive';
    }
      return  `${this.asked.length} of ${this.totalQuestions()}`;
  }

  // Take first question object out of array, place it in askedQuestions array
  nextQuestion() {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && currentQuestion.answerStatus() === -1) {
      return false
    }

    this.asked.unshift(this.unasked.pop());
    return true;
  }

  // if the answer is correct, increment score by 1
  incrementScore() {
    this.score +=1;
  }

  highScoreReport(){
    this.highScore = Math.max(...this.scoreHistory);
  }

  handleAnswer(userInput) {
    const currentQuestion = this.getCurrentQuestion();

    if (!currentQuestion) return false;
    if (currentQuestion.answerStatus() !== -1) return false;
    currentQuestion.submitAnswer(userInput);
    if (currentQuestion.answerStatus() === 1) {
      this.incrementScore();
    }
    return true;
    }

    endOfQuiz() {
      this.active = false;
      // this.addScoreHistory();
      // this.highScoreReport();
    }
  }



export default Quiz;
