import React, { Component, PropTypes } from 'react'
import SampleStore from '../stores/SampleStore'
import SampleActions from '../actions/SampleActions'

function getSapmleState() {
  return {
    sample: SampleStore.getSample()
  };
}

class ExampleApp extends Component{
  constructor(props){
    super(props)
    this._onChange = this._onChange.bind(this)
    this.state = getSapmleState()
  }

  componentDidMount() {
    SampleStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SampleStore.removeChangeListener(this._onChange);
  }

  handleClick(){
    SampleActions.saySomething("hello");
  }

  render(){
    return(
      <div>
        <input type="button" value="click" onClick={this.handleClick} />
        <h1>{this.state.sample.word}</h1>
      </div>
    )
  }

  _onChange() {
    this.setState(getSapmleState());
  }
}

export default ExampleApp
