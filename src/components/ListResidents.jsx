import React, { Component } from 'react'
import { withContext } from '../context/context'
import { Link } from 'react-router-dom'
import { Collapse, List, Typography, Avatar } from "antd"
import {
    CaretRightOutlined
} from '@ant-design/icons'

const { Panel } = Collapse
const { Text } = Typography

export class ListResidents extends Component {
    render() {
      const {residents, person } = this.props
        return (
            <Collapse
              defaultActiveKey={['1']}
              ghost
              accordion
              style={{ backgroundColor: '#f7f7f7' }}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
              <Panel key='1' header={<Text strong>Take a look to the related people</Text>} >        
          <List
            itemLayout="vertical"
            size="large"
            dataSource={residents}
            renderItem={item => (
              <List.Item
                key={item.url}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={<Link to={`/${item.name}`}>{item.name}</Link>}
                  description={<><Text strong italic>Homeworld </Text><p>{person.homeWorld}</p></>}
                />
              </List.Item>
            )}
          />
            </Panel>
         </Collapse>
        )
    }
}

export default withContext(ListResidents)
