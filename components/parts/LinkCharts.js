/**
 * Created by chaijiang on 2017/3/31.
 */

import React, {Component} from 'react'
import $ from 'jquery'
import '../../node_modules/echarts/map/js/china';
import AppStore from '../../stores/AppStore'
import AppDispatcher from '../../dispatcher/AppDispatcher'
export default class Charts extends Component {

    constructor(props) {
        super(props)

        let ttdata=[
            {
                name:'本地等待',
                value:100
            },
            {
                name:'DNS查询',
                value:20
            },
            {
                name:'tcp连接',
                value:45
            }
        ]
        this.state = {
            pieData:{
                type:'pie',
                radius:[0,'40%'],
                data:ttdata,
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                        },
                        labelLine :{show:true}
                    },
                }
            }
        }
        //控制饼状图初次显示最后一天的细节
        this.flag=true

        this.initLine = this.initLine.bind(this)
        this.pieClick = this.pieClick.bind(this)
    }
    componentWillMount(){


    }

    componentDidMount() {
        this.initLine()
    }
    componentDidUpdate(){
        this.initLine()
    }

    pieClick(params){

        //将ls这些转化
        function change(value){
            if(value=='lw')
                return '本地等待'
            if(value=='dl')
                return 'DNS查询'
            if(value=='sc')
                return 'tcp链接'
            if(value=='ssc')
                return 'ssl握手'
            if(value=='sr')
                return '发送上行'
            if(value=='ws')
                return '服务器响应'
            if(value=='rh')
                return '解析header'
            if(value=='rb')
                return '解析body'
            if(value=='parse_time')
                return '渲染时间'
            if(value=='net_time')
                return '网络时间'
            if(value=='local_time')
                return '本地时间'
            if(value=='restlocaltime')
                return '本地剩余时间'
            if(value=='restnettime')
                return '网络剩余时间'
        }

        let date=params.name
        let item=params.seriesName
        let value={
            date:date,
            item:item,
        }
        let data=this.props.detail
        let resultData={

            type:'pie',
            radius:[0,'40%'],
            data:[

            ],
            itemStyle:{
                normal:{
                    label:{
                        show: true,
                        //formatter: '{b} : {c} ({d}%)'
                    },
                    labelLine :{show:true}
                },
            }


        }
        for(let i=0;i<data.length;i++){
            if(data[i].datetime==value.date){

                for(let j=0;j<data[i].clienttype.length;j++) {
                    if(data[i].client[data[i].clienttype[j]]!=0) {
                        resultData.data.push({
                            name: change(data[i].clienttype[j]),
                            value: data[i].client[data[i].clienttype[j]].toFixed(2)
                        })
                    }
                }
            }
        }
        this.flag=false
        this.setState({
            pieData:resultData,
        });

    }

    initLine(){

        let echarts = require('echarts');

        // 左边柱状图
        const barIndex = this.props.index+'bar'
        const bardom = $('#' + barIndex)
        const barData = this.props.data.bar
        bardom.css({
            width: '100%',
            height: '100%',
        })
        let myChart = echarts.init(document.getElementById(barIndex));
        myChart.setOption({
            title: {
                text: barData.title,
                textAlign:'left',
                textStyle:{
                    fontSize:17,
                    fontWeight:'bold'
                },
                top:10,
                left:20
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: barData.type,
                top: 300
            },

            toolbox: {
                show : true,
                right:20,
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }

            },
            calculable : true,
            xAxis : barData.xAxisData,
            yAxis : barData.yAxisData,
            color: barData.color,
            visualMap: barData.visualMap,
            grid: {
                left: '40px',
                right: '70px',
                bottom: '60px',
                top:'90px',
                containLabel: true,

            },
            series : barData.data,
            animation : barData.animation
        });


        // 右边饼图
        const pieIndex = this.props.index+'pie'
        const piedom = $('#' + pieIndex)

        piedom.css({
            width: '100%',
            height: '100%',
        })

        //初次进来时默认饼状图显示最后一天的细节
        if(this.flag){
            let ttdata=[]
            let alldata=this.props.detail
            function change(value){
                if(value=='lw')
                    return '本地等待'
                if(value=='dl')
                    return 'DNS查询'
                if(value=='sc')
                    return 'tcp链接'
                if(value=='ssc')
                    return 'ssl握手'
                if(value=='sr')
                    return '发送上行'
                if(value=='ws')
                    return '服务器响应'
                if(value=='rh')
                    return '解析header'
                if(value=='rb')
                    return '解析body'
                if(value=='parse_time')
                    return '渲染时间'
                if(value=='net_time')
                    return '网络时间'
                if(value=='local_time')
                    return '本地时间'
                if(value=='restlocaltime')
                    return '本地剩余时间'
                if(value=='restnettime')
                    return '网络剩余时间'
            }
            if(alldata.length>0){
                for(let j=0;j<alldata[alldata.length-1].clienttype.length;j++) {
                    if(alldata[alldata.length - 1].client[alldata[alldata.length - 1].clienttype[j]]!=0){
                        ttdata.push({
                            name: change(alldata[alldata.length - 1].clienttype[j]),
                            value: alldata[alldata.length - 1].client[alldata[alldata.length - 1].clienttype[j]].toFixed(2)
                        })
                    }
                }
            }
            let piedata1={
                    type: 'pie',
                    radius: [0, '40%'],
                    data: ttdata,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                            },
                            labelLine: {show: true}
                        },
                    }

            };
            this.state.pieData=piedata1
        }


        //点击事件
        myChart.on('click', this.pieClick);

        // 绘制饼状图
        let mypie = echarts.init(document.getElementById(pieIndex));
        mypie.setOption({
            title: {
                text: '',
                textAlign:'left',
                textStyle:{
                    fontSize:14,
                    fontWeight:'bold'
                },
                top:10,
                left:20
            },
            tooltip: {
                //show:'true',
                trigger: 'item'
            },
            label: {
                normal: {
                    position:'inside'
                },
                emphasis: {
                    position:'inside'
                }
            },
            series : this.state.pieData,
        });

        //控制每次改变接口时饼状图是最后一个日期对应的细节（必须放在后面）
        this.flag=true

    }



    render() {

        const styles = {
            root: {
                width: '100%',
                height: 'auto',
                margin: 0,
                padding: 0,
                textAlign: 'center',
            },
            bar:{
                width: '60%',
                height: 'auto',
                margin: 0,
                padding: 0,
                textAlign: 'center',
                float:'left',
            },
            pie:{
                width: '40%',
                height: 'auto',
                marginLeft: -30,
                marginTop:0,
                padding: 0,
                textAlign: 'left',
                float:'left',
                //display:this.flag,
                //display:this.state.pieDis,
                //display:this.tt,
            },


        }

        return (
            <div>
                <div style={styles.bar}>
                    <div  id={this.props.index+'bar'}>
                    </div>
                </div>
                <div style={styles.pie}>
                    <div  id={this.props.index+'pie'}>
                    </div>
                </div>
            </div>


        )
    }
}