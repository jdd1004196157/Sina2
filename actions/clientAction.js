/**
 * Created by chaijiang on 2017/4/13.
 */

import AppStore from '../stores/AppStore'
import ListStore from '../stores/ListStorettt'


import $ from 'jquery'

var path='http://10.235.31.20:8111/'
//var path='http://10.236.31.67:8111/'
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
    return value
}

//工具函数（转化数据成为可以放入chart中的数据）
// 输入表格数据的单元数据，和需要解析的数据，是否需要stack,是否需要乘以100（1表示需要 0表示不需要）
// 输出数组 types  items min max
function generateChartData(data,type,stack,percent){
    let ret=[]
    let items=[]
    let types=[]
    let min=100
    let max=0
    for(let k=0 ;k< data.length;k++){
        let item1
        if(stack){
            item1={
                type:type,
                name: 'MAPI',
                data:[],
                barMaxWidth: 20,
                //stack:1,
            }
        }else{
            item1={
                type:type,
                name: 'MAPI',
                data:[],
                barMaxWidth: 20,
            }
        }
        item1.name=change(data[k].name)
        if(percent=='1'){
            for (let j = 0; j < data[k].data.length; j++) {
                if (data[k].data[j] != 'null') {
                    item1.data.push(data[k].data[j]*100)
                    if (type == 'line') {
                        if (data[k].data[j]*100 < min) {
                            min = data[k].data[j]*100
                        }
                        if (data[k].data[j]*100 > max) {
                            max = data[k].data[j]*100
                        }
                    }
                } else {
                    item1.data.push('')
                }
            }
        }
        else {
            for (let j = 0; j < data[k].data.length; j++) {
                if (data[k].data[j] != 'null') {
                    item1.data.push(data[k].data[j].toFixed(2))
                    if (type == 'line') {
                        if (data[k].data[j].toFixed(2)< min) {
                            min = data[k].data[j].toFixed(2)
                        }
                        if (data[k].data[j].toFixed(2) > max) {
                            max = data[k].data[j].toFixed(2)
                        }
                    }
                } else {
                    item1.data.push('')
                }
            }
        }
        items.push(item1)
        types.push(change(data[k].name))
    }
    ret.push(types)
    ret.push(items)
    ret.push(min)
    ret.push(max)
    return ret
}

function getInDeRate(value){

    let item1={
        type:'bar',
        name: '',
        data:[],
        barWidth: 20,
    }
    for(let i=0;i<value[0].data.length;i++){
        if(value[0].data[i]>3) {
            item1.data.push(((value[1].data[i] - value[0].data[i]) / value[0].data[i]).toFixed(2))
        }else{
            item1.data.push(0.00)
        }
    }
    return item1


}

export function getClientChart(para) {
    console.log('请求的参数')
    console.log(para)
    let timestamp = Date.parse(new Date());
    let lastPara=para
    lastPara.timestamp=timestamp
    function getBrowserInfo()
    {
        var agent = navigator.userAgent.toLowerCase() ;
        var regStr_ie = /msie [\d.]+;/gi ;
        var regStr_ff = /firefox\/[\d.]+/gi
        var regStr_chrome = /chrome\/[\d.]+/gi ;
        var regStr_saf = /safari\/[\d.]+/gi ;
        if(agent.indexOf("msie") > 0)
        {
            return agent.match(regStr_ie) ;
        }
        if(agent.indexOf("firefox") > 0)
        {
            return agent.match(regStr_ff) ;
        }
        if(agent.indexOf("chrome") > 0)
        {
            return agent.match(regStr_chrome) ;
        }
        if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
        {
            return agent.match(regStr_saf) ;
        }
    }
    var browser = getBrowserInfo() ;
    var verinfo = (browser+"").replace(/[^0-9.]/ig,"");
    lastPara.browserinfo=browser
    console.log(lastPara)
    //客户端细分平均耗时
    $.post(path + "client/info.php", lastPara,
        function (data) {
            ListStore.data.client.flag=false
            console.log("客户端获得的数据")
            console.log(data)
            try{
                data = JSON.parse(data)
            }catch(error) {
                data={reconnectrate:{
                            linedata:[{name:'',data:[]}],
                            versionarr:[]
                        },
                    responseTime_general:{
                        linedata:[{name:'',data:[]}],
                        versionarr:[]
                    },
                    responseTime_withoutreconnect:{
                        linedata:[{name:'',data:[]}],
                        versionarr:[]
                    },
                    successrate:{
                        linedata:[{name:'',data:[]}],
                        versionarr:[]
                    },
                    systemversion:{
                        linedata:[{name:'',data:[]}],
                        versionarr:[]
                    },

                }
            }
            console.log(data)
            let aveTime = data.responseTime_general
            let ret = generateChartData(aveTime.linedata, 'line', '0', '0')
            AppStore.data.client.aveTime.data = ret[1]
            AppStore.data.client.aveTime.xAxisData[0].data = aveTime.versionarr
            AppStore.data.client.aveTime.type = ret[0]

            //非链接复用均值
            let aveTimeNot = data.responseTime_withoutreconnect
            ret = generateChartData(aveTimeNot.linedata, 'line', '0', '0')
            AppStore.data.client.aveTimeNot.data = ret[1]
            AppStore.data.client.aveTimeNot.xAxisData[0].data = aveTimeNot.versionarr
            AppStore.data.client.aveTimeNot.type = ret[0]

            //成功率
            let successRate = data.successrate
            ret = generateChartData(successRate.linedata, 'line', '0', '0')
            AppStore.data.client.successRate.data = ret[1]
            AppStore.data.client.successRate.xAxisData[0].data = successRate.versionarr
            AppStore.data.client.successRate.type = ret[0]
            AppStore.data.client.successRate.yAxisData.max = 100
            AppStore.data.client.successRate.yAxisData.min = Math.floor(ret[2] - (100 - ret[2]) / 3)

            //客户链接复用占比
            let timeRate = data.reconnectrate
            ret = generateChartData(timeRate.linedata, 'line', '0', '0')
            AppStore.data.client.timeRate.data = ret[1]
            AppStore.data.client.timeRate.xAxisData[0].data = timeRate.versionarr
            AppStore.data.client.timeRate.type = ''

            //缩减百分比
            let timeDeRate = data.responseTime_general
            let InDeRate={versionarr:[],linedata:[]}
            //InDeRate.versionarr=['dl','lw','parse_time','rb','rh','sc','sr','ssc','ws']
            let startitem={
                name:'startresult',
                data:[]
            }
            let enditem={
                name:'endresult',
                data:[]
            }
            for(let i=0;i<timeDeRate.linedata.length;i++){
                InDeRate.versionarr.push(timeDeRate.linedata[i].name)
                startitem.data.push(timeDeRate.linedata[i].data[0])
                enditem.data.push(timeDeRate.linedata[i].data[timeDeRate.linedata[i].data.length-1])
            }
            InDeRate.linedata.push(startitem)
            InDeRate.linedata.push(enditem)
            ret = getInDeRate(InDeRate.linedata)


            AppStore.data.client.timeDeRate.data = ret
            AppStore.data.client.timeDeRate.xAxisData[0].data = []
            for (let i = 0; i < InDeRate.versionarr.length; i++) {
                AppStore.data.client.timeDeRate.xAxisData[0].data.push(change(InDeRate.versionarr[i]))
            }


            //客户端耗时均值
            let aveTimeConsum = data.systemversion
            ret = generateChartData(aveTimeConsum.linedata, 'line', '0', '0')
            AppStore.data.client.aveTimeConsum.data = ret[1]
            AppStore.data.client.aveTimeConsum.xAxisData[0].data = aveTimeConsum.versionarr
            AppStore.data.client.aveTimeConsum.type = ret[0]
            AppStore.emitChange()

        }
    )
}
