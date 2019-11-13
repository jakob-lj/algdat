

import React from 'react';
import {Link} from 'react-router-dom';

function Home(props) {
  let algorithms = [{
    name: 'Insertion Sort',
    link: '/insertion-sort'
  },
  {
      name: 'Merge Sort',
      link: '/merge-sort'
  },
  {
    name: 'Quick Sort',
    link: '/quick-sort'
  }];
  let algs = algorithms.map(a => {
    return <li><Link to={a.link}>{a.name}</Link></li>;
  });
  return <div>
    <h1>Trykk på en algoritme for å se nærmere på denne</h1>
    <ul>
      {algs}
    </ul>
  </div>;
}

export default Home;
