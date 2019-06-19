import $ from 'jquery';
import Renderer from './lib/Renderer';

class QuizDisplay extends Renderer {

  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'click .submit': 'handleSubmit',
      'click .continue': 'handleContinue',
      'click .play-again': 'handlePlayAgain'
    };
  }

  _generateIntro() {
    return `
      <div class="intro">
        <p>
          Welcome to the Trivia Quiz
        </p>
        <p>
          Test your smarts and see how high you can score!
        </p>
      </div>
      <div class="buttons">
        <button class="start-quiz">Start Quiz</button>
      </div>
    `;
  }

  generateAnswers() {
    this.arrayOfAnswers = this.model.getCurrentQuestion().answers.map((answer, i) => {
      return `<label for="${i}"> 
      <input type="radio" name="answer" id="${i}" value="${answer}" checked>${answer}
      </label>`;
    });
    return `<form class="js-form">
      ${this.arrayOfAnswers.join('')}
      </form>
      <div class="buttons">
      <button class="submit">Submit</button>
      </div>`;
  }

  generateCorrectAnswer() {
    return `<div>
    <p>You got it!</p>
    <p>The correct answer was:</p>
    <p class="correct-answer">${this.model.getCurrentQuestion().correctAnswer}</p>
    </div>
    <div class="buttons">
      <button class="continue">Continue</button>
    </div>`;
  }

  generateFalseAnswer() {
    return `<div>
    <p>Sorry, that's incorrect.</p>
    <p>You answered:</p>
    <p class="incorrect-answer">${this.model.getCurrentQuestion().userAnswer}</p>
    <p>The correct answer was:</p>
    <p class="correct-answer">${this.model.getCurrentQuestion().correctAnswer}</p>
    </div>
    <div class="buttons">
      <button class="continue">Continue</button>
    </div>`;
  }

  selectAnswer() {
    const userAnswer = this.model.getCurrentQuestion().userAnswer;
    const correctAnswer = this.model.getCurrentQuestion().correctAnswer;
    //console.log(userAnswer);
    //console.log(correctAnswer);

    if (userAnswer === null) {
      return this.generateAnswers();
    } else if (userAnswer !== null && userAnswer !== correctAnswer) {
      //console.log('The answer is false');
      return this.generateFalseAnswer();
    } else {
      return this.generateCorrectAnswer();
    }
  }

  _generateQuestion(){
    return `
    <div class="question">
      <p>
        ${this.model.getCurrentQuestion().text}
      </p>
      <div>${this.selectAnswer()}</div>
    </div>
  `;
  }

  generateComplete() {
    return `<div class="complete">
    <p>Good job!</p>
    <p>Your final score was ${this.model.score} out of ${this.model.asked.length}.</p>
    ${this.generateCongrats()}
    </div>
    <div class="buttons">
      <button class="play-again">Play Again</button>
    </div>`;
  }

  generateCongrats() {
    if (this.model.score === this.model.highScore) {
      return `<p class="congrats">
      That's a new high score!
      </p>`;
    } else {
      return `<p>
      </p>`;
    }
  }



  template() {
    let html = '';
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    } else if (this.model.active === true) {
      html = this._generateQuestion();
    } else {
      html = this.generateComplete();
    }
    return html;
  }

  handleStart() {
    this.model.startGame();
  }


  handleSubmit() {
    let radioValue = $('input[name="answer"]:checked').val();
    //console.log(radioValue);
    this.model.handleAnswer(radioValue);
    this.model.update();
  }

  handleContinue(){
    //handle Continue button
    if (this.model.unasked.length > 0) {
      this.model.nextQuestion();
    } 
    else {
      this.model.addScoreHistory();
      this.model.highScoreReport();
      this.model.endOfQuiz();
    }
    this.model.update();

  }

  handlePlayAgain() {
    // handle Play Again button
    this.model.startGame();
    // do something with high score
    

  }
}




export default QuizDisplay;
