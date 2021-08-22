import React, { Component } from 'react'
import { withContext } from '../context/context'
import { BackTop} from "antd"
import Header from './../pages/Header'
import CardCharacters from '../components/CardCharacters'
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from '../components/Spinner'
import Filters from '../components/Filters'
import './Main.css'
import { peopleInfoFilter } from '../utils'

class Main extends Component {

    componentDidMount() {
        const { getFirstTen } = this.props
        getFirstTen()
      }

    onChange = async (e) => {
        const { people, filterPeople, getFirstTen } = this.props

        const value = e.target.value
        if (value !== '' ) {
              filterPeople(value)
         } else if ((value === '') && (people.length === 10)){
            getFirstTen()
         }
    }

    render() {
        const { people, getRestPeople, hasMore } = this.props
        const peopleFromLocalStorage = JSON.parse(localStorage.getItem('allPeople'))  

        return (
            <>
            <Header onChange={this.onChange} />
            <Filters />
            <InfiniteScroll
                dataLength={people.length} 
                next={getRestPeople}
                hasMore={hasMore}
                loader={<Spinner/>}
                endMessage={
                <p style={{ textAlign: "center"}}>
                    <b>Yay! You have seen it all</b>
                </p>
                }
            >   
            {navigator.onLine ? 
                <CardCharacters people={people }/> : 
                <CardCharacters people={peopleFromLocalStorage}/> 
            }
                </InfiniteScroll>
      
            <BackTop />
            </>
        )
    }
}

export default withContext(Main)