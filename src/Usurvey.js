import React, {Component} from 'react';

const firebase = require('firebase');
const uuid = require('uuid');

const config = {
    apiKey: "AIzaSyBaLGXFZhSOhEnXtWb9UFsPY9S5ZaMljxU",
    authDomain: "u-survey-21393.firebaseapp.com",
    databaseURL: "https://u-survey-21393.firebaseio.com",
    projectId: "u-survey-21393",
    storageBucket: "u-survey-21393.appspot.com",
    messagingSenderId: "93340893536"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
  render(){
    return(
      <div>
        <p>Hello from Survey Component</p>
      </div>
    );
  }
}

export default Usurvey;
