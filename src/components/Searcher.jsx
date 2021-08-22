import React, { Component } from 'react'
import { Input} from "antd"

const { Search } = Input


class Searcher extends Component {
    render() {

        return (
            <>
            <Search placeholder="input search text" onChange={this.props.onChange} bordered={false} enterButton />
            </>
        )
    }
}

export default Searcher
