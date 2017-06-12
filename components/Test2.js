/**
 * Created by chaijiang on 2017/3/31.
 */
import React, {Component} from 'react'

import AppDispatcher from '../dispatcher/AppDispatcher'
import AppStore from '../stores/AppStore'
import Pandect from './parts/Pandect'

import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
import { Row, Col } from 'antd';
import { Button } from 'antd';


module.exports= class Main extends Component {

    constructor(props) {

        super(props)

        this.state = {
            current:'1',
            style1:'navDetail2',
            style2:'navDetail1',
            style3:'navDetail1',
            style4:'navDetail1',
            style5:'navDetail1',
        }
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
        this.handleClick3 = this.handleClick3.bind(this)
        this.handleClick4 = this.handleClick4.bind(this)
        this.handleClick5 = this.handleClick5.bind(this)
    }
    /****/


    /**************************页面加载前********************************************/
    componentWillMount(){

    }

    /**************************页面加载前********************************************/
    /***************AppStore数据改变后触发事件中回调函数的绑定******************************/
    componentDidMount(){


    }
    _onChange(){

        

    }
    handleClick1 () {
        this.setState({
            current: '1',
            style1:'navDetail2',
            style2:'navDetail1',
            style3:'navDetail1',
            style4:'navDetail1',
            style5:'navDetail1',
        });
    }
    handleClick2 () {
        this.setState({
            current: '2',
            style1:'navDetail1',
            style2:'navDetail2',
            style3:'navDetail1',
            style4:'navDetail1',
            style5:'navDetail1',
        });
    }
    handleClick3 () {
        this.setState({
            current: '3',
            style1:'navDetail1',
            style2:'navDetail1',
            style3:'navDetail2',
            style4:'navDetail1',
            style5:'navDetail1',
        });
    }
    handleClick4 () {
        this.setState({
            current: '4',
            style1:'navDetail1',
            style2:'navDetail1',
            style3:'navDetail1',
            style4:'navDetail2',
            style5:'navDetail1',
        });
    }
    handleClick5 () {
        this.setState({
            current: '5',
            style1:'navDetail1',
            style2:'navDetail1',
            style3:'navDetail1',
            style4:'navDetail1',
            style5:'navDetail2',
        });
    }

    /***************AppStore数据改变后触发事件中回调函数的绑定******************************/




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
                color:'white',
                position:'relative'
            },
            head:{
                height:'10%',
                width:'100%',
                background:'rgba(48, 56, 65, 1)',
                color:'white',
                fontSize:40,
                padding:'10 50',

            },
            nav:{
                float:'left',
                width:'14%',
                fontSize:16,
                height:400,
                background:'rgba(57, 69, 88, 1)',
                color:'rgba(164, 167, 174, 1)'
            },
            navDetail1:{
                width:'100%',
                height:'60px',
                lineHeight:'60px',
                textAlign:'center',

            },
            navDetail2:{
                width:'100%',
                height:60,
                textAlign:'center',
                background:'rgba(75, 83, 100, 1)'
            },
            right:{
                float:'right',
                height:'auto',
                width:'80%',
                marginTop:20,
                marginRight:10,
            },

        }
        let divRight= (
            <Pandect data={AppStore.data.pansect}/>
        )
        if(this.state.current==2){
            divRight=(
                <div style={{width:100,height:400,background:'white'}}></div>
            )
        }
        let t1= this.state.style1
        let t2= this.state.style2
        let t3= this.state.style3
        let t4= this.state.style4
        let t5= this.state.style5


        return (
            <div style={styles.root}>
                <div style={styles.head}><span>全链路数据分析</span></div>
                <div style={styles.nav}>
                    <div style={styles.navDetail1}> </div>
                    <div key="1" style={styles[t1]}><span style={{height:'60px',lineHeight:'60px',width:'100%',}} onClick={this.handleClick1}>总览</span></div>
                    <div key="2" style={styles[t2]}><span style={{height:'60px',lineHeight:'60px',width:'100%',}} onClick={this.handleClick2}>客户端性能</span></div>
                    <div key="3" style={styles[t3]}><span style={{height:'60px',lineHeight:'60px',width:'100%',}} onClick={this.handleClick3}>MAPI性能</span></div>
                    <div key="4" style={styles[t4]}><span style={{height:'60px',lineHeight:'60px',width:'100%',}} onClick={this.handleClick4}>平台性能</span></div>
                    <div key="5" style={styles[t5]}><span style={{height:'60px',lineHeight:'60px',width:'100%',}} onClick={this.handleClick5}>错误统计</span></div>
                </div>
                <div style={styles.right}>
                    {divRight}
                </div>
                <div style={{clear:'both'}}></div>
            </div>
        )
    }
}

