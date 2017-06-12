
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

export default class Pandect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            para:ChooseStore.data.pansect.PortData,
        }

    }
    componentWillMount() {

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
        let stotal=''
        let snet=''
        for(let i=0;i<this.props.data.paneldata.dataArr.length;i++){
            if(this.props.data.paneldata.dataArr[i].name=='stotal'){
                if(this.props.data.paneldata.title.length>1){
                    stotal=this.props.data.paneldata.dataArr[i].data[0]+'s ('+this.props.data.paneldata.title[0]+')  VS  '+this.props.data.paneldata.dataArr[i].data[1]+'s ('+this.props.data.paneldata.title[0]+')'
                }else{
                    stotal=this.props.data.paneldata.dataArr[i][0]+'s(All)'
                }
            }
            if(this.props.data.paneldata.dataArr[i].name=='snet'){
                if(this.props.data.paneldata.title.length>1){
                    snet=this.props.data.paneldata.dataArr[i].data[0]+'s ('+this.props.data.paneldata.title[0]+')  VS  '+this.props.data.paneldata.dataArr[i].data[1]+'s ('+this.props.data.paneldata.title[0]+')'
                }else{
                    snet=this.props.data.paneldata.dataArr[i][0]+'s(All)'
                }
            }
        }


        const true1=true
        console.log('render ')
        let hh=(
            <div>
                <div style={{width:'10%',height:'20%',background:'rgb(108,121,137)',float:'left',margin:'2px'}}></div>
                <div style={{width:'8%',height:'20%',background:'rgb(152,197,204)',float:'left',margin:'2px'}}></div>
                <div style={{width:'23%',height:'20%',background:'rgb(235,197,84)',float:'left',margin:'2px'}}></div>
                <div style={{width:'11%',height:'20%',background:'rgb(220,114,98)',float:'left',margin:'2px'}}></div>
                <div style={{width:'11%',height:'20%',background:'rgb(172,191,170)',float:'left',margin:'2px'}}></div>
            </div>
        )
        return (

            <div style={styles.root}>

                <PandectChoose/>
                <div style={{height:10}}></div>

                <div style={styles.show}>
                    <div style={styles.card2} >
                        <div style={styles.span}>启动总耗时</div>
                        <div style={styles.span}>{stotal}</div>
                    </div>
                    <div style={styles.card3} >
                        <div style={styles.span}>启动净耗时:</div>
                        <div style={styles.span}>{snet}</div>
                    </div>

                </div>

                <div style={{clear:'both'}}></div>


                <div style={styles.chart}>
                    <div>各环节耗时均值</div>
                    <div style={{width:'80%',height:'60%',background:'#ff0',margin:'0 auto',verticalAlign:'middle'}}>
                        {hh}
                    </div>

                </div>

                <div style={{clear:'both'}}></div>
                <TimeTrend/>
               <TimeDis/>


            </div>
        )
    }
}