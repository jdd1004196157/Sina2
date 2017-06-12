/**
 * Created by chaijiang on 2017/5/11.
 */

/**
 * Created by chaijiang on 2017/3/31.
 */
import DashBoardDispatcher from '../../dispatcher/DashBoardDispatcher'

import React, {Component} from 'react'
import ChooseStore from '../../stores/ChooseStore'
import AppStore2 from '../../stores/AppStore2'
import { Row, Col } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import { Spin, Alert } from 'antd';

export default class PandectChoose extends Component {

    constructor(props) {
        super(props)
        this.mounted = true;
        this.state = {
            para:ChooseStore.data.pansect.PortData,
            plateform:'android'
        }
        this.changePhonePla = this.changePhonePla.bind(this)
        this.changeWbVersion = this.changeWbVersion.bind(this)
        this.phoneType = this.phoneType.bind(this)
        this.changeSystem = this.changeSystem.bind(this)
        this.changeLd = this.changeLd.bind(this)
        this.changeTime = this.changeTime.bind(this)

        this.getRecent7Days = this.getRecent7Days.bind(this)
        this.getDateStr = this.getDateStr.bind(this)
        this.disabledDate = this.disabledDate.bind(this)

        this._onChange1 = () => {
            if(this.mounted){
                this.setState(ChooseStore)
            }
        };
    }


    componentWillMount(){

        ChooseStore.addChangeListener(this._onChange1.bind(this))
        console.log('pandect will')

        //修改默认的时间
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'during_time',
                value : this.getRecent7Days()[1]+'-'+this.getRecent7Days()[0]
            }
        })

        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
            data:this.state.para
        })

    }
    componentDidMount(){

    }
    componentWillUnmount() {
        this.mounted = false;
        ChooseStore.removeChangeListener(this._onChange1);
    };

    /******************************************处理时间**********************/
    //将时间转换为字符串处理
    //输入：Date类型的数据
    //输出:一个数组 第一个为今天之前一天的日期，第二个为今天之前7天的日期
    getDateStr(value){
        let  year = value.getFullYear();
        let month = value.getMonth() + 1; // 记得当前月是要+1的
        month=month<10?('0' + month) : month;
        let dt = value.getDate()<10?('0' + value.getDate()) : value.getDate();
        let today = year + month  + dt;
        return today;
    };

    //获得最近一周的时间
    //输入：无
    //输出：[20170110,20170103]
    getRecent7Days(){
        let d = new Date();
        let d1 = new Date();
        d.setDate(d.getDate()-1);
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
    //手机平台
    changePhonePla(value){

        this.setState(
            {plateform:value}
        )
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'phone_type',
                value : 'iphone6'
            }
        })
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'phone_plateform',
                value : value
            }
        })
        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
            data:this.state.para
        })
    }
    //微博版本
    changeWbVersion(value){

        if(value.length>2){
            return;
        }
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'wb_version',
                value : value
            }
        })
        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
            data:this.state.para
        })
    }
    //版本选项
    changeVerOpt(value){
        console.log(ChooseStore.data.pansect.PortData.wb_version)
        if(ChooseStore.data.pansect.PortData.wb_version.length>1){
            return
        }
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'ver_option',
                value : value
            }
        })

        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
            data:this.state.para
        })
    }
    //手机类型
    phoneType(value){
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'phone_type',
                value : value
            }
        })
        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
            data:this.state.para
        })
    }
    //系统版本
    changeSystem(value){
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'sys_version',
                value : value
            }
        })
        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
            data:this.state.para
        })
    }
    //首次启动
    changefirstRun(value){
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'first_run',
                value : value
            }
        })
        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
            data:this.state.para
        })
    }
    //粒度
    changeLd(value){
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'granularity',
                value : value
            }
        })
        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
            data:this.state.para
        })
    }
    //时间
    changeTime(time, timeString) {
       // alert(timeString[0]==timeString[1])
        if(timeString[0]==timeString[1]){
            return
        }
        DashBoardDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                page:'pandect',
                item : 'during_time',
                value : timeString[0].replace(/\//g,'')+'-'+timeString[1].replace(/\//g,'')
            }
        })

        //获得数据
        DashBoardDispatcher.dispatch({
            action: 'GET_PANDECTCHART',
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
        function getOptions(type,plateform){
            if(plateform=='iphone'){
                const options=AppStore2.data[type].iphone.map(obj => {
                    return(
                        <Option key={obj.key}>{obj.value}</Option>
                    )
                })
                return options
            }else{
                const options=AppStore2.data[type].android.map(obj => {
                    return(
                        <Option key={obj.key}>{obj.value}</Option>
                    )
                })
                return options
            }
        }


        //读取微博版本中数据
        const version_select = getOptions("wbVersion",this.state.plateform)
        console.log(version_select)
        //读取手机机型中数据
        const phoneType = getOptions("phoneType",this.state.plateform)
        //读取系统版本中数据
        const sysVersion = getOptions("sysVersion",this.state.plateform)
        const duringtime=ChooseStore.data.pansect.PortData.during_time
        const times=duringtime.split('-')
        const dateFormat = 'YYYY/MM/DD';
        const true1=true
        let all;
       /* if(ChooseStore.data.pansect.flag){
            all=(
                <div style={{width:'98%',margin:'auto',}}>
                    <Spin tip="Loading..." style={{width:'98%'}}>
                        <div style={styles.choose}>

                            <Row >
                                <Col xs={8} md={5} lg={5}  style={styles.col}>
                                    <span>手机平台：</span>
                                    <Select  style={{ width: '65%'}} size="large" onChange={this.changeBusiness}  value={ChooseStore.data.pansect.PortData.subtype}>
                                        <Option value="android">Android</Option>
                                        <Option value="iphone">iPhone</Option>
                                    </Select>
                                </Col>
                                <Col  xs={8} md={9} lg={9} style={styles.col}>
                                    <span>微博版本：</span>
                                    <Select   style={{ width: '60%',}} size="large" onChange={this.changeWbVersion}  value={ChooseStore.data.pansect.PortData.app_version}>
                                        {version_select}
                                    </Select>
                                </Col>

                                <Col  xs={8} md={5} lg={5} style={styles.col}>
                                    <span>版本选项：</span>
                                    <Select style={{ width: '60%', }} size="large" onChange={this.changeNetType} value={ChooseStore.data.pansect.PortData.network_type}>
                                        <Option value="n">仅当前版本</Option>
                                        <Option value="b">当前版本之前</Option>
                                        <Option value="a">当前版本之后</Option>
                                    </Select>
                                </Col>
                                <Col xs={7} md={5} lg={5}  style={styles.col}>
                                    <span>时间粒度：</span>
                                    <Select  style={{ width: '50%' }} size="large" onChange={this.changeLd} value={ChooseStore.data.pansect.PortData.granularity}>
                                        <Option value="d">天</Option>
                                        <Option value="w">周</Option>
                                        <Option value="m">月</Option>
                                    </Select>
                                </Col>


                            </Row>
                            <Row>
                                <Col xs={7} md={8} lg={5} style={styles.col}>
                                    <span>手机机型：</span>
                                    <Select style={{ width: '60%' }} size="large" onChange={this.changeSystem} value={ChooseStore.data.pansect.PortData.phonetype}>
                                        {phoneType}
                                    </Select>
                                </Col>
                                <Col xs={7} md={8} lg={5} style={styles.col}>
                                    <span>系统版本：</span>
                                    <Select style={{ width: '60%' }} size="large" onChange={this.changeSystem} value={ChooseStore.data.pansect.PortData.phonetype}>
                                        {sysVersion}
                                    </Select>
                                </Col>
                                <Col xs={7} md={8} lg={5} style={styles.col}>
                                    <span>首次启动：</span>
                                    <Select style={{ width: '60%' }} size="large" onChange={this.changeSystem} value={ChooseStore.data.pansect.PortData.phonetype}>
                                        <Option value="y">是</Option>
                                        <Option value="n">否</Option>
                                    </Select>
                                </Col>
                                <Col xs={10} md={9} lg={9}  style={styles.col}>
                                    <span>采样时间：</span>
                                    <RangePicker style={{width: '80%' }} defaultValue={[moment(this.getRecent7Days()[1], dateFormat), moment(this.getRecent7Days()[0], dateFormat)]}
                                                 disabledDate={this.disabledDate()} format={dateFormat}
                                                 size="large"  onChange={this.changeTime}
                                                 value={[moment(ChooseStore.data.pansect.PortData.startdate, dateFormat), moment(ChooseStore.data.pansect.PortData.enddate, dateFormat)]}/>
                                </Col>

                            </Row>

                        </div>
                    </Spin>
                </div>

            )
        }else{*/
            all=(
                <div style={{width:'98%',margin:'auto',}}>
                    <div style={styles.choose}>
                        <Row >
                            <Col xs={8} md={5} lg={5}  style={styles.col}>
                                <span>手机平台：</span>
                                <Select  style={{ width: '65%'}} size="large" onChange={this.changePhonePla}  value={ChooseStore.data.pansect.PortData.phone_plateform}>
                                    <Option value="android">Android</Option>
                                    <Option value="iphone">iPhone</Option>
                                </Select>
                            </Col>
                            <Col  xs={8} md={9} lg={9} style={styles.col}>
                                <span>微博版本：</span>
                                <Select multiple={true1}  style={{ width: '60%',}} size="large" onChange={this.changeWbVersion}  value={ChooseStore.data.pansect.PortData.wb_version}>
                                    {version_select}
                                </Select>
                            </Col>

                            <Col  xs={8} md={5} lg={5} style={styles.col}>
                                <span>版本选项：</span>
                                <Select style={{ width: '60%', }} size="large" onChange={this.changeVerOpt} value={ChooseStore.data.pansect.PortData.ver_option	}>
                                    <Option value="n">仅当前版本</Option>
                                    <Option value="b">当前版本之前</Option>
                                    <Option value="a">当前版本之后</Option>
                                </Select>
                            </Col>
                            <Col xs={7} md={5} lg={5}  style={styles.col}>
                                <span>时间粒度：</span>
                                <Select  style={{ width: '50%' }} size="large" onChange={this.changeLd} value={ChooseStore.data.pansect.PortData.granularity}>
                                    <Option value="d">天</Option>
                                    <Option value="w">周</Option>
                                    <Option value="m">月</Option>
                                </Select>
                            </Col>


                        </Row>
                        <Row>
                            <Col xs={7} md={8} lg={5} style={styles.col}>
                                <span>手机机型：</span>
                                <Select style={{ width: '60%' }} size="large" onChange={this.phoneType} value={ChooseStore.data.pansect.PortData.phone_type}>
                                    {phoneType}
                                </Select>
                            </Col>
                            <Col xs={7} md={8} lg={5} style={styles.col}>
                                <span>系统版本：</span>
                                <Select style={{ width: '60%' }} size="large" onChange={this.changeSystem} value={ChooseStore.data.pansect.PortData.sys_version}>
                                    {sysVersion}
                                </Select>
                            </Col>
                            <Col xs={7} md={8} lg={5} style={styles.col}>
                                <span>首次启动：</span>
                                <Select style={{ width: '60%' }} size="large" onChange={this.changefirstRun} value={ChooseStore.data.pansect.PortData.first_run}>
                                    <Option value="y">是</Option>
                                    <Option value="n">否</Option>
                                </Select>
                            </Col>
                            <Col xs={10} md={9} lg={9}  style={styles.col}>
                                <span>采样时间：</span>
                                <RangePicker style={{width: '80%' }}
                                             disabledDate={this.disabledDate()} format={dateFormat}
                                             size="large"  onChange={this.changeTime}
                                             value={[moment(times[0], dateFormat), moment(times[1], dateFormat)]}/>
                            </Col>

                        </Row>


                    </div>
                </div>
            )
        //}

        return (

            <div style={styles.root}>
                {all}
            </div>
        )
    }
}