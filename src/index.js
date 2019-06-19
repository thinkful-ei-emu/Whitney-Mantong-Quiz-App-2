import $ from 'jquery';
import Quiz from './Quiz';
import QuizDisplay from './QuizDisplay';
import QuizStatus from './QuizStatus';
import './styles/styles.css';

function main() {
  const quiz = new Quiz();
  const quizDisplay = new QuizDisplay(quiz,'.display');
  const quizStatus = new QuizStatus(quiz,'.status');
  window.quiz = quiz;  // adding `q` to `window`, so you can examine it in console
}

$(main);

