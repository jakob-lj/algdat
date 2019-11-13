import React from 'react';
import IVisualizer from './InsertionVisualizer';

class InsertionSort extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.getCode = this.getCode.bind(this);
    this.generateDataSet = this.generateDataSet.bind(this);

  }

  generateDataSet(n) {
    var d = [];
    for (var i = 0; i < n; i++) {
      d.push(parseInt(Math.random()*10));
    }
    return d;
  }

  componentDidMount() {
    this.getCode();
    this.setState({dataSet: this.generateDataSet(10)});
  }

  async getCode() {
    fetch('./insertionSort.txt').then(r => r.text()).then(r => {
      this.setState({code: r});
    });
  }

  render() {
    let innerStyle = {
      width: '100%',
      marign: '2em'
    }
    if (this.state.dataSet === undefined) {
      return <div>loading...</div>;
    }

    return <div style={{display: 'flex'}}>
      <div style={innerStyle}>
        <div>
        <pre>
          {this.state.code}
        </pre>
        </div>
      </div>
      <div style={innerStyle}>
        <IVisualizer dataSet={this.state.dataSet}/>
      </div>
    </div>;
  }
}

export default InsertionSort;
