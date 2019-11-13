

import React from 'react';

class QuickSortVisualizer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      counter: 0,
    }
    this.sort = this.sort.bind(this);
    this.data = props.dataSet;
    this.startValue = [...props.dataSet];
  }

  componentDidMount() {
    this.sort();
  }

  sort() {
    var steps = [];
    function swap(A, i, j) {

      let tmp = A[i];
      A[i] = A[j];
      A[j] = tmp;
    }

    function Partition(A, p, r) {
      let x = A[r];
      let i = p-1;
      for (var j = p; j < r; j++) {
        var b = false;
        if (A[j] <= x) {
          i++;
          b = true;
          steps.push({data: [...A], start: j, watching: j, r:r, end: -2-i, b:b});
          swap(A, i, j);
        }
        if (!b) {
          steps.push({data: [...A], start: j, watching: j, r:r, end: -2-i, b:b});
        }
      }
      swap(A, i+1, r);
      steps.push({data: [...A], start: i+1, watching: i+1, r:r, end: -2-i, b:true});
      return i+1;
    }

    function QuickSort(A, p, r) {

      if (p<r) {
        let q = Partition(A, p, r);
        QuickSort(A, p, q-1);
        QuickSort(A, q+1, r);
      }
    }

    QuickSort(this.data, 0, this.data.length-1);
    console.log(steps);
    this.setState({steps: steps});
  }

  render() {

    function Inner({children, end, middle, watching}) {
      console.log(watching);
      return <span style={{padding: '5px', border: '1px solid black', background: end ? '#944c4c': middle ? '#6aa56a' : watching ? 'gray' : '#00000000'}} key={Math.random()}>{children}</span>
    }

    var startValue = this.startValue.map(a => {
      return <Inner key={Math.random()}>{a}</Inner>
    });

    var steps = this.state.steps.map((a, i) => {
      if (i < this.state.counter+1) {
        var result = a.data.map((b, i) => <Inner key={Math.random()} middle={i === a.start && a.b} watching={i === a.watching} end={i === a.r}>{b}</Inner>)
        return <div style={{margin: '15px'}} key={Math.random()}>{result}</div>;
      }
    });

    return <div>
      <div>Array som skal sorteres: {startValue}</div>
      <div>Iterasjoner: {this.state.counter}</div>
      <div style={{minHeight: '20em', margin: '15px'}}>
        {steps}
      </div>
      <button onClick={() => {if (this.state.counter > 0) this.setState({counter: this.state.counter-1})}}>Forrige steg</button>
      <button onClick={() => {if (this.state.counter < this.state.steps.length - 1) this.setState({counter: this.state.counter+1})}}>Neste steg</button>
      <button onClick={() => {this.setState({counter: 0})}}>Restart</button>
      <p>Fargekoder: Grå: vi ser på denne noden<br />Grønn: Vi ser på denne og denne blir swappet<br />Rød: Pivot-node</p>
    </div>;
  }
}

export default QuickSortVisualizer;
