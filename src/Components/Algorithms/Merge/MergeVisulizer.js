

import React from 'react';

class MergeVisulizer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      steps: [{data: [], init: 'set'}],
      counter: 0,
    }
    this.sort = this.sort.bind(this);
    this.data = [...props.dataSet];
    this.startValue = [...this.data];
  }

  componentDidMount() {
    this.sort();
  }

  sort() {
    let A = this.data;
    function merge(A, p, q, r) {
      let n1 = q-p+1;
      let n2 = r-q;
      let L = []; // new arrays
      let R = []; // new arrays
      for (var i = 0; i < n1; i++) {
        L[i] = A[p+i];
      }
      var reqNeg = false;
      for (var j = 0; j < n2; j++) {
        if (A[q+j+1] !== undefined) {
          R[j] = A[q+j+1];
        } else {
          reqNeg = true;
        }
      }
      if (reqNeg) j=0;
      L[i] = 10000000;
      R[j] = 10000000;
      i = 0;
      j = 0;
      for (var k = p; k <= r; k++) {
        if (L[i] <= R[j]) {
          A[k] = L[i];
          i++;
        } else {
          A[k] = R[j];
          j++;
        }
      }
      steppps.push({data: [...A].splice(p, r)});
    }
    var that = this;
    var steppps = [];
    function ms(A, p, r) {
      if (p < r) {
        steppps.push({data: [...A].splice(p, r)});
        let q = parseInt((p+r)/2);
        ms(A, p, q);
        ms(A, q+1, r);
        merge(A, p, q, r);
      }
    }

    ms(A, 0, A.length);
    this.setState({steps: steppps});
    A.pop(A.length);
  }

  render() {

    function Inner({children, end, middle}) {
      return <span style={{padding: '5px', border: '1px solid black', background: end ? '#944c4c': middle ? '#6aa56a' : '#00000000'}} key={Math.random()}>{children}</span>
    }

    var startValue = this.startValue.map(a => {
      return <Inner key={Math.random()}>{a}</Inner>
    });

    var steps = this.state.steps.map((a, i) => {
      if (i < this.state.counter+1) {
        var result = a.data.map((b, i) => {if (b !== 10000000) return <Inner key={Math.random()} middle={i > a.end && i <= a.start} end={i === a.end}>{b}</Inner>})
        return <div style={{margin: '15px'}} key={Math.random()}>{result}</div>;
      }
    });

    return <div>
      <div>Array som skal sorteres: {startValue}</div>
      <div>Iterasjoner: {this.state.counter}</div>
      <div style={{minHeight: '20em', margin: '15px'}}>
        {steps}
      </div>
      <button onClick={() => {console.log(this.state);}}>State</button>
      <button onClick={() => {if (this.state.counter > 0) this.setState({counter: this.state.counter-1})}}>Forrige steg</button>
      <button onClick={() => {if (this.state.counter < this.state.steps.length - 1) this.setState({counter: this.state.counter+1})}}>Neste steg</button>
      <button onClick={() => {this.setState({counter: 0})}}>Restart</button>
    </div>;
  }
}

export default MergeVisulizer;
