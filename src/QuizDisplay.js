import $ from 'jquery';
import Renderer from './lib/Renderer';

class QuizDisplay extends Renderer {

  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'click .submit': 'handleSubmit',
      'click .continue': 'handleContinue',
      'click .playAgain': 'handlePlayAgain'
    };
  }

  _generateIntro() {
    return `
      <div>
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
      return `<label for="${i}"> ${answer}
      <input type="radio" name="answer" id="${i}" value="${answer}" checked>
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
    <p>${this.model.getCurrentQuestion().correctAnswer}</p>
    </div>
    <button class="continue">Continue</button>`;
  }

  generateFalseAnswer() {
    return `<div>
    <p>Sorry, that's incorrect.</p>
    <p>You answered:</p>
    <p>${this.model.getCurrentQuestion().userAnswer}</p>
    <p>The correct answer was:</p>
    <p>${this.model.getCurrentQuestion().correctAnswer}</p>
    </div>
    <button class="continue">Continue</button>`;
  }

  selectAnswer() {
    const userAnswer = this.model.getCurrentQuestion().userAnswer;
    const correctAnswer = this.model.getCurrentQuestion().correctAnswer;
    console.log(userAnswer);
    console.log(correctAnswer);

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
    <div>
      <p>
        ${this.model.getCurrentQuestion().text}
      </p>
      <div>${this.selectAnswer()}</div>
    </div>
  `;
  }

  generateComplete() {
    return `<div>
    <p>Good job!</p>
    <p>Your final score was ${this.model.score} out of ${this.model.asked.length}.</p>
    ${this.generateCongrats()}
    <button class="playAgain">Play Again</button>
    </div>`;
  }

  generateCongrats() {
    if (this.model.score > this.model.highScore) {
      return `<p>
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
    } else if (this.model.unasked.length !== 0)
    {
      html = this._generateQuestion();
    } else if (this.model.unasked.length === 0 && this.model.userAnswer !== null) {
      console.log(this.model.userAnswer);
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
    if (this.model.unasked.length !== 0) {
      this.model.nextQuestion();
      this.model.update();
    } else {
      console.log(this.model.unasked.length);
      this.generateComplete();
      this.model.update();
    }
    
  }

  handlePlayAgain() {
    // handle Play Again button
  }
}




export default QuizDisplay;
