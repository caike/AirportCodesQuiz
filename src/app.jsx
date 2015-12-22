import React from "react";
import ReactDOM from "react-dom";
import API from "./api";

class App extends React.Component {

  render(){
    return(<div className="quiz">
             <Quiz data={this.props.list} />
          </div>);
  }

}


class Quiz extends React.Component {
  constructor(props){
    super(props);

    // from http://www.2ality.com/2013/11/initializing-arrays.html
    var arr = Array.apply(null, Array(this.props.data.length));
    let displayQuestionFlag = arr.map(function (x, i) { return false });

    displayQuestionFlag[0] = true;
    console.log( displayQuestionFlag );

    this.state = { displayQuestionFlag };
  }

  render(){
    let airports = this.props.data.map( (airport, index) => {
      return this._buildQuestionForAirport(airport,
        this.state.displayQuestionFlag[index]);
    });

    return (<div>
        <h2>Airport Code Quiz</h2>
        <div className="questions">
          {airports}
        </div>
      </div>
    );
  }

  _buildQuestionForAirport(airport, displayQuestion=false){
    return(<Question {...airport} displayQuestion={displayQuestion} />);
  }
}


class Question extends React.Component {

  render(){
    let display = this.props.displayQuestion ? "block" : "none";

    return(<div className="card" style={{ display }}>
          <p>{this.props.name}</p>
          <ul className="answer-list" style={{ listStyleType: "none" }}>
            {this._buildAnswers()}
          </ul>
         </div>);
  }


  _buildAnswers(){

    let answerList = [0,1,2].map( (i) => {
      return (<li><input type="radio" name="answer" /> {this.props.code}</li>);
    }); // generate two random

    return(<div>{answerList}</div>);
  }

}


ReactDOM.render( <App list={API.airports}/>,
                document.getElementById("container") );

