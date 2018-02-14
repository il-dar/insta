import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import PhotoDisplay from './PhotoDisplay'

const App = (props) => (
  <Router>
	<div>
	  <Route
	    path='/'
	    component={PhotoDisplay}
	  />
	</div>
  </Router>
)


export default App
