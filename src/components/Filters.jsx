import React, { Component } from 'react'
import { Radio,} from "antd"
import { withContext } from '../context/context'


class Filters extends Component {

    onChange = async (e) => {

        const { clearFilters, radioFilters } = this.props
        if (e.target.value === 'female' || 'male' || 'heaviest') {
            radioFilters(e.target.value)  
        }
        if (e.target.value === 'clear') {
            clearFilters(e.target.value)
        }
    }

    render() {
        return (
            <>
             <Radio.Group onChange={this.onChange} size="large" >
              <Radio.Button
                style={{marginLeft: '8rem'}}

                value='female'
                defaultChecked={false}
              >
                Female
              </Radio.Button>
              <Radio.Button
                value='male'
                defaultChecked={false}
              >
                Male
              </Radio.Button>
              <Radio.Button
                value='heaviest'
                defaultChecked={false}
              >
                Heaviest first
              </Radio.Button>
              <Radio.Button
                style={{marginLeft: '5rem'}}
                value='clear'
                defaultChecked={false}
              >
                Clear
              </Radio.Button>
            </Radio.Group>            
            </>
        )
    }
}

export default withContext(Filters)
