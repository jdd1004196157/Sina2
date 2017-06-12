/**
 * Created by chaijiang on 2017/4/13.
 */

import AppStore from '../stores/AppStore'
import ListStore from '../stores/ListStorettt'


import $ from 'jquery'

var path='http://10.235.31.20:8111/'
//var path='http://10.236.32.159:8111/'

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
// 输入表格数据的单元数据，和需要解析的数据，是否需要stack,是否需要把数据颠倒（1表示需要 0表示不需要）
// 输出数组 types  items min max
function generateChartData(data,type,stack,reverse,show){
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
                stack:1,
            }
        }else{
            if(show==1){
                item1={
                    type:type,
                    name: 'MAPI',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{c}%'
                        }
                    },
                    data:[],
                    barMaxWidth: 20,
                }
            }else{
                item1={
                    type:type,
                    name: 'MAPI',
                    data:[],
                    barMaxWidth: 20,
                }
            }
        }
        item1.name=change(data[k].name)
        if(reverse==1){
            for (let j = data[k].data.length-1; j >=0 ; j--) {
                if (data[k].data[j] != 'null') {
                    console.log(data[k].data[j])
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


export function getErrorChart(para) {
    console.log('请求的参数')
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
    $.post(path + "error/info.php", lastPara,
        function (data) {
            ListStore.data.errorcount.flag=false
            console.log("错误统计获得的数据")
            /*let data={
                  result_code_top:{dataarr:[-100,-200,-50,404],
                                    linedata: [{name:"xxx",data:[50,83.12,8.31,6.12]}]
                                    },
                net_error_top:{dataarr:[-100,-200,-50,404],
                    linedata: [{name:"xxx",data:[50,83.12,8.31,6.12]}]
                },
                result_code_count:{dataarr:['20170601','20170602','20170603','20170604'],
                        linedata: [{name:"net_error",data:[50,8312,831,612]},
                                    {name:"local_error", data:[50,8312,831,612]}],},
                errortrendresult:{dataarr:['20170601','20170602','20170603','20170604'],
                    linedata: [{name:"net_error",data:[50,8312,831,612]},
                        {name:"local_error", data:[50,8312,831,612]}],},
                error_sum:{result_code_num:20000,net_error_num:28000},
}*/

           /* try{
                data = JSON.parse(data)
            }catch(error) {
                data={

                }
            }*/
            data = JSON.parse(data)
            console.log(data)
            //错误码Top10
            let errorCode=data.result_code_top
            let errorCoderesult=generateChartData(errorCode.linedata,'bar',0,1,1)
            let yaxis=errorCode.dataarr
            AppStore.data.errorcount.errorCode.yAxisData.data=yaxis.reverse()
            AppStore.data.errorcount.errorCode.data=errorCoderesult[1]
            AppStore.data.errorcount.errorCode.title='错误码Top10 （总数: '+data.error_sum.result_code_num+'）'
            AppStore.emitChange()

            //网络错误码Top10
            let neterrorCode=data.net_error_top
            let neterrorCoderesult=generateChartData(neterrorCode.linedata,'bar',0,1,1)
            let y=neterrorCode.dataarr
            AppStore.data.errorcount.neterrorCode.yAxisData.data=y.reverse()
            AppStore.data.errorcount.neterrorCode.data=neterrorCoderesult[1]
            AppStore.data.errorcount.neterrorCode.title='网络错误码Top10 （总数: '+data.error_sum.net_error_num+'）'
            AppStore.emitChange()

            //错误类型占比
            let errortype=data.result_code_count
            let errortyperesult=generateChartData(errortype.linedata,'bar',1,0,0)
            AppStore.data.errorcount.errortype.xAxisData[0].data=errortype.dataarr
            AppStore.data.errorcount.errortype.data=errortyperesult[1]
            AppStore.data.errorcount.errortype.type=errortyperesult[0]
            AppStore.emitChange()

            //错误码趋势
            let errortrend=data.result_code_trend
            /*let errortrend={dataarr:['20170601','20170602','20170603','20170604'],
                linedata: [{name:12,data:[50,8312,831,612]},
                {name:14, data:[50,8312,831,612]}],}*/
            let errortrendresult=generateChartData(errortrend.linedata,'line',0,0,0)
            AppStore.data.errorcount.errortrend.xAxisData[0].data=errortrend.dataarr
            AppStore.data.errorcount.errortrend.data=errortrendresult[1]
            AppStore.data.errorcount.errortrend.type=errortrendresult[0]
            AppStore.emitChange()
        }
    )
}
