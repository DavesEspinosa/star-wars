import React, {Component} from "react";
import { Spin, Empty } from 'antd'
import { withContext } from "../context/context";

class Spinner extends React.Component {
    render() {
        const {isLoading} =this.props
        return (
            <Spin spinning={isLoading} tip="May the force be with you...">
                {isLoading && <Empty description={false} />}
            </Spin>
        )
    }
}

export default withContext(Spinner)