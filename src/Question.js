import Model from './lib/Model';

class Question extends Model {
  constructor(questionData) {
    super();
    this.text = questionData.question; //Question text
    this.answers = [questionData.correct_answer, ...questionData.incorrect_answers]; //Array of strings, each a unique answer
    this.correctAnswer = questionData.correct_answer; //Correct answer string, must match at least one element of answers array
    this.userAnswer = null; //Answer provided by user
    this._shuffle(this.answers);
  }

  // shuffle function
  _shuffle(arr) {
    let currentIndex = arr.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }

  //sets the userAnswer prop
  submitAnswer(answer) {
    this.userAnswer = answer;
  }

  //returns {Integer} indicating question's state: -1: unanswered, 0: answered incorrectly, 1: answered correctly
  answerStatus() {
    if (this.userAnswer === null) {
      return -1;
    }else
    if(this.userAnswer !== this.correctAnswer) {
      return 0;
    } else
    {
      return 1;
    }
  }


}

export default Question;
