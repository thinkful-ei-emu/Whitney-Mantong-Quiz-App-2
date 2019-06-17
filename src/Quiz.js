import Question from './Question';

class Quiz {

  static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false; //boolean

    // TASK: Add more props here per the exercise
    this.scoreHistory = []; //array of integers
    this.score = 0; //integer

  }

  // Example method:
  startGame() {
    this.active = true;
    this.unasked.push(triviaApi.data.results)
  }

  addScoreHistory() {}

  setScore(boolean) {
    if (true) {
      this.score +=1;
    }
  }

  nextQuestion() {
    const askedQuestion = this.unasked.shift();
    this.asked.push(askedQuestion);
  }

  changeScore() {
    if (this.userAnswer === this.correctAnswer) {
      Quiz.setScore(true);
    }
  }
}

export default Quiz;
