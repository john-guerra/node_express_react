import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      followers:[]
    };
  }

  componentDidMount() {
    let me = this;
    fetch("http://localhost:3001/api/petrogustavo")
      .then((res) => {
        return res.json();
      })
      .then((followers) => {
        me.setState({followers:followers});
      })
      .catch((err) => console.log(err) );
    
  }


  render() {
    return (
      <div className="App">

        <h1>Followers </h1>
        <h2>Con backend</h2>
        <div>{this.state.followers.map(
          (f) => {
            return (<div>{f.follower.screen_name}</div>);
          })
        }</div>
        <div>Made by John with <span role="img">❤</span>️</div>
      </div>
    );
  }
}

export default App;
