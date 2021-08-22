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
          <>
            {people.map(person => {
                return (
                <Link
                to={`/${person.name}`}
                key={person.url}
                >
                <Card
                    
                    hoverable
                    style={{ width: 300 }}
                    cover={
                    <img alt={person.name} style={{ height: "400px" }} src={person.image} />
                    }
                    actions={[<p>{person.homeWorld}</p>]}
                >
                <Meta
                  title={person.name}
                  description={person.height + " cm _" + person.gender}
                />
              </Card>
            </Link>)
            })}
          </>
        )
    }
}

export default withContext(CardCharacters)
