class Question {
  constructor(text = '', answers = [], correctAnswer = '') {
    this.text = text; //Question text
    this.answers = answers; //Array of strings, each a unique answer
    this.correctAnswer = correctAnswer; //Correct answer string, must match at least one element of answers array
    this.userAnswer = ''; //Answer provided by user
  }

  //sets the userAnswer prop
  submitAnswer(answer) {
    this.userAnswer = answer;
  }

  //returns {Integer} indicating question's state: -1: unanswered, 0: answered incorrectly, 1: answered correctly
  answerStatus() {
    if (this.userAnswer === '') {
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
