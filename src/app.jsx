import React from "react";
import ReactDOM from "react-dom";
import API from "./api";
import us from "underscore";

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
    //console.log( displayQuestionFlag );

    this.state = { displayQuestionFlag, questionCounter };
    this._nextQuestionHandler = this._nextQuestionHandler.bind(this);
  }

  render(){
    let airports = this.props.data.map( (airport, index) => {
      return this._buildQuestionForAirport(airport,
        this.state.displayQuestionFlag[index]);
    });

    return (<div>
        <h2>Airport Code Quiz</h2>
        <div className="questions">
          {airports}
        </div>
      </div>
    );
  }

  _buildQuestionForAirport(airport, displayQuestion=false){
    return(<Question
           {...airport}
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

  render(){
    let display = this.props.displayQuestion ? "block" : "none";

    return(<div className="card" style={{ display }}>
          <p>{this.props.name}</p>
          <ul className="answer-list" style={{ listStyleType: "none" }}>
            {this._buildAnswers()}
          </ul>
         </div>);
  }


  _buildAnswers(){

    let buttons = [<button
      onClick={this.props.nextQuestionHandler}
      className="pure-button pure-button-primary">{this.props.code}</button> ];

    // generates two wrong answers
    buttons.push(this._generateWrongAnswer());
    buttons.push(this._generateWrongAnswer());

    let answerList = us.shuffle(buttons.map( (button) => <li>{button}</li> ));

    return(<div>{answerList}</div>);
  }

  _generateWrongAnswer(){
    let wrongCode = [1,2,3].map( () => String.fromCharCode(us.random(65,90)) ).join("");
    return (<button
            onClick={this.props.nextQuestionHandler}
            className="pure-button pure-button-primary">
            {wrongCode}</button>);
  }

}


ReactDOM.render( <App list={API.airports}/>,
                document.getElementById("container") );

