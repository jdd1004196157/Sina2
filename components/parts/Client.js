
/**
 * Created by chaijiang on 2017/3/31.
 */
import AppDispatcher from '../../dispatcher/AppDispatcher'

import React, {Component} from 'react'
import AppStore from '../../stores/AppStore'
import { Row, Col } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import Charts from './Charts'
import ClientChoose from './ClientChoose'
import { Spin, Alert } from 'antd';


export default class Client extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.getRecent7Days = this.getRecent7Days.bind(this)
        this.getDateStr = this.getDateStr.bind(this)
        this.disabledDate = this.disabledDate.bind(this)
    }



    /******************************************处理时间**********************/
    //将时间转换为字符串处理
    //输入：Date类型的数据
    //输出:一个数组 第一个为今天之前一天的日期，第二个为今天之前7天的日期
    getDateStr(value){
        let  year = value.getFullYear();
        let month = value.getMonth() + 1; // 记得当前月是要+1的
        month=month<10?('0' + month) : month;
        let dt = value.getDate()<10?('0' + value.getDate()) : value.getDate();
        let today = year + "-" + month + "-" + dt;
        return today;
    };

    //获得最近一周的时间
    //输入：无
    //输出：20170103-20170110
    getRecent7Days(){
        let d = new Date();
        let d1 = new Date();
        d.setDate(d.getDate());
        d1.setDate(d1.getDate()-7);
        let arr=[]
        arr.push(this.getDateStr(d));
        arr.push(this.getDateStr(d1));
        return arr
    }
    //处理日期选择范围
    disabledDate(current) {
        return current && current.valueOf() > Date.now()-24*60*60;

    }
    /******************************************处理时间**********************/



    render() {
        const dateFormat = 'YYYY/MM/DD';

        let styles = {
            root: {
                width: '100%',
                height: 'auto',
                margin: 0,
                padding: 0,
                position:'relative',
                background:'rgba(78, 94, 120, 1)',
                //background:'black'
            },
            chart:{
                width:'98%',
                height: '350px',
                background:'white',
                margin:'10 auto',
                borderRadius: 5,
                position:'relative',
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


            /* 客户端耗时均值 暂时删掉<div style={styles.chart}>
    <Charts data={this.props.data.aveTimeConsum} index="aveTimeConsum"/>
            </div>*/
        return (
            <div style={styles.root}>

                <ClientChoose/>
                <div style={{height:30}}></div>


                <div style={styles.chart}>
                    <Charts data={this.props.data.aveTime} index="aveTime"/>
                </div>
                <div style={styles.chart}>
                    <Charts data={this.props.data.aveTimeNot} index="aveTimeNot"/>
                </div>
                <div style={styles.chart}>
                    <Charts data={this.props.data.successRate} index="successRate"/>
                </div>
                <div style={styles.chart}>
                    <Charts data={this.props.data.timeDeRate} index="timeDeRate"/>
                </div>


                <div style={styles.chart}>
                    <Charts data={this.props.data.timeRate} index="timeRate"/>
                </div>
            </div>
        )
    }
}
