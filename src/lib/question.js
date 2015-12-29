import React from "react";
import us from "underscore";

import AnswerList from "./answer-list";

class Question extends React.Component {

  render(){
    let display = this.props.displayQuestion ? "block" : "none";

    return(<div className="card" style={{ display }}>
          <p>{this.props.name}</p>
          <AnswerList
            nextQuestionHandler={this.props.nextQuestionHandler}
            sortOrder={us.shuffle([0,1,2])}
            wrongAnswers={this._wrongAnswers()}
            correctAnswer={this.props.code} />
         </div>);
  }

  _wrongAnswers(){
    return [this._generateWrongCode(), this._generateWrongCode()];
  }

  _generateWrongCode(correctCode){
    // TODO: use correct code to check if EXACT SAME code was generated... low chances, but still.
    return [1,2,3].map( () => String.fromCharCode(us.random(65,90)) ).
      join("");
  }
}

export default Question;
