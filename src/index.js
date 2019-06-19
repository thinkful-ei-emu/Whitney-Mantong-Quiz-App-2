import $ from 'jquery';
import Quiz from './Quiz';
import QuizDisplay from './QuizDisplay';
import QuizStatus from './QuizStatus';
import './styles/styles.css';
import TriviaApi from './TriviaApi';

function main() {
  const quiz = new Quiz();
  const quizDisplay = new QuizDisplay(quiz,'.display');
  const quizStatus = new QuizStatus(quiz,'.status');
  const triviaApi = new TriviaApi();
  window.quiz = quiz;  // adding `q` to `window`, so you can examine it in console
  window.triv = triviaApi;
}

$(main);

