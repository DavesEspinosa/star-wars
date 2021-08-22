import React, { Component } from 'react'
import { Input} from "antd"
import { withContext } from '../context/context'
import Filters from '../components/Filters'
import './Main.css'

const { Search } = Input


class Header extends Component {
    render() {

        return (
        <ul className='main-nav'>
            <li className='title'>
          STAR WARS
          </li>
          <li>
            <Search className="ant-select-selection" placeholder="input search text" onChange={this.props.onChange} enterButton />
          </li>
          <li>
          <Filters />
          </li>
        </ul>
          
        )
    }
}

export default withContext(Header)
