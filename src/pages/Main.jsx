import React, { Component } from 'react'
import { withContext } from '../context/context'
import { BackTop, Spin} from "antd"
import { ArrowUpOutlined } from '@ant-design/icons';
import Header from './../pages/Header'
import CardCharacters from '../components/CardCharacters'
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from '../components/Spinner'
import './Main.css'

class Main extends Component {

    componentDidMount() {
        const { getFirstTen } = this.props
            getFirstTen()
      }

    onChange = async (e) => {
        const { filterPeople, people, getFirstTen } = this.props

        const value = e.target.value
        if (value !== '' ) {
              filterPeople(value)
         } else if ((value === '') && (people.length === 10)){
            getFirstTen()
         }
    }
    
    componentDidUpdate () {
        const { getFirstTen } = this.props

         if (this.props.people.length === 0) {
                getFirstTen()
        }
        }

    render() {
        const { people, getRestPeople, hasMore, isLoading } = this.props
        const peopleFromLocalStorage = JSON.parse(localStorage.getItem('allPeople'))  

        return (
        <div className='app-wrap'>
            <div className={people.length <= 4 ? 'starsOne' : 'starsAll'}>
          <Header  onChange={this.onChange} />
          <Spin spinning={navigator.onLine ? isLoading : false} size="large">
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
                </Spin>
            <BackTop>
                <div style={{backgroundColor: 'white', color:'black',height: 50,
                    width: 50,
                    lineHeight: '50px',
                    borderRadius: 4,
                    textAlign: 'center',
                    fontSize: 25,}}>
                        <ArrowUpOutlined />
                    </div>
            </BackTop>
            </div>
          </div>
            
        )
    }
}

export default withContext(Main)