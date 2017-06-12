
/**
 * Created by chaijiang on 2017/3/31.
 */
import AppDispatcher from '../../dispatcher/AppDispatcher'

import React, {Component} from 'react'
import AppStore from '../../stores/AppStore'
import ListStore from '../../stores/ListStorettt'
import { Row, Col } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import Charts from './Charts'
import PandectChoose from './PandectChoose'
import LinkCharts from './LinkCharts'
import { Spin, Alert } from 'antd';

export default class Pandect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            para:AppStore.data.pansect.PortData,
        }

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
                height: '350px',
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
                margin:'1%',
                marginLeft:'0',
            },
            card3:{
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
                margin:'1%',
                marginRight:'0',
            },
            spanTop:{
                height:'30%',
                verticalAlign:'middle',
                margin:'auto',
                fontSize:16,
            },
            spanMid:{
                height:'40%',
                margin:'auto',
                verticalAlign:'middle',
                fontSize:24,
            },
            spanBot:{
                height:'30%',
                verticalAlign:'middle',
                margin:'auto',
                fontSize:16,
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

        let fulllink=this.props.data.tableData_pansect.fulllink,
            client = this.props.data.tableData_pansect.client,
            MAPI= this.props.data.tableData_pansect.mapi,
            platform= this.props.data.tableData_pansect.platform


        const true1=true

        return (

            <div style={styles.root}>

                <PandectChoose/>
                <div style={{height:10}}></div>

                <div style={styles.show}>
                    <div style={styles.card2} >
                        <div style={styles.spanTop}>平均响应时间:</div>
                        <div style={styles.spanMid}>{(fulllink.averagetime).toFixed(2)}s</div>
                        <div style={styles.spanBot}>请求次数：{fulllink.hits}</div>
                    </div>
                    <div style={styles.card1} >
                        <div style={styles.spanTop}>客户端平均响应时间:</div>
                        <div style={styles.spanMid}>{(client.averagetime).toFixed(2)}s</div>
                        <div style={styles.spanBot}>成功率：{(client.successrate*100).toFixed(2)}%</div>
                    </div>
                    <div style={styles.card1} >
                        <div style={styles.spanTop}>MAPI平均响应时间:</div>
                        <div style={styles.spanMid}>{(MAPI.averagetime).toFixed(2)}s</div>
                        <div style={styles.spanBot}>成功率：{(MAPI.successrate*100).toFixed(2)}%</div>
                    </div>
                    <div style={styles.card3} >
                        <div style={styles.spanTop}>平台平均响应时间:</div>
                        <div style={styles.spanMid}>{(platform.averagetime).toFixed(2)}s</div>
                        <div style={styles.spanBot}>成功率：{(platform.successrate*100).toFixed(2)}%</div>
                    </div>

                </div>

                <div style={{clear:'both'}}></div>

                <div style={styles.chart}>
                    <LinkCharts data={this.props.data.aveSumResTime} detail={this.props.data.allDetail} first={'true'} index="aveSumResTime"/>

                </div>
                <div style={styles.chart}>
                    <Charts data={this.props.data.successRate} index="successRate"/>
                </div>

                <div style={{clear:'both'}}></div>

                <div style={styles.chart}>
                    <Charts data={this.props.data.aveResTime} index="aveResTime"/>
                </div>

                <div style={styles.chart}>
                    <Charts data={this.props.data.rateLowSpeed} index="rateLowSpeed"/>
                </div>
                <div style={styles.chart1}>
                    <Charts data={this.props.data.distriResTime} index="distriResTime"/>
                </div>
                <div style={styles.chart1}>
                    <Charts data={this.props.data.areaDisTimeCon} index="areaDisTimeCon"/>
                </div>

            </div>
        )
    }
}