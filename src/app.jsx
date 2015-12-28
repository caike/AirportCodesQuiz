import attachFastClick from "fastclick";

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    attachFastClick(document.body);
  }, false);
}


import React from "react";
import ReactDOM from "react-dom";
import API from "./api";

import Quiz from "./lib/quiz.jsx";

class App extends React.Component {

  render(){
    return(<div className="quiz">
             <Quiz data={this.props.list} />
          </div>);
  }

}


ReactDOM.render( <App list={API.airports}/>,
                document.getElementById("container") );

