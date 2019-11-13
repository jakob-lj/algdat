import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import InsertionSort from './Components/Algorithms/Insertion/InsertionSort';
import MergeSort from './Components/Algorithms/Merge/MergeSort';
import QuickSort from './Components/Algorithms/Quick/QuickSort';

class App extends React.Component {
  render() {
    return <div>
    <Router>
      <Header />
      <div style={{width: '70%', margin: 'auto', marginTop: '1em'}}>
      <Route path={'/'} exact component={Home} />
      <Route path={'/insertion-sort'} component={InsertionSort} />
      <Route path={'/merge-sort'} component={MergeSort} />
      <Route path={'/quick-sort'} component={QuickSort} />
      </div>
    </Router>
    </div>;
  }
}

export default App;
