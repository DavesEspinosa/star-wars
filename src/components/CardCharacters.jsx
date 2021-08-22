import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Card } from "antd"
import { withContext } from '../context/context'
import './CardCharacters.css'
const { Meta } = Card


class CardCharacters extends Component {
    render() {
        const { people } = this.props
        return (
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
        )
    }
}

export default withContext(CardCharacters)
