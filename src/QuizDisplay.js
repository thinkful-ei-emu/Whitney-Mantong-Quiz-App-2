import $ from 'jquery';
import Renderer from './lib/Renderer';
import Model from './lib/Model';
import Quiz from './Quiz';

class QuizDisplay extends Renderer {

  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
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
  _generateQuestion(){
    return `
    <div>
      <p>
        ${this.model.getCurrentQuestion().text}
      </p>
      <form>
        
      </form>
    </div>
    <div class="buttons">
      <button class="submit">Submit</button>
    </div>
  `;
  }
  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }
    else {
      html = this._generateQuestion();
    }
    return html;
  }

  handleStart() {
    this.model.startGame();
  }
}

export default QuizDisplay;
