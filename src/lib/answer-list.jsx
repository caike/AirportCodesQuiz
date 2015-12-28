import React from "react";
import us from "underscore";

import Answer from "./answer.jsx";

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
    }, 1000);
  }

}

export default AnswerList;
