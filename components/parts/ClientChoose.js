
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
import { Spin, Alert } from 'antd';


export default class Client extends Component {

    constructor(props) {
        super(props)
        this.mounted = true;
        this.state = {
        }
        this.changeBusiness = this.changeBusiness.bind(this)
        this.changeWbStartVersion = this.changeWbStartVersion.bind(this)
        this.changeWbEndVersion = this.changeWbEndVersion.bind(this)
        this.changeNetType = this.changeNetType.bind(this)
        this.changeSystem = this.changeSystem.bind(this)
        this.changeSystemVersion = this.changeSystemVersion.bind(this)
        this.changeTime = this.changeTime.bind(this)

        this.getRecent7Days = this.getRecent7Days.bind(this)
        this.getDateStr = this.getDateStr.bind(this)
        this.disabledDate = this.disabledDate.bind(this)

        this._onChange2 = () => {
            if(this.mounted){
                this.setState(ListStore)
            }
        };
    }

    componentWillMount(){
        ListStore.addChangeListener(this._onChange2.bind(this))
        //修改默认的时间
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'startdate',
                value : this.getRecent7Days()[1]
            }
        })

        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'enddate',
                value : this.getRecent7Days()[0]
            }
        })
        //修改默认的起始版本
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'startappversion',
                value : AppStore.data.version[5].value
            }
        })

        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'endappversion',
                value : AppStore.data.version[0].value
            }
        })

        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_CLIENTCHART',
            data:ListStore.data.client.PortData
        })

    }
    componentDidMount(){

    }

    componentWillUnmount() {
        this.mounted = false;
        ListStore.removeChangeListener(this._onChange2);
    };
    /*_onChange2(){
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

    /******************************************改变端口号对应事件**********************/
    //业务线
    changeBusiness(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'bussinesstype',
                value : value
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_CLIENTCHART',
            data:ListStore.data.client.PortData
        })
    }
    //微博开始版本
    changeWbStartVersion(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'startappversion',
                value : value
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_CLIENTCHART',
            data:ListStore.data.client.PortData
        })
    }
    //微博结束版本
    changeWbEndVersion(value){
        let startversion=ListStore.data.client.PortData.startappversion
        let endversion=value
        let startarr=startversion.split('.')
        let endarr=endversion.split('.')
        if(endarr[0]<startarr[0]){
            return
        }else if(endarr[0]==startarr[0]&& endarr[1]<startarr[1]){
            return
        }else if(endarr[0]==startarr[0]&& endarr[1]==startarr[1]&&endarr[2]<startarr[2]){
            return
        }else {

            AppDispatcher.dispatch({
                action: 'CHANGE_PORT',
                data: {
                    page: 'client',
                    item: 'endappversion',
                    value: value
                }
            })
            //获得数据
            AppDispatcher.dispatch({
                action: 'GET_CLIENTCHART',
                data: ListStore.data.client.PortData
            })
        }
    }
    //网络类型
    changeNetType(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'network_type',
                value : value
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_CLIENTCHART',
            data:ListStore.data.client.PortData
        })
    }
    //手机系统
    changeSystem(value){

        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'phonetype',
                value : value
            }
        })
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'systemversion',
                value : 'All'
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_CLIENTCHART',
            data:ListStore.data.client.PortData
        })
    }
    //系统版本
    changeSystemVersion(value){
        console.log(value)
        let sysValue=[]
        if(value.length>1 && value.indexOf('All')>-1){
            if(value[value.length-1]=='All'){
                sysValue=['All']
            }
            else{
                for(let i=0;i<value.length;i++){
                    if(value[i]!='All'){
                        sysValue.push(value[i])
                    }
                }
            }
        }else{
            sysValue=value
        }
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'systemversion',
                value : sysValue
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_CLIENTCHART',
            data:ListStore.data.client.PortData
        })
    }
    //时间
    changeTime(time, timeString) {
        if(timeString[0]==timeString[1]){
            return
        }
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'startdate',
                value : timeString[0]
            }
        })

        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'client',
                item : 'enddate',
                value : timeString[1]
            }
        })
        //获得数据
        AppDispatcher.dispatch({
            action: 'GET_CLIENTCHART',
            data:ListStore.data.client.PortData
        })
    }


    /******************************************改变端口号对应事件**********************/

    render() {
        console.log(' client render')
        const dateFormat = 'YYYY-MM-DD';

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


        //****************************************选择框处理********************
        //选择框中循环读出数据生成选择选项
        function getOptions(type,para){
            if(para=='All'){
                const options=AppStore.data[type].map(obj => {
                    return(
                        <Option key={obj.key}>{obj.value}</Option>
                    )
                })
                return options
            }else if(para=='iPhone'){
                let resultphone=[]
                resultphone.push({key:'All',value:"All"})
                for(let i=0;i<AppStore.data[type].length;i++){
                    if(AppStore.data[type][i].key.indexOf('os')!=-1){
                        resultphone.push(AppStore.data[type][i])
                    }
                }

                const options=resultphone.map(obj => {
                    return(
                        <Option key={obj.key}>{obj.value}</Option>
                    )
                })

                return options
            }else if(para=='Android'){

                let resultphone=[]
                resultphone.push({key:'All',value:"All"})
                for(let i=0;i<AppStore.data[type].length;i++){
                    if(AppStore.data[type][i].key.indexOf('android')!=-1){
                        resultphone.push(AppStore.data[type][i])
                    }
                }
                const options=resultphone.map(obj => {
                    return(
                        <Option key={obj.key}>{obj.value}</Option>
                    )
                })

                return options
            }
        }
        //读取业务线中数据
        const business_select = getOptions("business",'All')
        //读取微博版本中数据
        const version_select = getOptions("version",'All')
        //读取网络类型中数据
        const netType_select = getOptions("netType",'All')
        //读取手机系统中数据
        const computerType_select = getOptions("computerType",'All')
        //读取系统版本中数据
        let sysVersion = getOptions("sysVersion",'All')
        if(ListStore.data.client.PortData.phonetype=='iPhone'){
            sysVersion=getOptions("sysVersion",'iPhone')
        }
        if(ListStore.data.client.PortData.phonetype=='Android'){
            sysVersion=getOptions("sysVersion",'Android')
        }
        const true1=true
        let choose
        if(ListStore.data.client.flag){
            choose=(
                <div style={{width:'98%',margin:'auto',}}>
                    <Spin tip="Loading..." >
                        <div style={styles.choose}>
                    <Row >
                        <Col xs={0} md={1} lg={2}  style={styles.col}>
                        </Col>
                        <Col xs={7} md={5} lg={5}  style={styles.col}>
                            <span>业务线：</span>
                            <Select  style={{ width: '60%'}} size="large" onChange={this.changeBusiness} value={ListStore.data.client.PortData.subtype}>
                                {business_select}
                            </Select>
                        </Col>
                        <Col  xs={10} md={10} lg={8} style={styles.col}>
                            <span>微博版本：</span>
                            <Select  style={{ width: '30%',}} size="large" onChange={this.changeWbStartVersion} value={ListStore.data.client.PortData.startappversion}>
                                {version_select}
                            </Select>
                            <span> - </span>
                            <Select style={{ width: '30%',}} size="large" onChange={this.changeWbEndVersion} value={ListStore.data.client.PortData.endappversion}>
                                {version_select}
                            </Select>
                        </Col>

                        <Col xs={7} md={7} lg={7}  style={styles.col}>
                            <span>采样时间：</span>
                            <RangePicker style={{width: '70%' }} defaultValue={[moment(this.getRecent7Days()[1], dateFormat), moment(this.getRecent7Days()[0], dateFormat)]}
                                         disabledDate={this.disabledDate()} format={dateFormat}
                                         size="large"  onChange={this.changeTime}
                                         value={[moment(ListStore.data.client.PortData.startdate, dateFormat), moment(ListStore.data.client.PortData.enddate, dateFormat)]}/>
                        </Col>
                        <Col xs={0} md={1} lg={2}  style={styles.col}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={0} md={1} lg={2}  style={styles.col}>
                        </Col>
                        <Col xs={7} md={5} lg={5} style={styles.col}>
                            <span>手机系统：</span>
                            <Select value={ListStore.data.client.PortData.phonetype} style={{ width: '60%' }} size="large" onChange={this.changeSystem}>
                                {computerType_select}
                            </Select>
                        </Col>
                        <Col xs={10} md={10} lg={10}  style={styles.col}>
                            <span>系统版本：</span>
                            <Select  multiple={true1} style={{ width: '60%', }} size="large" onChange={this.changeSystemVersion} value={ListStore.data.client.PortData.systemversion}>
                                {sysVersion}
                            </Select>
                        </Col>
                        <Col xs={7} md={7} lg={5}  style={styles.col}>
                            <span>网络类型：</span>
                            <Select    value={ListStore.data.client.PortData.network_type} style={{ width: '60%', }} size="large" onChange={this.changeNetType}>
                                {netType_select}
                            </Select>
                        </Col>

                        <Col xs={0} md={1} lg={2}  style={styles.col}>
                        </Col>
                    </Row>
                </div>
                    </Spin>
                </div>
            )
        }else{
            choose=(
                <div style={{width:'98%',margin:'auto',}}>
                <div style={styles.choose}>
                    <Row >
                        <Col xs={0} md={1} lg={2}  style={styles.col}>
                        </Col>
                        <Col xs={7} md={5} lg={5}  style={styles.col}>
                            <span>业务线：</span>
                            <Select  style={{ width: '60%'}} size="large" onChange={this.changeBusiness} value={ListStore.data.client.PortData.subtype}>
                                {business_select}
                            </Select>
                        </Col>
                        <Col  xs={10} md={10} lg={8} style={styles.col}>
                            <span>微博版本：</span>
                            <Select  style={{ width: '30%',}} size="large" onChange={this.changeWbStartVersion} value={ListStore.data.client.PortData.startappversion}>
                                {version_select}
                            </Select>
                            <span> - </span>
                            <Select style={{ width: '30%',}} size="large" onChange={this.changeWbEndVersion} value={ListStore.data.client.PortData.endappversion}>
                                {version_select}
                            </Select>
                        </Col>
                        <Col xs={7} md={7} lg={7}  style={styles.col}>
                            <span>采样时间：</span>
                            <RangePicker style={{width: '70%' }} defaultValue={[moment(this.getRecent7Days()[1], dateFormat), moment(this.getRecent7Days()[0], dateFormat)]}
                                         disabledDate={this.disabledDate()} format={dateFormat}
                                         size="large"  onChange={this.changeTime}
                                         value={[moment(ListStore.data.client.PortData.startdate, dateFormat), moment(ListStore.data.client.PortData.enddate, dateFormat)]}/>
                        </Col>

                        <Col xs={0} md={1} lg={2}  style={styles.col}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={0} md={1} lg={2}  style={styles.col}>
                        </Col>
                        <Col xs={7} md={6} lg={5} style={styles.col}>
                            <span style={{marginleft:'10px'}}>手机系统：</span>
                            <Select value={ListStore.data.client.PortData.phonetype} style={{ width: '50%' }} size="large" onChange={this.changeSystem}>
                                {computerType_select}
                            </Select>
                        </Col>
                        <Col xs={10} md={10} lg={10}  style={styles.col}>
                            <span>系统版本：</span>
                            <Select  multiple={true1} style={{ width: '60%', }} size="large" onChange={this.changeSystemVersion} value={ListStore.data.client.PortData.systemversion}>
                                {sysVersion}
                            </Select>
                        </Col>
                        <Col xs={7} md={6} lg={5}  style={styles.col}>
                            <span>网络类型：</span>
                            <Select    value={ListStore.data.client.PortData.network_type} style={{ width: '60%', }} size="large" onChange={this.changeNetType}>
                                {netType_select}
                            </Select>
                        </Col>


                        <Col xs={0} md={1} lg={2}  style={styles.col}>
                        </Col>
                    </Row>
                </div>
                </div>
            )
        }

        return (
            <div style={styles.root}>


                {choose}

            </div>
        )
    }
}
