import React from "react";
import us from "underscore";

import Question from "./question.jsx";

class Quiz extends React.Component {
  constructor(props){
    super(props);

    // from http://www.2ality.com/2013/11/initializing-arrays.html
    var arr = Array.apply(null, Array(this.props.data.length));
    let displayQuestionFlag = arr.map(function (x, i) { return false });

    let questionCounter = 0;
    displayQuestionFlag[questionCounter] = true;

    this.state = { displayQuestionFlag, questionCounter };
  }

  render(){
    let airports = us.shuffle(this.props.data).map( (airport, index) => {
      return this._buildQuestionForAirport(airport, index);
    });

    return (<div>
        <h2>Airport Code Quiz</h2>
        <div className="questions">
          {airports}
        </div>
      </div>
    );
  }

  _buildQuestionForAirport(airport, index){

    let displayQuestion = this.state.displayQuestionFlag[index];

    return(<Question
           {...airport}
           key={index}
           displayQuestion={displayQuestion}
           nextQuestionHandler={ () => this._nextQuestionHandler() }
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

export default Quiz;
