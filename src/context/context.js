import React, {Component} from "react";
import { apiGetCharacters, cardInfo, apiPeople, apiPlanets, apiSearch, residentInfo, peopleInfoFilter, mycomparator } from "../utils"

const { Consumer, Provider } = React.createContext()

class StarWarsProvider extends React.Component {
  state = {
    people: [],
    peopleData: [],
    characters: [],
    isLoading: true,
    isLoaded: false,
    hasMore: true,
    residents: [],
    person: {}
  }

  getFirstTen = async () => {
    try {
      if (navigator.onLine) {
        const { results } = await apiPeople(null)
        
        localStorage.setItem('characters', JSON.stringify(await apiGetCharacters()))
        const characters = JSON.parse(localStorage.getItem('characters'))  
        const peopleExist = JSON.parse(localStorage.getItem('allPeople'))

        if (!peopleExist) {
            const allPeople = await peopleInfoFilter(characters)
            localStorage.setItem('allPeople', JSON.stringify(allPeople))   
        }
    
        this.setState({
          ...this.state,
          people: await cardInfo(results, await apiGetCharacters()),
          peopleData: await apiPeople(null),
          characters: await apiGetCharacters(),
          isLoaded: true,
          hasMore:true,
          isLoading: false,
        })
        
      }
      } catch (error) {
        this.setState({
            isLoaded: false,
            isLoading: true,
            error: error

          })
      }
    }

  getRestPeople = async () => {
        const { people, peopleData, characters } = this.state
        try {
            if (peopleData.next) {
                if (people.length >= 82) {
                    this.setState({
                        ...this.state,
                        hasMore: false
                      })      
                }            
                const nextPeople = await apiPeople(peopleData.next)
                this.setState({
                    ...this.state,
                    people: [...people, ...(await cardInfo(nextPeople.results, characters))],
                    peopleData: nextPeople,
                    isLoaded: true,
                    hasMore: true,
                    isLoading: false
                  })      
            }
            return null
          } catch (error) {
            this.setState({
                isLoaded: false,
                isLoading: true,
                error: error
              })
          }
    }

    filterPeople = async (value) => {
        const { characters } = this.state
        try {
            const {results} = await apiSearch(value)
              this.setState({
                  ...this.state,
                  isLoading: false,
                  people: await cardInfo(results, characters)
                })
          } catch (error) {
            console.log(error)
          }
    }

    radioFilters = async (value) => {
      try {
       const { characters } = this.state
            this.setState({
              ...this.state,
              isLoading: true
            }) 
            if (value === 'heaviest') {
              const older = await peopleInfoFilter(characters)
              //const subst = value.replace('BBY', '')
              const result = older.sort((a, b) => parseFloat(a.mass) - parseFloat(b.mass))
                     this.setState({
                         ...this.state,
                         people: result,
                         hasMore: false,
                         isLoaded: true,
                         isLoading: false
                       })      
            } else if (value === 'female' || 'male') {
              const gender = await peopleInfoFilter(characters)
              const result = gender.filter(genderResult => genderResult.gender === value) 
                     this.setState({
                         ...this.state,
                         people: result,
                         hasMore: false,
                         isLoaded: true,
                         isLoading: false
                       })      
            }
   
        } catch (error) {
          this.setState({
              isLoaded: false,
              isLoading: true,
              error: error
            })
        }
  }

    clearFilters = async (value) => {
      try {
        if (value) {
          const { results } = await apiPeople(null)
          this.setState({
            ...this.state,
              people: await cardInfo(results, await apiGetCharacters()),
              peopleData: await apiPeople(null),
              characters: await apiGetCharacters(),
              hasMore: true,
              isLoaded: true,
              isLoading: false,
            })      
        }
        } catch (error) {
          this.setState({
              isLoaded: false,
              isLoading: true,
              error: error
  
            })
        }
      }

      getPerson = async (value) => {
        const { people, characters } = this.state
        try {
          const selected = people?.find((res) => res.name.toLowerCase() === value.toLowerCase())
          if (selected) {
            const {residents} = await apiPlanets(selected.homeworld)
            const person = await cardInfo(selected, characters)
            const data = await residentInfo(residents, characters)
            const dataWithoutPerson = data.filter(result => result.name !== person.name)
    
            this.setState({
              ...this.state,
              person: person,
              hasMore: true, 
              residents: dataWithoutPerson,
              isLoading: false
            })      
          }
            const {results} = await apiSearch(value)
            const {residents} = await apiPlanets(results[0].homeworld)
            const person = await cardInfo(results, characters)
            const data = await residentInfo(residents, characters)
            const dataWithoutPerson = data.filter(result => result.name !== person[0].name)

                  this.setState({
                      ...this.state,
                      person: person[0],
                      residents: dataWithoutPerson,
                      hasMore: true, 
                      isLoading: false
                    })
       
          } catch (error) {
            this.setState({
              isLoading: true
            })
          }
      }
  render() {
    const { people, peopleData, characters, isLoading, isLoaded, residents, person, hasMore } = this.state;

    const { clearFilters, radioFilters, getFirstTen, getRestPeople, filterPeople, getPerson } = this;
    return  (
      <Provider
        value={{
          clearFilters,
          getFirstTen,
          radioFilters,
          getPerson,
          filterPeople,
          getRestPeople,
          hasMore,
          isLoading,
          people,
          peopleData,
          isLoaded,
          characters,
          residents,
          person
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const withContext = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {({ people, clearFilters, radioFilters, getPerson,  getRestPeople, filterPeople, peopleData, hasMore, characters, isLoading, residents, isLoaded, getFirstTen, person }) => {
            return (
              <WrappedComponent
                clearFilters={clearFilters}
                radioFilters={radioFilters}
                hasMore={hasMore}
                person={person}
                getPerson={getPerson}
                filterPeople={filterPeople}
                getRestPeople={getRestPeople}
                getFirstTen={getFirstTen}
                isLoading={isLoading}
                people={people}
                peopleData={peopleData}
                characters={characters}
                isLoaded={isLoaded}
                residents={residents}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

export { StarWarsProvider, withContext };
