import axios from "axios"

const API_URL = "https://swapi.dev/api"
const default_image = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"


export const allPeople = JSON.parse(localStorage.getItem('allPeople'))  
export const selectedCharacter = (characters, person) => characters?.find((res) => res.name.toLowerCase() === person.name.toLowerCase())

export const apiGetCharacters = async () => {
  const characters = await axios.get(
    "https://akabab.github.io/starwars-api/api/all.json"
  )
  const response = characters.data
  return response
}

export const apiPeople = async (value) => {
  if (value) {
    const subst = value.replace(API_URL, '')
    const people = await axios.get(API_URL+''+subst)
    const response = people.data
    return response
  }
    const people = await axios.get(`${API_URL}/people/`)

    const response = people.data
    return response
}

export const apiSearch = async (value) => {
    const search = await axios.get(`${API_URL}/people/?search=${value}`)
    const response = search.data
    return response
}

export const apiPlanets = async (value) => {
  const home = await axios.get(value)
  const response = home.data
  return response
}

export const cardInfo = async (arrPeople, characters) => {
  if (arrPeople.length) {
    const cardInfo = arrPeople?.map(async (person) => {
      const { name } = await apiPlanets(person.homeworld)
      const selected = selectedCharacter(characters, person)

        return {
          ...person,
          homeWorld: name,
          image: selected?.image ? selected?.image : default_image,
      }
    })
    return Promise.all(cardInfo)
  }
    const { name } = await apiPlanets(arrPeople.homeworld)
    const selected = selectedCharacter(characters, arrPeople)

    return {
      ...arrPeople,
      homeWorld: name,
      image: selected?.image ? selected?.image : default_image,
  }
}

  export const residentInfo = async (residents, characters) => {
    
      const listResidents = residents.map(async (resident) => {
        const {data} = await axios.get(resident)
        const selected =  selectedCharacter(characters, data)

        return {
          ...data,
          image: selected?.image ? selected?.image : default_image,
        }
      })

    return Promise.all(listResidents)
  }

  export const peopleInfoFilter = async (characters) => {
    try {
       const first = await apiPeople(null)
       const second = await apiPeople(first.next)
       const third = await apiPeople(second.next)
       const fourth = await apiPeople(third.next)
       const fifth = await apiPeople(fourth.next)
       const sixth = await apiPeople(fifth.next)
       const seventh = await apiPeople(sixth.next)
       const eigth = await apiPeople(seventh.next)
       const ninth = await apiPeople(eigth.next)

       const peopleConcat = [...(await cardInfo(first.results, characters)), 
        ...(await cardInfo(second.results, characters)), 
        ...(await cardInfo(third.results, characters)), 
        ...(await cardInfo(fourth.results, characters)), 
        ...(await cardInfo(fifth.results, characters)), 
        ...(await cardInfo(sixth.results, characters)), 
        ...(await cardInfo(seventh.results, characters)), 
        ...(await cardInfo(eigth.results, characters)), 
        ...(await cardInfo(ninth.results, characters))]
           
        return peopleConcat
      } catch (error) {
        console.log(`error`, error)
      }
}

