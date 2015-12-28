import React from "react";
import us from "underscore";

import Answer from "./answer.jsx";

const NEXT_QUESTION_DELAY = 1000;

class AnswerList extends React.Component {

  constructor(){
    super();

    this.state = { isAnswered: false };
  }

  render(){
    return(<div>
            <ul className="answer-list">
              {this._buildAnswers()}
            </ul>
          </div>);

  }

  _buildAnswers(){

    let answerObjs = [
      { order: this.props.sortOrder[0],
        answer: <Answer key={1}
                submitAnswerHandler={ () => this._submitAnswerHandler() }
                code={this.props.correctAnswer}
                bgColorClass="btn-green-bg"
                isAnswered={this.state.isAnswered} /> },

      { order: this.props.sortOrder[1],
        answer: <Answer key={2}
                submitAnswerHandler={ () => this._submitAnswerHandler(this.props.wrongAnswers[0]) }
                code={this.props.wrongAnswers[0]}
                isAnswered={this.state.isAnswered} /> },

      { order: this.props.sortOrder[2],
        answer: <Answer key={3}
                submitAnswerHandler={ () => this._submitAnswerHandler(this.props.wrongAnswers[1]) }
                code={this.props.wrongAnswers[1]}
                isAnswered={this.state.isAnswered}/> }
    ];

    let answers = us.sortBy(answerObjs, "order");

    return(<div>{ us.map(answers, (obj) => obj.answer) }</div>);
  }

  _submitAnswerHandler(selectedCode){

    this.setState({ isAnswered: true });

    setTimeout( () => {
      this.props.nextQuestionHandler()
    }, NEXT_QUESTION_DELAY);
  }

}

export default AnswerList;
