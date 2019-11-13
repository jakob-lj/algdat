

import React from 'react';

class IVisualizer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      counter: 0,
    }
    this.sort = this.sort.bind(this);
    this.data = props.dataSet;
  }

  componentDidMount() {
    this.sort();
  }

  sort() {
    var steps = [];
    var prev = this.data;
    var start = undefined;
    var end = undefined;
    for (var j = 1; j < this.data.length; j++) {
      let A = [...prev];
      let key = A[j];
      let i = j-1;
      start = i+1;
      while (i >= 0 && A[i] > key) {
        A[i+1] = A[i];
        i = i-1;
      }
      end = i+1;
      A[i+1] = key;
      prev = A;
      steps[j] = {data: A, start: start, end: end};
    }
    this.setState({steps: steps});
  }

  render() {

    function Inner({children, end, middle}) {
      console.log(end);
      return <span style={{padding: '5px', border: '1px solid black', background: end ? '#944c4c': middle ? '#6aa56a' : '#00000000'}} key={Math.random()}>{children}</span>
    }

    var startValue = this.data.map(a => {
      return <Inner key={Math.random()}>{a}</Inner>
    });

    var steps = this.state.steps.map((a, i) => {
      if (i < this.state.counter+1) {
        var result = a.data.map((b, i) => <Inner key={Math.random()} middle={i > a.end && i <= a.start} end={i === a.end}>{b}</Inner>)
        return <div style={{margin: '15px'}} key={Math.random()}>{result}</div>;
      }
    });

    return <div>
      <div>Array som skal sorteres: {startValue}</div>
      <div>Iterasjoner: {this.state.counter}</div>
      <div style={{height: '20em', margin: '15px'}}>
        {steps}
      </div>
      <button onClick={() => {if (this.state.counter > 0) this.setState({counter: this.state.counter-1})}}>Forrige steg</button>
      <button onClick={() => {if (this.state.counter < this.data.length - 1) this.setState({counter: this.state.counter+1})}}>Neste steg</button>
      <button onClick={() => {this.setState({counter: 0})}}>Restart</button>
    </div>;
  }
}

export default IVisualizer;
