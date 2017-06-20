
/**
 * Created by chaijiang on 2017/3/31.
 */
import DashBoardDispatcher from '../../dispatcher/DashBoardDispatcher'

import React, {Component} from 'react'
import ChooseStore from '../../stores/ChooseStore'

import Charts from './Charts'
import PandectChoose from './PandectChoose'
import TimeDis from './TimeDis'
import TimeTrend from './TimeTrend'
import { Spin, Alert } from 'antd';
import { Tooltip } from 'antd';
import { Row, Col } from 'antd';

export default class Pandect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            para:ChooseStore.data.pansect.PortData,
        }
        this._onChange1 = () => {
            if(this.mounted){
                this.setState(ChooseStore)
            }
        };
    }
    componentWillMount() {
        ChooseStore.addChangeListener(this._onChange1.bind(this))
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
                color:'#000',
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
                height:150,
                background:'rgba(65, 75, 95, 0.7)',
                borderRadius: 5,
                fontSize:24,
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
                height:150,
                background:'rgba(65, 75, 95, 0.7)',
                borderRadius: 5,
                fontSize:24,
                color:'white',
                textAlign:'center',
                verticalAlign:'middle',
                display:'table-cell',
                padding:'1% 0',
                margin:'1%',
                marginRight:'0',
            },
            span:{
                height:'70px',
                lineHeight:'70px',
                margin:'auto',
                fontSize:20,
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
            p2:{
                flex:'0 0 80px',
                fontSize:'12px',
                fontWeight:'20',
                margin:'0 5px',
                width:'150px'
            },

        }
        let stotal;
        let snet;
        let tip;
        switch (this.state.para.ver_option){
            case 'n': tip='仅当前版本'; break;
            case 'b': tip='当前版本之前'; break;
            case 'a': tip='当前版本之后'; break;
            default:tip=''; break;
        }

        if(this.props.data.paneldata.dataArr.length==0){
            if(this.props.data.paneldata.title.length>1){
                stotal=(
                    <div >
                        <span style={{fontSize:'30px',fontStyle:'italic'}}>0s </span>
                        <span style={{fontStyle:'italic'}}>({this.props.data.paneldata.title[0]})    </span>
                        <span style={{fontSize:'25px'}}>   VS  </span>
                        <span style={{fontSize:'30px',fontStyle:'italic'}}>0s </span>
                        <span style={{fontStyle:'italic'}}>({this.props.data.paneldata.title[1]})</span>
                    </div>
                )
                snet=(
                    <div >
                        <span style={{fontSize:'30px',fontStyle:'italic'}}>0s </span>
                        <span style={{fontStyle:'italic'}}>({this.props.data.paneldata.title[0]})    </span>
                        <span style={{fontSize:'25px'}}>   VS  </span>
                        <span style={{fontSize:'30px',fontStyle:'italic'}}>0s </span>
                        <span style={{fontStyle:'italic'}}>({this.props.data.paneldata.title[1]})</span>
                    </div>
                )
            }else{
                stotal=(
                    <div>
                        <span style={{fontSize:'30px',color:'rgb(230,197,103)'}}>0s </span>
                        <span>({tip})</span>

                    </div>
                )
                snet=(
                    <div>
                        <span style={{fontSize:'30px',color:'rgb(230,197,103)'}}>0s </span>
                        <span>({tip})</span>

                    </div>
                )
            }
        }else{
            for(let i=0;i<this.props.data.paneldata.dataArr.length;i++){
                if(this.props.data.paneldata.dataArr[i].name=='stotal'){
                    if(this.props.data.paneldata.title.length>1){
                        stotal=(
                            <div>
                                <span style={{fontSize:'30px',fontStyle:'italic',color:'rgb(230,197,103)'}}>{this.props.data.paneldata.dataArr[i].data[0]}s </span>
                                <span style={{fontStyle:'italic'}}>({this.props.data.paneldata.title[0]})    </span>
                                <span style={{fontSize:'25px',color:'rgb(161,197,203)'}}>   VS  </span>
                                <span style={{fontSize:'30px',fontStyle:'italic',color:'rgb(230,197,103)'}}>{this.props.data.paneldata.dataArr[i].data[1]}s </span>
                                <span style={{fontStyle:'italic'}}>({this.props.data.paneldata.title[1]})</span>
                            </div>
                        )
                    }else{
                        stotal=(
                            <div>
                                <span style={{fontSize:'30px',color:'rgb(230,197,103)'}}>{this.props.data.paneldata.dataArr[i].data[0]}s </span>
                                <span>({tip})</span>

                            </div>
                        )

                    }
                }
                if(this.props.data.paneldata.dataArr[i].name=='snet'){
                    if(this.props.data.paneldata.title.length>1){
                        snet=(
                            <div>
                                <span style={{fontSize:'30px',fontStyle:'italic',color:'rgb(230,197,103)'}}>{this.props.data.paneldata.dataArr[i].data[0]}s </span>
                                <span style={{fontStyle:'italic'}}>({this.props.data.paneldata.title[0]})    </span>
                                <span style={{fontSize:'25px',color:'rgb(161,197,203)'}}>   VS  </span>
                                <span style={{fontSize:'30px',fontStyle:'italic',color:'rgb(230,197,103)'}}>{this.props.data.paneldata.dataArr[i].data[1]}s </span>
                                <span style={{fontStyle:'italic'}}>({this.props.data.paneldata.title[1]})</span>
                            </div>
                        )
                    }else{
                        snet=(
                            <div>
                                <span style={{fontSize:'30px',color:'rgb(230,197,103)'}}>{this.props.data.paneldata.dataArr[i].data[0]}s </span>
                                <span>({tip})</span>
                            </div>
                        )
                    }
                }
            }
        }


        const true1=true
        console.log('render ')

        let sum1=0;
        let app_init_cost1=0;
        let splash_cost1=0;
        let wback_cost1=0;
        let show_ad_cost1=0;
        let load_feed_cost1=0;
        let permission_cost1=0;
        let app_init_cost1_value=0;
        let splash_cost1_value=0;
        let wback_cost1_value=0;
        let show_ad_cost1_value=0;
        let load_feed_cost1_value=0;
        let permission_cost1_value='';
        let sum2=0;
        let app_init_cost2=0;
        let splash_cost2=0;
        let wback_cost2=0;
        let show_ad_cost2=0;
        let load_feed_cost2=0;
        let permission_cost2=0;
        let app_init_cost2_value=0;
        let splash_cost2_value=0;
        let wback_cost2_value=0;
        let show_ad_cost2_value=0;
        let load_feed_cost2_value=0;


        let permission_cost2_value='';
        for(let i=0;i<this.props.data.timeConsumeAverage.dataArr.length;i++){
            sum1 += this.props.data.timeConsumeAverage.dataArr[i].data[0]
            if(this.props.data.timeConsumeAverage.title.length>1){
                sum2 += this.props.data.timeConsumeAverage.dataArr[i].data[1]
            }
        }
        for(let i=0;i<this.props.data.timeConsumeAverage.dataArr.length;i++){
            if(this.props.data.timeConsumeAverage.dataArr[i].name=='app_init_cost'){
                app_init_cost1_value=this.props.data.timeConsumeAverage.dataArr[i].data[0]
                app_init_cost1=(this.props.data.timeConsumeAverage.dataArr[i].data[0]*100/sum1).toFixed(2)
                if(this.props.data.timeConsumeAverage.title.length>1) {
                    app_init_cost2_value=this.props.data.timeConsumeAverage.dataArr[i].data[1]
                    app_init_cost2 = (this.props.data.timeConsumeAverage.dataArr[i].data[1] *100/ sum2).toFixed(2)
                }
            }
            if(this.props.data.timeConsumeAverage.dataArr[i].name=='splash_cost'){
                splash_cost1_value=this.props.data.timeConsumeAverage.dataArr[i].data[0]
                splash_cost1=(this.props.data.timeConsumeAverage.dataArr[i].data[0]*100/sum1).toFixed(2)
                if(this.props.data.timeConsumeAverage.title.length>1) {
                    splash_cost2_value=this.props.data.timeConsumeAverage.dataArr[i].data[1]
                    splash_cost2 = (this.props.data.timeConsumeAverage.dataArr[i].data[1]*100 / sum2).toFixed(2)
                }
            }
            if(this.props.data.timeConsumeAverage.dataArr[i].name=='wback_cost'){
                wback_cost1_value=this.props.data.timeConsumeAverage.dataArr[i].data[0]
                wback_cost1=(this.props.data.timeConsumeAverage.dataArr[i].data[0]*100/sum1).toFixed(2)
                if(this.props.data.timeConsumeAverage.title.length>1) {
                    wback_cost2_value=this.props.data.timeConsumeAverage.dataArr[i].data[1]
                    wback_cost2 = (this.props.data.timeConsumeAverage.dataArr[i].data[1] *100/ sum2).toFixed(2)
                }
            }
            if(this.props.data.timeConsumeAverage.dataArr[i].name=='load_feed_cost'){
                load_feed_cost1_value=this.props.data.timeConsumeAverage.dataArr[i].data[0]
                load_feed_cost1=(this.props.data.timeConsumeAverage.dataArr[i].data[0]*100/sum1).toFixed(2)
                if(this.props.data.timeConsumeAverage.title.length>1) {
                    load_feed_cost2_value=this.props.data.timeConsumeAverage.dataArr[i].data[1]
                    load_feed_cost2 = (this.props.data.timeConsumeAverage.dataArr[i].data[1] *100/ sum2).toFixed(2)
                }
            }
            if(this.props.data.timeConsumeAverage.dataArr[i].name=='show_ad_cost'){
                show_ad_cost1_value=this.props.data.timeConsumeAverage.dataArr[i].data[0]
                show_ad_cost1=(this.props.data.timeConsumeAverage.dataArr[i].data[0]*100/sum1).toFixed(2)
                if(this.props.data.timeConsumeAverage.title.length>1) {
                    show_ad_cost2_value=this.props.data.timeConsumeAverage.dataArr[i].data[1]
                    show_ad_cost2 = (this.props.data.timeConsumeAverage.dataArr[i].data[1]*100 / sum2).toFixed(2)
                }
            }
            if(this.props.data.timeConsumeAverage.dataArr[i].name=='permission_cost'){
                permission_cost1_value=this.props.data.timeConsumeAverage.dataArr[i].data[0]
                permission_cost1=(this.props.data.timeConsumeAverage.dataArr[i].data[0]*100/sum1).toFixed(2)
                if(this.props.data.timeConsumeAverage.title.length>1) {
                    permission_cost2_value=this.props.data.timeConsumeAverage.dataArr[i].data[1]
                    permission_cost2 = (this.props.data.timeConsumeAverage.dataArr[i].data[1]*100 / sum2).toFixed(2)
                }
            }
        }

        let hh;

        if(this.props.data.timeConsumeAverage.title.length<2) {
            let title=this.props.data.timeConsumeAverage.title[0]
            if(title.indexOf('-')!=-1){
                title=this.props.data.timeConsumeAverage.title[0].replace('-','之前')
            }
            if(title.indexOf('+')!=-1){
                title=this.props.data.timeConsumeAverage.title[0].replace('+','之后')
            }
            hh = (
                <div style={{
                    margin: '6% 0',
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'Center',
                }}>
                    <div style={{flex: '0 0 120px',height:'30px'}}>版本：{title}
                    </div>
                    <div style={{flex: '1'}}>
                        <Tooltip title={app_init_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                             <div style={{
                                 width: app_init_cost1*0.9 + '%',
                                 height: '30px',
                                 lineHeight:'30px',
                                 background: 'rgb(108,121,137)',
                                 float: 'left',
                                 margin: '0px',
                                 color:'white',
                                 textAlign:'center',
                             }}>{app_init_cost1_value+'s'}
                            </div>

                        </Tooltip>
                        <Tooltip title={splash_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                            <div style={{
                                width: splash_cost1 *0.9+ '%',
                                height: '30px',
                                lineHeight:'30px',
                                background: 'rgb(152,197,204)',
                                float: 'left',
                                margin: '0px',
                                color:'white',
                                textAlign:'center',
                            }}>{splash_cost1_value+'s'}
                            </div>
                        </Tooltip>
                        <Tooltip title={wback_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                            <div style={{
                                width: wback_cost1*0.9 + '%',
                                height: '30px',
                                lineHeight:'30px',
                                background: 'rgb(235,197,84)',
                                float: 'left',
                                margin: '0px',
                                color:'white',
                                textAlign:'center',
                            }}>{wback_cost1_value+'s'}</div>
                        </Tooltip>
                        <Tooltip title={show_ad_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                            <div style={{
                                width: show_ad_cost1*0.9 + '%',
                                height: '30px',
                                lineHeight:'30px',
                                background: 'rgb(220,114,98)',
                                float: 'left',
                                margin: '0px',
                                color:'white',
                                textAlign:'center',
                            }}>{show_ad_cost1_value+'s'}</div>
                        </Tooltip>
                        <Tooltip title={load_feed_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                            <div style={{
                                width: load_feed_cost1*0.9 + '%',
                                height: '30px',
                                lineHeight:'30px',
                                background: 'rgb(172,191,170)',
                                float: 'left',
                                margin: '0px',
                                color:'white',
                                textAlign:'center',
                            }}>{load_feed_cost1_value+'s'}</div>
                        </Tooltip>
                        <Tooltip title={permission_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                            <div style={{
                                width: permission_cost1*0.9 + '%',
                                height: '30px',
                                lineHeight:'30px',
                                background: 'rgb(172,130,170)',
                                float: 'left',
                                margin: '0px',
                                color:'white',
                                textAlign:'center',
                            }}>{permission_cost1_value+'s'}</div>
                        </Tooltip>
                    </div>
                </div>
            )
        }
        else{
            if(sum1>sum2 && sum1!=0 && sum2!=0){
                hh = (
                    <div style={{width:'100%',margin: '6% 0',}}>
                        <div style={{
                            display: 'flex',
                            flex:'1',
                            justifyContent: 'flex-start',
                            alignItems: 'Center',
                            margin:'20px',
                        }}>
                            <div style={{flex: '0 0 100px', margin: '10px',height:'30px'}}>版本：{this.props.data.timeConsumeAverage.title[0]}
                            </div>

                                <div style={{flex: '0 0 100%'}}>
                                <Tooltip title={app_init_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: app_init_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(108,121,137)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{app_init_cost1_value+'s'}
                                    </div>

                                </Tooltip>
                                <Tooltip title={splash_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: splash_cost1 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(152,197,204)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{splash_cost1_value+'s'}
                                    </div>
                                </Tooltip>
                                <Tooltip title={wback_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: wback_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(235,197,84)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{wback_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={show_ad_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: show_ad_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(220,114,98)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{show_ad_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={load_feed_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: load_feed_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,191,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{load_feed_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={permission_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: permission_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,130,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{permission_cost1_value+'s'}</div>
                                </Tooltip>
                            </div>
                        </div>
                        <div style={{
                            flex:'1',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'Center',
                            margin:'20px',
                        }}>
                            <div style={{flex: '0 0 100px', margin: '10px',height:'30px'}}>版本：{this.props.data.timeConsumeAverage.title[1]}
                            </div>
                            <div style={{flex: '0 0 '+ sum2*100/sum1+'%'}}>

                                <Tooltip title={app_init_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: app_init_cost2 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(108,121,137)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{app_init_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={splash_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: splash_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(152,197,204)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{splash_cost2_value+'s'} </div>
                                </Tooltip>
                                <Tooltip title={wback_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: wback_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(235,197,84)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{wback_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={show_ad_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: show_ad_cost2 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(220,114,98)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{show_ad_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={load_feed_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: load_feed_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,191,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{load_feed_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={permission_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: permission_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,130,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{permission_cost2_value+'s'}</div>
                                </Tooltip>

                            </div>
                        </div>
                    </div>

                )
            }else if(sum1<sum2&& sum1!=0 && sum2!=0){
                hh = (
                    <div style={{width:'100%',margin: '6% 0',}}>
                        <div style={{
                            display: 'flex',
                            flex:'1',
                            justifyContent: 'flex-start',
                            alignItems: 'Center',
                            margin:'20px',
                        }}>
                            <div style={{flex: '0 0 100px', margin: '10px',height:'30px'}}>版本：{this.props.data.timeConsumeAverage.title[0]}
                            </div>

                                <div style={{flex: '0 0 '+ sum1*100/sum2+'%'}}>
                                <Tooltip title={app_init_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: app_init_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(108,121,137)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{app_init_cost1_value+'s'}
                                    </div>

                                </Tooltip>
                                <Tooltip title={splash_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: splash_cost1 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(152,197,204)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{splash_cost1_value+'s'}
                                    </div>
                                </Tooltip>
                                <Tooltip title={wback_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: wback_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(235,197,84)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{wback_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={show_ad_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: show_ad_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(220,114,98)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{show_ad_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={load_feed_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: load_feed_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,191,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{load_feed_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={permission_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: permission_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,130,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{permission_cost1_value+'s'}</div>
                                </Tooltip>
                            </div>
                        </div>
                        <div style={{
                            flex:'1',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'Center',
                            margin:'20px',
                        }}>
                            <div style={{flex: '0 0 100px', margin: '10px',height:'30px'}}>版本：{this.props.data.timeConsumeAverage.title[1]}
                            </div>
                            <div style={{flex: '0 0 100%'}}>
                                <Tooltip title={app_init_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: app_init_cost2 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(108,121,137)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{app_init_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={splash_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: splash_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(152,197,204)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{splash_cost2_value+'s'} </div>
                                </Tooltip>
                                <Tooltip title={wback_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: wback_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(235,197,84)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{wback_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={show_ad_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: show_ad_cost2 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(220,114,98)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{show_ad_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={load_feed_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: load_feed_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,191,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{load_feed_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={permission_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: permission_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,130,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{permission_cost2_value+'s'}</div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                )
            }else if(sum1!=0 && sum2==0){
                hh = (
                    <div style={{width:'100%',margin: '6% 0',}}>
                        <div style={{
                            display: 'flex',
                            flex:'1',
                            justifyContent: 'flex-start',
                            alignItems: 'Center',
                            margin:'20px',
                        }}>
                            <div style={{flex: '0 0 100px', margin: '10px',height:'30px'}}>版本：{this.props.data.timeConsumeAverage.title[0]}
                            </div>
                            <div style={{flex: '1'}}>

                                <Tooltip title={app_init_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: app_init_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(108,121,137)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{app_init_cost1_value+'s'}
                                    </div>

                                </Tooltip>
                                <Tooltip title={splash_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: splash_cost1 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(152,197,204)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{splash_cost1_value+'s'}
                                    </div>
                                </Tooltip>
                                <Tooltip title={wback_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: wback_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(235,197,84)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{wback_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={show_ad_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: show_ad_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(220,114,98)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{show_ad_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={load_feed_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: load_feed_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,191,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{load_feed_cost1_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={permission_cost1_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: permission_cost1*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,130,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{permission_cost1_value+'s'}</div>
                                </Tooltip>
                            </div>
                        </div>
                        <div style={{
                            flex:'1',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'Center',
                            margin:'20px',
                        }}>
                            <div style={{flex: '0 0 100px', margin: '10px',height:'30px'}}>版本：{this.props.data.timeConsumeAverage.title[1]}
                            </div>
                            <div style={{flex: '0 0 '+ sum1*100/sum2+'%'}}>

                            </div>
                        </div>
                    </div>

                )
            }else if(sum1==0 && sum2!=0){
                hh = (
                    <div style={{width:'100%',margin: '6% 0',}}>
                        <div style={{
                            display: 'flex',
                            flex:'1',
                            justifyContent: 'flex-start',
                            alignItems: 'Center',
                            margin:'20px',
                        }}>
                            <div style={{flex: '0 0 100px', margin: '10px',height:'30px'}}>版本：{this.props.data.timeConsumeAverage.title[0]}
                            </div>
                            <div style={{flex: '1'}}>


                            </div>
                        </div>
                        <div style={{
                            flex:'1',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'Center',
                            margin:'20px',
                        }}>
                            <div style={{flex: '0 0 100px', margin: '10px',height:'30px'}}>版本：{this.props.data.timeConsumeAverage.title[1]}
                            </div>
                            <div style={{flex: '0 0 '+ sum1*100/sum2+'%'}}>
                                <Tooltip title={app_init_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: app_init_cost2 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(108,121,137)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{app_init_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={splash_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: splash_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(152,197,204)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{splash_cost2_value+'s'} </div>
                                </Tooltip>
                                <Tooltip title={wback_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: wback_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(235,197,84)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{wback_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={show_ad_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: show_ad_cost2 *0.9+ '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(220,114,98)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{show_ad_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={load_feed_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: load_feed_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,191,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{load_feed_cost2_value+'s'}</div>
                                </Tooltip>
                                <Tooltip title={permission_cost2_value+'s'} placement="topLeft" arrowPointAtCenter>
                                    <div style={{
                                        width: permission_cost2*0.9 + '%',
                                        height: '30px',
                                        lineHeight:'30px',
                                        background: 'rgb(172,130,170)',
                                        float: 'left',
                                        margin: '0px',
                                        color:'white',
                                        textAlign:'center',
                                    }}>{permission_cost2_value+'s'}</div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                )
            }
        }
        let tuli
        if(this.state.para.phone_plateform=='android') {
            tuli = (
                <Row>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(108,121,137)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>初始化应用</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(152,197,204)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>Splash展示</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(235,197,84)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>欢迎回来页</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(220,114,98)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>广告耗时</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(172,191,170)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>加载feed</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <span style={{
                                height: '20px',
                                background: 'rgb(172,130,170)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></span>
                            <span style={styles.p2}>用户授权</span>
                        </div>
                    </Col>
                </Row>
            )
        }
        else{
            tuli = (
                <Row>
                    <Col xs={0} md={2} lg={2}>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(108,121,137)',
                                flex: '0 0 20%',
                                borderRadius:  '5px'
                            }}></div>
                            <div style={styles.p2}>初始化应用</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(152,197,204)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>Splash展示</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(235,197,84)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>欢迎回来页</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(220,114,98)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>广告耗时</div>
                        </div>
                    </Col>
                    <Col xs={8} md={4} lg={4}>
                        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            <div style={{
                                height: '20px',
                                background: 'rgb(172,191,170)',
                                flex: '0 0 20%',
                                borderRadius: '5px'
                            }}></div>
                            <div style={styles.p2}>加载feed</div>
                        </div>
                    </Col>
                    <Col xs={8} md={2} lg={2}>
                    </Col>
                </Row>
            )
        }
        return (

            <div style={styles.root}>

                <PandectChoose/>
                <div style={{height:10}}></div>

                <div style={styles.show}>
                    <div style={styles.card2} >
                        <div style={styles.span}>启动总耗时</div>
                        {stotal}
                    </div>
                    <div style={styles.card3} >
                        <div style={styles.span}>启动净耗时</div>
                        {snet}
                    </div>

                </div>

                <div style={{clear:'both'}}></div>


                <div style={styles.chart}>
                    <div style={{fontSize:'18px',fontWeight:'1',margin:'5px',padding:'10px',}}>
                        <div style={{float:'left'}}><span>各环节耗时均值</span></div>

                    </div>
                    <div style={{width:'90%',height:'60%',margin:'30 auto',display: 'flex', justifyContent:'flex-start', alignItems:'Center', }}>
                        {hh}
                    </div>
                    <div style={{width:'60%',display: 'flex', justifyContent:'flex-start', alignItems:'center',margin:'0 auto'}}>
                        {tuli}
                    </div>

                </div>

                <div style={{clear:'both'}}></div>
                <TimeTrend/>
                <TimeDis/>


            </div>
        )
    }
}