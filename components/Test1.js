/**
 * Created by chaijiang on 2017/3/31.
 */
import React, {Component} from 'react'

import AppDispatcher from '../dispatcher/AppDispatcher'
import AppStore from '../stores/AppStore'
import Pandect from './parts/Pandect'


import { Row, Col } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

module.exports= class Test1 extends Component {

    constructor(props) {

        super(props)

        this.state = {
            buss_options:"iphone",
        }

        this.handleChange = this.handleChange.bind(this)

    }
    /****/


    /**************************页面加载前********************************************/
    componentWillMount(){
        AppStore.addChangeListener(this._onChange.bind(this))



    }

    /**************************页面加载前********************************************/
    /***************AppStore数据改变后触发事件中回调函数的绑定******************************/
    componentDidMount(){


    }
    _onChange(){

        this.setState(AppStore)

    }

    /***************AppStore数据改变后触发事件中回调函数的绑定******************************/

    /******************************************改变端口号对应事件**********************/
    handleChange(value){  //业务名

    }

    handleClick(value){  //平台(选平台时联动改变业务名还有版本中的值)


    }


    handleTap(value){ //版本





    }

    ClickChange(value){ //颗粒度

    }

    onChange(time, timeString) {  //时间

    }

    /******************************************改变端口号对应事件**********************/


    render() {
        const styles = {
            root: {
                width: '100%',
                height: 'auto',
                minHeight: '100%',
                margin: 0,
                padding: '0',
                background: 'rgba(78, 94, 120, 1)',
                fontSize:16,
                color:'white'
            },
            choose: {
                width: '100%',
                height: 'auto',
                textAlign: 'center',
                padding: '10px 20px 10px 20px',
                fontcolor:'white',
                background:'rgba(247, 247, 247, 1)',
                color:'black'
            },
            col:{
                padding:'10px 0px'
            },
            tab:{
                width:'100%',
                height: 'auto',
                margin:'0 auto',
                padding:0,
            }


        }

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
        const version_select = getOptions("version")
        //读取网络类型中数据
        const netType_select = getOptions("netType")
        //读取机型中数据
        const computerType_select = getOptions("computerType")

        return (
            <div style={styles.root}>
                <div style={styles.choose}>
                    <Row >
                        <Col xs={8} md={8} lg={3}  style={styles.col}>
                        </Col>
                        <Col xs={8} md={8} lg={6}  style={styles.col}>
                            <span>业务线：</span>
                            <Select defaultValue="111" style={{ width: '70%'}} size="large" onChange={this.handleClick}>
                                {business_select}
                            </Select>
                        </Col>
                        <Col  xs={8} md={8} lg={6} style={styles.col}>
                            <span>微博版本：</span>
                            <Select defaultValue="7.2.0" multiple='True' style={{ width: '65%',}} size="large" onChange={this.handleChange}>
                                {version_select}
                            </Select>
                        </Col>

                        <Col  xs={8} md={8} lg={6} style={styles.col}>
                            <span>网络类型：</span>
                            <Select   defaultValue="All"  style={{ width: '70%', }} size="large" onChange={this.handleTap}>
                                {netType_select}
                            </Select>
                        </Col>
                        <Col xs={8} md={8} lg={3}  style={styles.col}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} md={8} lg={3}  style={styles.col}>
                        </Col>
                        <Col xs={8} md={4} lg={5} style={styles.col}>
                            <span>手机平台：</span>
                            <Select defaultValue="All" style={{ width: '60%' }} size="large" onChange={this.ClickChange}>
                                {computerType_select}
                            </Select>
                        </Col>

                        <Col xs={8} md={4} lg={5}  style={styles.col}>
                            <span>时间粒度：</span>
                            <Select defaultValue="d" style={{ width: '60%' }} size="large" onChange={this.ClickChange}>
                                <Option value="d">一天</Option>
                                <Option value="w">一周</Option>
                            </Select>
                        </Col>
                        <Col xs={16} md={16} lg={8}  style={styles.col}>
                            <span>时间：</span>
                            <RangePicker style={{width: '85%' }}
                                         size="large"  onChange={this.onChange}/>
                        </Col>
                        <Col xs={8} md={8} lg={3}  style={styles.col}>
                        </Col>
                    </Row>
                </div>
                <div style={styles.tab}>
                    <Tabs defaultActiveKey="1" type="card" onChange={this.onChange} style={{marginBottom:0}}>
                        <TabPane tab="总览" key="1">
                            <Pandect data={AppStore.data.pansect}/>
                        </TabPane>
                        <TabPane tab="客户端性能" key="2">2222222</TabPane>
                        <TabPane tab="MAPI性能" key="3">2222222</TabPane>
                        <TabPane tab="平台性能" key="4">2222222</TabPane>
                        <TabPane tab="错误统计" key="5">2222222</TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

