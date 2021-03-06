import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import 'antd/dist/antd.css'
import { BrowserRouter as Router } from "react-router-dom"
import { StarWarsProvider } from './context/context'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <Router>
    <StarWarsProvider>
      <App />
    </StarWarsProvider>
  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
