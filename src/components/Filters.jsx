import React, { Component, Tag } from 'react'
import { Radio,} from "antd"
import { withContext } from '../context/context'


class Filters extends Component {
    // state = {
    //     isChecked: true
    // }
    onChange = async (e) => {

        const { clearFilters, getAllPeople } = this.props
        if (e.target.value === 'female') {
            getAllPeople(e.target.value)  
        }
        if (e.target.value === 'clear') {
            clearFilters()
            // this.setState({
            //     isChecked: true
            // })
        }
    }

    render() {
        //const {isChecked} = this.state
        return (
            <>
             <Radio.Group onChange={this.onChange} size="large" >
              <Radio.Button
                value='female'
                defaultChecked={false}
                //key=
              >
                Female
              </Radio.Button>
              <Radio.Button
                value='b'
                defaultChecked={false}

                //key=
              >
                Sort
              </Radio.Button>
              <Radio.Button
                value='clear'
                defaultChecked={false}
                //checked={!isChecked}
              >
                Clear
              </Radio.Button>
            </Radio.Group>            
            </>
        )
    }
}

export default withContext(Filters)
