import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Card, Spin } from "antd"
import { withContext } from '../context/context'
import './CardCharacters.css'
const { Meta } = Card


class CardCharacters extends Component {
  state={
    loading: false
  }
    render() {
        const { people } = this.props
        const {loading} = this.state

        return (
          <Spin spinning={loading}>
        <div className='main-wrap'>
            {people.map(person => {
              return (
                <div key={person.url} className='main-wrap-section'>
                <Link
                to={`/${person.name}`}                
                >
                <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={
                    <img alt={person.name} style={{ height: "400px" }} src={person.image} />
                    }
                >
                <Meta
                  style={{textAlign: 'center', backgroundColor: 'black'}}
                  title={<p className='starWarsFont'> {person.name}</p>}
                />
              </Card>
            </Link>
              </div>
            )
          })}
          </div>
          </Spin>
        )
    }
}

export default withContext(CardCharacters)
