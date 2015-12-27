import React from "react";
import ReactDOM from "react-dom";
import API from "./api";
import us from "underscore";
import cx from "classnames";

import attachFastClick from "fastclick";

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    attachFastClick(document.body);
  }, false);
}

class App extends React.Component {

  render(){
    return(<div className="quiz">
             <Quiz data={this.props.list} />
          </div>);
  }

}


class Quiz extends React.Component {
  constructor(props){
    super(props);

    // from http://www.2ality.com/2013/11/initializing-arrays.html
    var arr = Array.apply(null, Array(this.props.data.length));
    let displayQuestionFlag = arr.map(function (x, i) { return false });

    let questionCounter = 0;
    displayQuestionFlag[questionCounter] = true;

    this.state = { displayQuestionFlag, questionCounter };
    this._nextQuestionHandler = this._nextQuestionHandler.bind(this);
  }

  render(){
    let airports = this.props.data.map( (airport, index) => {
      return this._buildQuestionForAirport(airport,
        this.state.displayQuestionFlag[index], index);
    });

    return (<div>
        <h2>Airport Code Quiz</h2>
        <div className="questions">
          {airports}
        </div>
      </div>
    );
  }

  _buildQuestionForAirport(airport, displayQuestion=false, index){
    return(<Question
           {...airport}
           key={index}
           displayQuestion={displayQuestion}
           nextQuestionHandler={this._nextQuestionHandler}
           />);
  }

  _nextQuestionHandler(){
    let questionCounter = this.state.questionCounter;
    let displayQuestionFlag = this.state.displayQuestionFlag;

    displayQuestionFlag[questionCounter] = false;
    questionCounter++;

    displayQuestionFlag[questionCounter] = true;
    this.setState({ displayQuestionFlag, questionCounter });
  }
}


class Question extends React.Component {

  constructor(){
    super();

    this.state = {
      isAnswered: false
    }
  }

  render(){
    let display = this.props.displayQuestion ? "block" : "none";

    return(<div className="card" style={{ display }}>
          <p>{this.props.name}</p>
          <AnswerList nextQuestionHandler={this.props.nextQuestionHandler}
            sortOrder={us.shuffle([0,1,2])}
            wrongAnswers={[this._generateWrongCode(), this._generateWrongCode()]}
            correctAnswer={this.props.code} />
         </div>);
  }


  _generateWrongCode(correctCode){
    // TODO: use correct code to check if EXACT SAME code was generated... low chances, but still.
    return [1,2,3].map( () => String.fromCharCode(us.random(65,90)) ).
      join("");
  }
}

class AnswerList extends React.Component {

  constructor(){
    super();

    this.state = { isAnswered: false };
    this._submitAnswerHandler = this._submitAnswerHandler.bind(this);
  }

  render(){
    return(<div>
            <ul className="answer-list" style={{ listStyleType: "none" }}>
              {this._buildAnswers()}
            </ul>
          </div>);

  }

  _buildAnswers(){

    let answerObjs = [
      { order: this.props.sortOrder[0],
        answer: <Answer key={1}   submitAnswerHandler={this._submitAnswerHandler}   code={this.props.correctAnswer}   bgColorClass="btn-green-bg"   isAnswered={this.state.isAnswered} /> },
      { order: this.props.sortOrder[1],
        answer: <Answer key={2}   submitAnswerHandler={this._submitAnswerHandler}   code={this.props.wrongAnswers[0]} isAnswered={this.state.isAnswered} /> },
      { order: this.props.sortOrder[2],
        answer: <Answer key={3}   submitAnswerHandler={this._submitAnswerHandler}   code={this.props.wrongAnswers[1]} isAnswered={this.state.isAnswered}/> }
    ];

    let sortedShuffledAnswers = us.sortBy(answerObjs, "order");

    return(<div>{ us.map(sortedShuffledAnswers, (obj) => obj.answer) }</div>);
  }

  _submitAnswerHandler(selectedCode){

    this.setState({ isAnswered: true });

    setTimeout( () => {
      this.props.nextQuestionHandler()
    }, 2000);
  }


}

class Answer extends React.Component {

  render(){

    // TODO: implement check mark icon display
    let iconCxs = cx("fa", "fa-check-circle-o", "result-icon", {
      //"check-is-hidden": !this.props.isAnswered
      "check-is-hidden": true
    });

    let buttonCxs = cx("pure-button", "pure-button-primary", {
      "is-answered": this.props.isAnswered,
      [this.props.bgColorClass]: this.props.isAnswered
    });

    return(<li key={this.props.key}><i className={iconCxs}></i><button
        onClick={ () => this._submitAnswer() }
        ref={ (rightAnswer) => this.rightAnswer = rightAnswer }
        className={buttonCxs}>{this.props.code}</button>
      </li>);
  }

  _submitAnswer(){
    //if(this.props.correctAnswer === this.props.code){
      //this.setState({ isAnswered: true });
    //}
    this.props.submitAnswerHandler(this.props.code);
  }
}

Answer.defaultProps = { bgColorClass: "btn-red-bg" };


ReactDOM.render( <App list={API.airports}/>,
                document.getElementById("container") );

