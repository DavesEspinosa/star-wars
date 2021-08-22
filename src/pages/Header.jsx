import React, { Component } from 'react'
import { Input} from "antd"

const { Search } = Input


class Header extends Component {
    render() {

        return (
            <>
            <Search placeholder="input search text" onChange={this.props.onChange} bordered={false} enterButton />
            </>
        )
    }
}

export default Header
