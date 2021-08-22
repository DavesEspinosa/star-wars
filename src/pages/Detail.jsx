import React, { Component } from 'react'
import { Card, List, Avatar, Collapse, Layout, Menu } from "antd"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  CaretRightOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { withContext } from '../context/context'
import Spinner from '../components/Spinner'
import { allPeople } from '../utils'

const { Meta } = Card
const { Panel } = Collapse
const { Header, Sider, Content } = Layout

class Detail extends Component {
  state = {
    collapsed: false,
  }

    componentDidMount  () {
      const { match } = this.props
      const {params} = match

      this.personDetail(params.name)
      this.getResidentsFromLocal() 

    }

    componentDidUpdate (prevProps) {
      const {location, match} = this.props
      const {params} = match
       
      if (location.pathname !== prevProps.location.pathname) {
          this.personDetail(params.name)
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
  
    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }

    render() {
        const {residents, person} = this.props
        return (
          <Layout>
          <Sider >
            <Menu  >
              {residents.map(resident => {
                  return (
                    <Menu.Item key={resident.url} icon={<Avatar src={resident.image} />}>
                      {<Link to={`/${resident.name}`}>{resident.name}</Link>}
                    </Menu.Item>
                  )
              })}
            </Menu>
          </Sider>
          <Layout >
            <Content>
              <Card
                    key={person.url}
                    hoverable
                    style={{ width: 300 }}
                    cover={
                    <img alt="example" style={{ height: "400px" }} src={person.image} />
                    }
                    actions={[<p>{person.homeWorld}</p>]}
                >
                <Meta
                  title={person.name}
                  description={person.height + " cm _" + person.gender}
                />
              </Card>
            </Content>
          </Layout>
        </Layout>

        //   <Layout>
        //   <Sider>
        //     <Collapse
        //       ghost
        //         accordion
        //         style={{ backgroundColor: '#f7f7f7' }}
        //         expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        //       >
        //         <Panel header='Take a look to the related people' >
        //            <List
        //             itemLayout="horizontal"
        //             dataSource={residents}
        //             renderItem={person => {
        //             return(
        //               <List.Item>
        //                 <List.Item.Meta
        //                   avatar={<Avatar src={person.image} />}
        //                   title={<Link to={`/${person.name}`}>{person.name}</Link>}
        //                 />
        //               </List.Item>
                    
        //             )}}
        //             />
        //         </Panel>
        //       </Collapse>
        //   </Sider>
        //   <Layout>
        //     <Header>Header</Header>
        //     <Content>
        //       <Card
        //             key={person.url}
        //             hoverable
        //             style={{ width: 300 }}
        //             cover={
        //             <img alt="example" style={{ height: "400px" }} src={person.image} />
        //             }
        //             actions={[<p>{person.homeWorld}</p>]}
        //         >
        //         <Meta
        //           title={person.name}
        //           description={person.height + " cm _" + person.gender}
        //         />
        //       </Card></Content>
        //   </Layout>
        // </Layout>
            
            

        )
    }
}

export default withContext(Detail)
