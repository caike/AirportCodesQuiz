import React from "react";
import us from "underscore";

import Question from "./question";

class Quiz extends React.Component {

  constructor(props){
    super(props);

    this.state = { questionCounter: 0 };
  }

  render(){
    let question = this._buildQuestionForCurrentAirport();

    return (<div>
        <h2>Airport Code Quiz</h2>
        <div className="questions">
          {question}
        </div>
      </div>
    );
  }

  _buildQuestionForCurrentAirport(){

    let currentAirport = this.props.data[this.state.questionCounter];

    return(<Question
           {...currentAirport}
           key={this.state.questionCounter}
           nextQuestionHandler={ () => this._nextQuestionHandler() }
           />);
  }

  _nextQuestionHandler(){
    this.setState({ questionCounter: this.state.questionCounter+1 });
  }
}

export default Quiz;
