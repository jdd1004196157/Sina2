/**
 * Created by chaijiang on 2017/3/31.
 */
import React, {Component} from 'react'

import AppDispatcher from '../dispatcher/AppDispatcher'
import AppStore from '../stores/AppStore'
import Pandect from './parts/Pandect'
import Client from './parts/Client'
import ErrorCount from './parts/ErrorCount'

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

    /**************************页面加载前********************************************/
    componentWillMount(){
        AppStore.addChangeListener(this._onChange.bind(this))
        AppDispatcher.dispatch({
            action: 'GET_META',
            data: {
            }
        })
        window.addEventListener('resize', this._resize.bind(this));
    }

    /**************************页面加载前********************************************/

    componentDidMount(){
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    };
    _onChange(){
        this.setState(AppStore)
    }
    _resize(){
        AppStore.emitChange("changeport")

    }
    //*****************************导航切换函数*********************
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
                height:90,
                width:'100%',
                background:'rgba(48, 56, 65, 1)',
                color:'white',
                fontSize:30,
                padding:'20 50',
                position:'fixed',
                zIndex:'1',

            },
            nav:{
                float:'left',
                width:'12%',
                fontSize:16,
                height:'100%',
                marginTop:90,
                background:'rgba(57, 69, 88, 1)',
                //background:"-webkit-linear-gradient('rgba(57, 69, 88, 0.5)', 'rgba(57, 69, 88, 1)')",
                color:'rgba(164, 167, 174, 1)',
                position:'fixed',
            },
            navDetail1:{
                width:'100%',
                height:'60px',
                lineHeight:'60px',
                textAlign:'center',
            },
            navDetail2:{
                width:'100%',
                height:'60px',
                lineHeight:'60px',
                textAlign:'center',
                background:'rgba(75, 83, 100, 1)'
            },
            right:{
                float:'right',
                height:'auto',
                width:'86%',
                marginTop:'10%',
                marginRight:10,
            },

        }

        //*******************根据导航切换右边内容***********************************／
        let divRight= (
            <Pandect data={AppStore.data.pansect}/>
        )
        if(this.state.current==2){
            divRight=(
                <Client data={AppStore.data.client}/>
            )
        }
        if(this.state.current==3){
            divRight=(
                <div style={{width:100,height:400,background:'grey'}}>MAPI性能</div>
            )
        }
        if(this.state.current==4){
            divRight=(
                <div style={{width:100,height:400,background:'grey'}}>平台性能</div>
            )
        }
        if(this.state.current==5){
            /*divRight=(
                <div style={{width:100,height:400,background:'grey'}}>错误统计</div>
            )*/
            divRight=(
                <ErrorCount data={AppStore.data.errorcount}/>
            )
        }


        //*****样式控制*************************************／
        let t1= this.state.style1
        let t2= this.state.style2
        let t3= this.state.style3
        let t4= this.state.style4
        let t5= this.state.style5



        return (
            <div style={styles.root}>
                <div style={styles.head}><span>全链路数据分析</span></div>
                <ul style={styles.nav}>
                    <li style={styles.navDetail1}> </li>
                    <li style={styles.navDetail1}> </li>
                    <li key="1" style={styles[t1]}><a style={{color:'rgba(164, 167, 174, 1)'}}  onClick={this.handleClick1}>总览</a></li>
                    <li key="2" style={styles[t2]}><a style={{color:'rgba(164, 167, 174, 1)'}}  onClick={this.handleClick2}>客户端性能</a></li>
                    <li key="3" style={styles[t3]}><a style={{color:'rgba(164, 167, 174, 1)'}}  onClick={this.handleClick3}>MAPI性能</a></li>
                    <li key="4" style={styles[t4]}><a style={{color:'rgba(164, 167, 174, 1)'}}  onClick={this.handleClick4}>平台性能</a></li>
                    <li key="5" style={styles[t5]}><a style={{color:'rgba(164, 167, 174, 1)'}}  onClick={this.handleClick5}>错误统计</a></li>
                </ul>
                <div style={styles.right}>
                    {divRight}
                </div>
                <div style={{clear:'both'}}></div>
            </div>

        )
    }
}

