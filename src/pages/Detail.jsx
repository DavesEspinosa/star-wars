import React, { Component } from 'react'
import {  List, Typography, Divider, Image, Row, Col } from "antd"
import { withContext } from '../context/context'
import { allPeople } from '../utils'
import ModalComponent from '../components/ModalComponent'
import ListResidents from '../components/ListResidents'

const { Text, Title } = Typography
class Detail extends Component {
  state = {
    collapsed: false,
    visible: true,  
    isLoading: true
  }

    componentDidMount  () {
      const { match } = this.props
      const {params} = match

      this.personDetail(params.name)
      this.setState({
        visible: true,
        isLoading: false
      })
      this.getResidentsFromLocal() 

    }

    componentDidUpdate (prevProps) {
      const {location, match} = this.props
      const {params} = match
       
      if (location.pathname !== prevProps.location.pathname) {
          this.personDetail(params.name)
          this.setState({
            visible: true,
            isLoading: false
          })
      }
   
    }

    getResidentsFromLocal = () => {
      if (allPeople) {
        console.log(`allPeople`, allPeople)
    }

    }

    personDetail = async (name) => {
      const {getPerson, people} = this.props
      getPerson(name)
      if (navigator.onLine && !people.length ) {
        this.props.history.replace('/')
      }
  }

    handleCancel = () => {
    this.setState({ visible: false });
  };

    render() {
        const {person} = this.props
        const {visible, isLoading} = this.state
        return (
          <>
          <Row style={{margin: '1rem'}}>
              <Divider orientation="right"><Title level={4}>THE SELECTED CHARACTER</Title></Divider>
            <Col span={6} >
            <Image
              width={200}
              height={270}
              src={person.image}
            />
            </Col>
            <Col span={18}>
                <List
                  size="small"
                  bordered
                  >
                    <List.Item><Text strong italic>Name:  </Text>{person.name}</List.Item>
                    <List.Item><Text strong italic>Birthday:  </Text>{person.birth_year}</List.Item>
                    <List.Item><Text strong italic>Gender:  </Text>{person.gender}</List.Item>
                    <List.Item><Text strong italic>Color hair:  </Text>{person.hair_color}</List.Item>
                    <List.Item><Text strong italic>Eyes color:  </Text>{person.eye_color}</List.Item>
                    <List.Item><Text strong italic>Mass:  </Text>{person.mass}</List.Item>
                    <List.Item><Text strong italic>Skin:  </Text>{person.skin_color}</List.Item>
                  </List>
            </Col>
          </Row>
              <ModalComponent isLoading={isLoading} visible={visible} handleCancel={this.handleCancel}/>
              <ListResidents />
           </>
           
        )
    }
}

export default withContext(Detail)
