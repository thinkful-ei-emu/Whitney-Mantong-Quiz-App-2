import Question from './Question';
import TriviaApi from './TriviaApi';

class Quiz {

  //static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    this.unasked = []; // Array of Question instances
    this.asked = []; // Array of Question instances
    this.score = 0; //integer
    this.scoreHistory = []; //array of integers
    this.active = false; //boolean

  }

  // Change active to true, puts first question in asked array (per wireframe)
  startGame() {
    this.active = true;
    const triviaApi = new TriviaApi();
    console.log(triviaApi);
    console.log(triviaApi.getQuestions());
    console.log(questionObj);

    questionObj.forEach(() => {
      const singleQuestion = new Question();
      Question.text = singleQuestion.question;
      Question.answers = (singleQuestion['correct_answer'] + singleQuestion['incorrect_answers']);
      Question.correctAnswer = singleQuestion['correct_answer'];

      this.unasked.push(singleQuestion);
    });
    this.nextQuestion();
  }

  // Adds current score to score history (called by stopGame)
  addScoreHistory() {
    this.scoreHistory.push(this.score);
  }

  createQuestion() {

  }

  // Take first question object out of array, place it in askedQuestions array
  nextQuestion() {
    const askedQuestion = this.unasked.shift();
    this.asked.push(askedQuestion);
  }

  // if the answer is correct, increment score by 1
  changeScore() {
    if (Question.userAnswer === Question.correctAnswer) {
      this.score +=1;
    }
  }

  // When game is stopped invoke addScoreHistory and set active to false
  stopGame() {
    this.addScoreHistory();
    this.active = false;
  }
}

export default Quiz;
