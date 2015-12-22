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

  render(){
    let airports = this.props.data.map( (airport, index) => {
      return this._buildQuestionForAirport(airport);
    });

    return (<div>
        <h2>Airport Code Quiz</h2>
        <div className="questions">
          {airports}
        </div>
      </div>
    );
  }

  _buildQuestionForAirport(airport){
    return(<Question {...airport} />);
  }
}


class Question extends React.Component {
  render(){
    return(<div>
          <p>{this.props.name}</p>
          <p>{this.props.code}</p>
         </div>);
  }

}


ReactDOM.render( <App list={API.airports}/>,
                document.getElementById("container") );

