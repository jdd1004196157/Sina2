/**
 * Created by chaijiang on 2017/6/8.
 */

/**
 * Created by chaijiang on 2017/3/31.
 */
import DashBoardDispatcher from '../../dispatcher/DashBoardDispatcher'

import React, {Component} from 'react'
import ChooseStore from '../../stores/ChooseStore'
import TimeDisStore from '../../stores/TimeDisStore'
import Charts from './Charts'
import PandectChoose from './PandectChoose'


export default class TimeDis extends Component {

    constructor(props) {
        super(props)
        this.state = {
            para:ChooseStore.data.pansect.PortData,
        }

    }
    componentWillMount() {
        TimeDisStore.addChangeListener(this._onChange1.bind(this))
    }
    _onChange1(){
        console.log('listen TimeDisStore')
        this.setState(TimeDisStore)
    }

    render() {
        let styles = {
            root: {
                width: '100%',
                height: 'auto',
                margin: 0,
                paddingBottom: 100,
                position:'relative',
                background:'rgba(78, 94, 120, 1)',
                marginBottom:20,
            },
            show:{
                width:'98%',
                height: 90,
                background:'rgba(78, 94, 120, 1)',
                margin:'0 auto',
            },
            chart:{
                width:'98%',
                height: '500px',
                background:'white',
                margin:'10 auto',
                borderRadius: 5,
                position:'relative',
            },
            chart1:{
                width:'48%',
                height: '350px',
                background:'white',
                margin:'1 1%',
                borderRadius: 5,
                float:'left',
                marginBottom:'20px',
            },
            card1:{
                float:'left',
                width:'23.5%',
                height:200,
                background:'rgba(65, 75, 95, 0.7)',
                borderRadius: 5,
                fontSize:20,
                color:'white',
                textAlign:'center',
                verticalAlign:'middle',
                display:'table-cell',
                padding:'3% 0',
                margin:'1%'
            },
            card2:{
                float:'left',
                width:'49%',
                height:100,
                background:'rgba(65, 75, 95, 0.7)',
                borderRadius: 5,
                fontSize:20,
                color:'white',
                textAlign:'center',
                verticalAlign:'middle',
                display:'table-cell',
                padding:'1% 0',
                margin:'1%',
                marginLeft:'0',
            },
            card3:{
                float:'left',
                width:'49%',
                height:100,
                background:'rgba(65, 75, 95, 0.7)',
                borderRadius: 5,
                fontSize:20,
                color:'white',
                textAlign:'center',
                verticalAlign:'middle',
                display:'table-cell',
                padding:'1% 0',
                margin:'1%',
                marginRight:'0',
            },
            span:{
                height:'40px',
                lineHeight:'40px',
                margin:'auto',
                fontSize:16,
                verticalAlign:'middle'
            },

            choose: {
                width: '100%',
                height: 'auto',
                textAlign: 'center',
                padding: '10px',
                background:'rgba(247, 247, 247, 1)',
                color:'black',
                borderRadius: 5,
                margin:'auto',
            },
            col:{
                padding:'10px 0px'
            },

        }
        const true1=true


        return (

                <div style={styles.chart}>
                    <Charts data={TimeDisStore.data.pansect.timeConsumeDistribute} index="timeConsumeDistribute" height='500'/>
                </div>

        )
    }
}