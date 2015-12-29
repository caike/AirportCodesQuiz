import React from "react";
import cx from "classnames";

const WRONG_ANSWER_BG = "btn-red-bg";

function Answer(props){

    let buttonCxs = cx("pure-button", "pure-button-primary", {
      "is-answered": props.isAnswered,
      [props.bgColorClass || WRONG_ANSWER_BG]: props.isAnswered
    });

    return(<li key={props.key}><button
        onClick={ () => props.submitAnswerHandler() }
        className={buttonCxs}>{props.code}</button>
      </li>);

}

export default Answer;
