import React from "react";
import us from "underscore";

import AnswerList from "./answer-list.jsx";

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

export default Question;
