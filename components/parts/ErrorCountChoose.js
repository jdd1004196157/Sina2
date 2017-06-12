/**
 * Created by chaijiang on 2017/5/11.
 */

/**
 * Created by chaijiang on 2017/3/31.
 */
import AppDispatcher from '../../dispatcher/AppDispatcher'

import React, {Component} from 'react'
import ListStore from '../../stores/ListStorettt'
import AppStore from '../../stores/AppStore'
import { Row, Col } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import { Spin, Alert } from 'antd';

export default class ErrorCountChoose extends Component {

    constructor(props) {
        super(props)
        this.mounted = true;
        this.state = {
            para:ListStore.data.errorcount.PortData,
        }
        this.changeBusiness = this.changeBusiness.bind(this)
        this.changeWbVersion = this.changeWbVersion.bind(this)
        this.changeNetType = this.changeNetType.bind(this)
        this.changeSystem = this.changeSystem.bind(this)
        this.changeLd = this.changeLd.bind(this)
        this.changeTime = this.changeTime.bind(this)

        this.getRecent7Days = this.getRecent7Days.bind(this)
        this.getDateStr = this.getDateStr.bind(this)
        this.disabledDate = this.disabledDate.bind(this)

        this._onChange1 = () => {
            if(this.mounted){
                this.setState(ListStore)
            }
        };
    }


    componentWillMount(){

        ListStore.addChangeListener(this._onChange1.bind(this))
        console.log('errorcount will')
        //修改默认的时间
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'startdate',
                value : this.getRecent7Days()[1]
            }
        })

        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'enddate',
                value : this.getRecent7Days()[0]
            }
        })

        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_ERRORCHART',
            data:this.state.para
        })

    }
    componentDidMount(){

    }
    componentWillUnmount() {
        this.mounted = false;
        ListStore.removeChangeListener(this._onChange1);
    };

    /* _onChange1(){

     this.setState(ListStore)

     }*/

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
    //输出：[20170110,20170103]
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


    /******************************************改变端口号对应事件**********************/
    //业务线
    changeBusiness(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'bussinesstype',
                value : value
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_ERRORCHART',
            data:this.state.para
        })
    }
    //微博版本
    changeWbVersion(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'appversion',
                value : value
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_ERRORCHART',
            data:this.state.para
        })
    }
    //网络类型
    changeNetType(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'network_type',
                value : value
            }
        })

        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_ERRORCHART',
            data:this.state.para
        })
    }
    //手机系统
    changeSystem(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'phonetype',
                value : value
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_ERRORCHART',
            data:this.state.para
        })
    }
    //粒度
    changeLd(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'granularity',
                value : value
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_ERRORCHART',
            data:this.state.para
        })
    }
    //时间
    changeTime(time, timeString) {
        // alert(timeString[0]==timeString[1])
        if(timeString[0]==timeString[1]){
            return
        }
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'startdate',
                value : timeString[0]
            }
        })

        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'errorcount',
                item : 'enddate',
                value : timeString[1]
            }
        })

        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_ERRORCHART',
            data:this.state.para
        })

    }

    /******************************************改变端口号对应事件**********************/

    render() {
        let styles = {
            root: {
                width: '100%',
                height: 'auto',
                margin: 0,
                padding: 0,
                position:'relative',
                background:'rgba(78, 94, 120, 1)',
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
            },
            card1:{
                float:'left',
                width:'23%',
                height:200,
                background:'rgba(65, 75, 95, 0.7)',
                borderRadius: 5,
                fontSize:20,
                color:'white',
                textAlign:'center',
                verticalAlign:'middle',
                display:'table-cell',
                padding:'2% 0',
                margin:'1%'
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
        //****************************************选择框处理********************
        //选择框中循环读出数据生成选择选项
        function getOptions(type){
            const options=AppStore.data[type].map(obj => {
                return(
                    <Option key={obj.key}>{obj.value}</Option>
                )
            })
            return options
        }

        //读取业务线中数据
        const business_select = getOptions("business")
        //读取微博版本中数据
        const version_select = getOptions("pandectversion")
        //读取网络类型中数据
        const netType_select = getOptions("netType")
        //读取手机系统中数据
        const computerType_select = getOptions("computerType")
        //读取系统版本中数据
        //const sysVersion = getOptions("sysVersion")


        const dateFormat = 'YYYY/MM/DD';
        const true1=true
        let all;
        if(ListStore.data.errorcount.flag){
            all=(
                <div style={{width:'98%',margin:'auto',}}>
                    <Spin tip="Loading..." style={{width:'98%'}}>
                        <div style={styles.choose}>

                            <Row >
                                <Col xs={0} md={0} lg={2}  style={styles.col}>
                                </Col>
                                <Col xs={8} md={8} lg={5}  style={styles.col}>
                                    <span>业务线：</span>
                                    <Select  style={{ width: '65%'}} size="large" onChange={this.changeBusiness}  value={ListStore.data.errorcount.PortData.subtype}>
                                        {business_select}
                                    </Select>
                                </Col>
                                <Col  xs={8} md={8} lg={10} style={styles.col}>
                                    <span>微博版本：</span>
                                    <Select   style={{ width: '60%',}} size="large" onChange={this.changeWbVersion}  value={ListStore.data.errorcount.PortData.app_version}>
                                        {version_select}
                                    </Select>
                                </Col>

                                <Col  xs={8} md={8} lg={5} style={styles.col}>
                                    <span>网络类型：</span>
                                    <Select style={{ width: '60%', }} size="large" onChange={this.changeNetType} value={ListStore.data.errorcount.PortData.network_type}>
                                        {netType_select}
                                    </Select>
                                </Col>

                                <Col xs={0} md={0} lg={2}  style={styles.col}>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={0} md={0} lg={2}  style={styles.col}>
                                </Col>
                                <Col xs={7} md={8} lg={5} style={styles.col}>
                                    <span>手机系统：</span>
                                    <Select style={{ width: '60%' }} size="large" onChange={this.changeSystem} value={ListStore.data.errorcount.PortData.phonetype}>
                                        {computerType_select}
                                    </Select>
                                </Col>

                                <Col xs={7} md={8} lg={5}  style={styles.col}>
                                    <span>时间粒度：</span>
                                    <Select  style={{ width: '50%' }} size="large" onChange={this.changeLd} value={ListStore.data.errorcount.PortData.granularity}>
                                        <Option value="Daily">一天</Option>
                                        <Option value="Weekly">一周</Option>
                                        <Option value="Monthly">一月</Option>
                                    </Select>
                                </Col>
                                <Col xs={10} md={8} lg={10}  style={styles.col}>
                                    <span>时间：</span>
                                    <RangePicker style={{width: '80%' }} defaultValue={[moment(this.getRecent7Days()[1], dateFormat), moment(this.getRecent7Days()[0], dateFormat)]}
                                                 disabledDate={this.disabledDate()} format={dateFormat}
                                                 size="large"  onChange={this.changeTime}
                                                 value={[moment(ListStore.data.errorcount.PortData.startdate, dateFormat), moment(ListStore.data.errorcount.PortData.enddate, dateFormat)]}/>
                                </Col>
                                <Col xs={0} md={0} lg={2}  style={styles.col}>
                                </Col>
                            </Row>

                        </div>
                    </Spin>
                </div>

            )
        }else{
            all=(
                <div style={{width:'98%',margin:'auto',}}>
                    <div style={styles.choose}>
                        <Row >
                            <Col xs={0} md={0} lg={2}  style={styles.col}>
                            </Col>
                            <Col xs={8} md={8} lg={5}  style={styles.col}>
                                <span>业务线：</span>
                                <Select  style={{ width: '65%'}} size="large" onChange={this.changeBusiness} value={ListStore.data.errorcount.PortData.subtype}>
                                    {business_select}
                                </Select>
                            </Col>
                            <Col  xs={8} md={8} lg={10} style={styles.col}>
                                <span>微博版本：</span>
                                <Select  style={{ width: '60%',}} size="large" onChange={this.changeWbVersion} value={ListStore.data.errorcount.PortData.app_version}>
                                    {version_select}
                                </Select>
                            </Col>

                            <Col  xs={8} md={8} lg={5} style={styles.col}>
                                <span>网络类型：</span>
                                <Select    style={{ width: '60%', }} size="large" onChange={this.changeNetType} value={ListStore.data.errorcount.PortData.network_type}>
                                    {netType_select}
                                </Select>
                            </Col>

                            <Col xs={0} md={0} lg={2}  style={styles.col}>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={0} md={0} lg={2}  style={styles.col}>
                            </Col>
                            <Col xs={7} md={8} lg={5} style={styles.col}>
                                <span>手机系统：</span>
                                <Select  style={{ width: '60%' }} size="large" onChange={this.changeSystem} value={ListStore.data.errorcount.PortData.phonetype}>
                                    {computerType_select}
                                </Select>
                            </Col>

                            <Col xs={7} md={8} lg={5}  style={styles.col}>
                                <span>时间粒度：</span>
                                <Select style={{ width: '50%' }} size="large" onChange={this.changeLd} value={ListStore.data.errorcount.PortData.granularity}>
                                    <Option value="Daily">一天</Option>
                                    <Option value="Weekly">一周</Option>
                                    <Option value="Monthly">一月</Option>
                                </Select>
                            </Col>
                            <Col xs={10} md={8} lg={10}  style={styles.col}>
                                <span>时间：</span>
                                <RangePicker style={{width: '80%' }} defaultValue={[moment(this.getRecent7Days()[1], dateFormat), moment(this.getRecent7Days()[0], dateFormat)]}
                                             disabledDate={this.disabledDate()} format={dateFormat}
                                             size="large"  onChange={this.changeTime}
                                             value={[moment(ListStore.data.errorcount.PortData.startdate, dateFormat), moment(ListStore.data.errorcount.PortData.enddate, dateFormat)]}/>
                            </Col>
                            <Col xs={0} md={0} lg={2}  style={styles.col}>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        }

        return (

            <div style={styles.root}>
                {all}
            </div>
        )
    }
}