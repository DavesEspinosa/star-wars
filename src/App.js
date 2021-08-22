import React, {Component} from 'react'
import { Switch, Route } from "react-router-dom";
import { withContext } from './context/context'
import Detail from './pages/Detail';
import Main from './pages/Main';
import './app.css'

class App extends Component{

render() {
  return (
    <>
      <Switch>  
          <Route exact path="/" component={Main} />
          <Route exact path="/:name" component={Detail} />
      </Switch>   
    </>
  )
}
}


export default withContext(App)

