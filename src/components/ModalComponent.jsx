import React, { Component } from 'react'
import { withContext } from '../context/context'
import { Card, Modal, Spin } from "antd"
import {
  FilterFilled,  HomeFilled
} from '@ant-design/icons'

const { Meta } = Card

export class ModalComponent extends Component {
    render() {
      const {visible, person, handleCancel } = this.props
        return (
            <Modal
            closable={false}
            visible={visible}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Card
                style={{ width: 300 }}
                hoverable
                cover={
                  <img alt={person.image} style={{ height: "400px" }} src={person.image} />
                }
                actions={[
                 <p><HomeFilled key="setting" style={{marginRight:'1rem'}}/>{person.homeWorld}</p>,
                 <p><FilterFilled style={{marginRight:'1rem'}} key="edit" />{person.films?.length}</p>,
                ]}
              >
                <Meta
                  title={person.name}                    
                  />
              </Card>
            </div>
         </Modal>
        )
    }
}

export default withContext(ModalComponent)
