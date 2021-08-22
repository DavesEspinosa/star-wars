import React, { Component } from 'react'
import { withContext } from '../context/context'
import { Card, Modal, Spin } from "antd"
import {
  EditOutlined,  SettingOutlined
} from '@ant-design/icons'

const { Meta } = Card

export class ModalComponent extends Component {
    render() {
      const {visible, person, handleCancel, isLoading } = this.props
        return (
            <Modal
            visible={visible}
            onCancel={handleCancel}
            onOk={handleCancel}
          >
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Spin spinning={isLoading}>
                <Card
                style={{ width: 300 }}
                hoverable
                cover={
                  <img alt={person.image} style={{ height: "400px" }} src={person.image} />
                }
                actions={[
                 <p><SettingOutlined key="setting" style={{marginRight:'1rem'}}/>{person.homeWorld}</p>,
                 <p><EditOutlined style={{marginRight:'1rem'}} key="edit" />{person.films?.length}</p>,
                ]}
              >
                <Meta
                  title={person.name}                    
                  />
              </Card>
            </Spin>
            </div>
         </Modal>
        )
    }
}

export default withContext(ModalComponent)
