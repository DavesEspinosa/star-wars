import React, { Component } from 'react'
import { Input} from "antd"

const { Search } = Input


class Searcher extends Component {
    render() {

        return (
            <>
            <Search placeholder="input search text" onChange={this.props.onChange} enterButton allowClear
      size="large"
      style={{color:'#f0f8ff'}}/>
            </>
        )
    }
}

export default Searcher
