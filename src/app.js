import attachFastClick from "fastclick";

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    attachFastClick(document.body);
  }, false);
}


import React from "react";
import ReactDOM from "react-dom";
import API from "./api";

import Quiz from "./lib/quiz";

function App(props){
  return(<div className="quiz">
           <Quiz data={props.list} />
        </div>);
}


ReactDOM.render( <App list={API.airports}/>,
                document.getElementById("container") );

