import React from "react";
import cx from "classnames";

class Answer extends React.Component {

  render(){

    let buttonCxs = cx("pure-button", "pure-button-primary", {
      "is-answered": this.props.isAnswered,
      [this.props.bgColorClass]: this.props.isAnswered
    });

    return(<li key={this.props.key}><button
        onClick={ () => this._submitAnswer() }
        ref={ (rightAnswer) => this.rightAnswer = rightAnswer }
        className={buttonCxs}>{this.props.code}</button>
      </li>);
  }

  _submitAnswer(){
    this.props.submitAnswerHandler(this.props.code);
  }
}

Answer.defaultProps = { bgColorClass: "btn-red-bg" };

export default Answer;
