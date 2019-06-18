import Question from './Question';
import TriviaApi from './TriviaApi';
import Model from './lib/Model';
import Renderer from './lib/Renderer';

class Quiz extends Model {

  static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    super();
    
    this.highScore = 0;
    this.unasked = []; // Array of Question instances
    this.asked = []; // Array of Question instances
    this.score = 0; // integer
    this.scoreHistory = []; //array of integers
    this.active = false; //boolean
   
    this.currentQuestion=this.getCurrentQuestion();
    }
   
  // Change active to true, puts first question in asked array (per wireframe)
  startGame() {
    
    this.highScore =0;
    this.unasked = [];
    this.asked = [];
    this.active = false;
    this.score = 0;
    

    const triviaApi = new TriviaApi();
    triviaApi.triviaApiFetch(Quiz.DEFAULT_QUIZ_LENGTH)
      .then(data => {
        data.results.forEach(questionData => {
          this.unasked.push(new Question(questionData));
          this.nextQuestion();
          this.active = true;
          this.update();
        });
    
    })
    
    .catch(err => console.log(err.message));
  }
  totalQuestions (){
    return this.asked.length + this.unasked.length;
  }
  getCurrentQuestion() {
    console.log(this.asked[0]);
    return this.asked[0];
  }

  // Adds current score to score history (called by stopGame)
  addScoreHistory() {
    this.scoreHistory.push(this.score);
  }
  progress(){
    if (this.active===false){
      return 'Inactive';
    }
    else{
      return  `${this.asked.length} of ${this.totalQuestions()}`;
    }
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
  highScore(){
    this.highScore = Math.max(this.scoreHistory);
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
  }

export default Quiz;
