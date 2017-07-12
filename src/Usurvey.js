import React, {Component} from 'react';

const firebase = require('firebase');
const uuid = require('uuid');

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
  nameSubmit(event) {
      const studentName = this.refs.name.value;
      this.setState({studentName}, () => {
        console.log(this.state);
      });
  }
  answerSelected(event) {
    let answers = this.state.answers;
    if (event.target.name === 'answerOne'){
      answers.answerOne = event.target.value;
    } else if (event.target.name === 'answerTwo') {
      answers.answerTwo = event.target.value;
    } else if (event.target.name === 'answerThree') {
      answers.answerThree = event.target.value;
    }

    this.setState({answers}, () => {
      console.log(this.state);
    });
  }

  questionSubmit() {
    firebase.database().ref('uSurvey/' + this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });

    this.setState({isSubmitted: true});
  }

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answerOne: '',
        answerTwo: '',
        answerThree: ''
      },
      isSubmitted: false
    };

    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }


  render(){


    let studentName;
    let questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h1>Hey Student, please provide your name: </h1>
        <form onSubmit={this.nameSubmit}>
          <input className="name" type="text" placeholder="Enter your name" ref="name"/>
        </form>
      </div>;
      questions = ''
    } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>;
      questions = <div>
        <h2>Please answer these questions: </h2>
        <form onSubmit={this.questionSubmit}>
          <div className="card">
            <label>What is your favorite exotic car manufacturer?</label> <br />
            <input type="radio" name="answerOne" value="Lamborghini" onChange={this.answerSelected}/>Lamborghini
            <input type="radio" name="answerOne" value="Ferrari" onChange={this.answerSelected}/>Ferrari
            <input type="radio" name="answerOne" value="McLaren" onChange={this.answerSelected}/>McLaren
          </div>
          <div className="card">
            <label>At what age did you first start making six-figures or more?</label> <br />
            <input type="radio" name="answerTwo" value="16-24" onChange={this.answerSelected}/>16-24
            <input type="radio" name="answerTwo" value="25-36" onChange={this.answerSelected}/>25-36
            <input type="radio" name="answerTwo" value="37+" onChange={this.answerSelected}/>37+
          </div>
          <div className="card">
            <label>How do you earn a living?</label> <br />
            <input type="radio" name="answerThree" value="Online business" onChange={this.answerSelected}/>Online business
            <input type="radio" name="answerThree" value="Coding" onChange={this.answerSelected}/>Coding
            <input type="radio" name="answerThree" value="Online Marketing" onChange={this.answerSelected}/>Online Marketing
          </div>
          <input className="feedback-button" type="submit" value="submit" />
        </form>
      </div>
    } else if (this.state.isSubmitted === true && this.state.studentName !== '') {
      studentName = <h1>Thanks, {this.state.studentName}</h1>
    }

    return(
      <div>
        {studentName}
        ---------------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
