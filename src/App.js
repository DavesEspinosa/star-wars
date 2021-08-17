import React, {useState, useEffect} from 'react'
import { BackTop, Card } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
const { Meta } = Card

function App(props) {
  const [people, setPeople] = useState([])
  const [person, setPerson] = useState({})
  const [all, setAll] = useState([])
  const [characters, setCharacters] = useState([])
  const [hasMore, setHasMore] = useState(true)


console.log(`characters`, characters)
  const getAll = async () => {
    try {
   console.log(`first all`, all)
   if (people.length >= 82) setHasMore(false)
  
      const {data} = await axios.get(
        all.next
      )
      const nextPeople = data
      console.log(`nextPeople`, nextPeople)

      const newCards = nextPeople.results.map(person => {
        const selectedCharacters = characters?.find(res => res.name === person.name)
        console.log(`selectedCharacters`, selectedCharacters)
        if (selectedCharacters) {
          const { image } = selectedCharacters
          return {
            name: person.name,
            birthDay: person.birth_year,
            gender: person.gender,
            height: person.height,
            image: image 
          }  
        }
        return {
          name: person.name,
          birthDay: person.birth_year,
          gender: person.gender,
          height: person.height,
          image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
        }
      })
      if (people.length === 82) {
        setHasMore(false)
      }
      console.log(`cards`, newCards)
      setAll(nextPeople)
      setPeople([...people, ...newCards])
    } catch (error) {
      
    }
  }
console.log(`people`, people.length)
console.log(`hasMore`, hasMore)

  const getPeople = async () => {
    try {
      const people = await axios.get(
        'https://swapi.dev/api/people/'
      )
      const { data } = await axios.get(
        'https://swapi.dev/api/people/1/'
      )
      const characters = await axios.get(
        'https://akabab.github.io/starwars-api/api/all.json'
      )
      const response  = characters.data
      //const { homeworld } = data
      
      const selectedCharacters = response.find(res => res.name === data.name)
      const { image } = selectedCharacters
      // const homeWorld = await axios.get(
      //     data.homeworld
      //   )
      const {results} = people.data
      
      const cards = results.map(person => {
        const selectedCharacters = response.find(res => res.name === person.name)
        const { image } = selectedCharacters
        return {
          name: person.name,
          birthDay: person.birth_year,
          gender: person.gender,
          height: person.height,
          image: image
        }
      })
      console.log(`cards`, cards)

      setPeople(cards)
      setAll(people.data)
      setPerson({
        name: data.name,
        birthDay: data.birth_year,
        gender: data.gender,
        height: data.height,
        image: image
      })
      setCharacters(response)
      // console.log(`homeWorld`, homeWorld)
    } catch (error) {
      console.log(error);
    }
  }  

  useEffect(() => {
    getPeople()
  }, [])

  return (
    <>
    
    <InfiniteScroll
        dataLength={people.length} //This is important field to render the next data
        next={getAll}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {people.map((person) => {
          return (
            <Card
            key={person.url}
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" style={{ height: "300px" }} src={person.image} />}
            >
                <Meta title={person.name} description={person.height + ' cm _' + person.gender} />
              </Card>
              )
            })}
    </InfiniteScroll>
            <BackTop /> 

    </>
  )
}


export default App

