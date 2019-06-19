import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`
    
    return `
      <div class="score-bar">
      <ul>
       <li> Score:${this.model.score} </li>
       <li> High Score: ${this.model.highScore}</li>
       <li> Progress: ${this.model.progress()}  </li>
       </ul>
      </div>
    `;
  }
}

export default QuizStatus;