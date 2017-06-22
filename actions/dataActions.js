/**
 * Created by ccy on 2017/3/2.
 */
import AppStore from '../stores/AppStore'
import ListStore from '../stores/ListStorettt'
import $ from 'jquery'

//var path='http://10.236.30.68:8111/'
var path='http://10.235.31.241:8111/'
//var path='http://10.236.35.47:8111/'
//var path='http://10.236.30.174:8111/'
//修改要提交给接口的数据
export function changePort(data) {
    ListStore.data.pansect.aveSumResTime.tt='none'
    //相同部分
    if( data.item == 'bussinesstype' ){ //业务名
        if(data.page=='pandect'){
            ListStore.data.pansect.PortData.subtype=data.value
        }
        if(data.page=='client'){
            ListStore.data.client.PortData.subtype=data.value
        }
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.subtype=data.value
        }
    }
    if( data.item == 'phonetype' ){ // 手机类型
        if(data.page=='pandect'){
            ListStore.data.pansect.PortData.phonetype=data.value
        }
        if(data.page=='client'){
            ListStore.data.client.PortData.phonetype=data.value
        }
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.phonetype=data.value
        }
    }
    if( data.item == 'network_type' ){ // 网络类型

        if(data.page=='pandect'){
            ListStore.data.pansect.PortData.network_type=data.value
        }
        if(data.page=='client'){
            ListStore.data.client.PortData.network_type=data.value
        }
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.network_type=data.value
        }
    }
    if( data.item == 'startdate' ){ // 开始时间
        if(data.page=='pandect'){
            ListStore.data.pansect.PortData.startdate=data.value
        }
        if(data.page=='client'){
            ListStore.data.client.PortData.startdate=data.value
        }
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.startdate=data.value
        }
    }
    if( data.item == 'enddate' ){ // 结束时间
        if(data.page=='pandect'){
            ListStore.data.pansect.PortData.enddate=data.value
        }
        if(data.page=='client'){
            ListStore.data.client.PortData.enddate=data.value
        }
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.enddate=data.value
        }
    }

    //不同部分
    if( data.item == 'appversion' ){ // 微博版本（目前只有总览页面有）
        if(data.page=='pandect'){
            ListStore.data.pansect.PortData.app_version=data.value
        }
    }
    if( data.item == 'appversion' ){ // 微博版本（目前只有总览页面有）
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.app_version=data.value
        }
    }

    if( data.item == 'granularity' ){ // 颗粒度（目前只有总览页面有）
        if(data.page=='pandect'){
            ListStore.data.pansect.PortData.granularity=data.value
        }
    }


    if( data.item == 'startappversion' ){ // 微博版本 开始（目前只有客户端页面有）
        if(data.page=='client'){
            ListStore.data.client.PortData.startappversion=data.value
        }
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.startappversion=data.value
        }
    }
    if( data.item == 'endappversion' ){ // 微博版本 结束（目前只有客户端页面有）
        if(data.page=='client'){
            ListStore.data.client.PortData.endappversion=data.value
        }
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.endappversion=data.value
        }
    }
    if( data.item == 'systemversion' ){ // 系统版本 （目前只有客户端页面有）
        if(data.page=='client'){
            ListStore.data.client.PortData.systemversion=data.value
        }
        if(data.page=='errorcount'){
            ListStore.data.errorcount.PortData.systemversion=data.value
        }
    }
    ListStore.data.pansect.flag=true
    ListStore.data.client.flag=true
    ListStore.data.errorcount.flag=true
    //AppStore.emitChange("changeport")
    ListStore.emitChange("changeport")
}

//将数组转化为key value 的形式（获取原数据时用）
function transfer(data,flag){
    let ret=[]
    if(flag==1) {
        ret.push({key: 'All', value: 'All'})
        for(let k in data){
            ret.push({key:data[k],value:data[k]})
        }
    }else if(flag==2){
        for(let k in data){
            if(data[k]=='refresh_feed'){
                ret.push({key:data[k],value:'Feed刷新'})
            }else{
                ret.push({key:data[k],value:data[k]})
            }
        }
    }else{
        for(let k in data){
            ret.push({key:data[k],value:data[k]})
        }
    }
    return ret
}

//原数据获取
export function getMetaData(){
    console.log('before')

            $.post(path + "getmetadata.php", AppStore.data.pansect.PortData,
                function (data) {
                    data = JSON.parse(data)
                    console.log('得到元数据')
                    console.log(data)
                    //业务
                    AppStore.data.business = transfer(data.subtype, 2)
                    //系统版本
                    AppStore.data.sysVersion = transfer(data.system_version, 1)
                    //微博版本
                    let appversion=data.app_version
                    var reg = new RegExp(/^\d[\d\.]+\d$/);
                   // alert(reg.test(str)); // true
                    for(let i=0;i<appversion.length;i++){
                        if(!reg.test(appversion[i])){
                            delete appversion[i]
                        }
                    }
                    AppStore.data.version = transfer(appversion, 0)
                    AppStore.data.pandectversion=transfer(appversion, 1)

                    AppStore.emitChange("getMeta")
                }
            )

    console.log('before')
}

//工具函数（转化数据成为可以放入chart中的数据）
// 输入表格数据的单元数据，和需要解析的数据，是否需要stack ,是否需要计算百分比(1：表示需要计算和之后计算百分比 )
// 输出数组 types  items min max
function generateChartData(data,type,stack,percent){
    let ret=[]
    let items=[]
    let types=[]
    let min=100
    let max=0
    for(let k=0 ;k< data.length;k++) {
        let item1
        if (stack) {
            item1 = {
                type: type,
                name: 'MAPI',
                data: [],
                barMaxWidth: 20,
                stack: 1,
            }
        }
        else {
            item1 = {
                type: type,
                name: 'MAPI',
                data: [],
                barMaxWidth: 20,
            }
        }
        item1.name = data[k].name
        if (percent == 1) {
            let partsum = 0
            for (let j = 0; j < data[k].data.length; j++) {
                if(data[k].data[j]!='null'){
                    partsum=partsum+data[k].data[j]
                }
            }
            for(let j=0;j<data[k].data.length;j++) {
                if(data[k].data[j]!='null'){
                    item1.data.push((data[k].data[j]/partsum).toFixed(2)*100)
                    if(type=='line'){
                        if(data[k].data[j]<min){
                            min=data[k].data[j]
                        }
                        if(data[k].data[j]>max){
                            max=data[k].data[j]
                        }
                    }
                }else{
                    item1.data.push('')
                }
            }

        }
        else{
            for(let j=0;j<data[k].data.length;j++) {
                if(data[k].data[j]!='null'){
                    item1.data.push(data[k].data[j].toFixed(2))
                    if(type=='line'){
                        if(data[k].data[j]<min){
                            min=data[k].data[j]
                        }
                        if(data[k].data[j]>max){
                            max=data[k].data[j]
                        }
                    }
                }else{
                    item1.data.push('')
                }
            }
        }
        items.push(item1)
        types.push(data[k].name)
    }
    ret.push(types)
    ret.push(items)
    ret.push(min)
    ret.push(max)
    return ret
}

//处理响应时间均值（增加减少的）
function handleAveResTime(data){
    let ret=[]
    let increase=[]
    let decrease=[]
    for (let i=0;i<data[0].data.length;i++){
        data[0].data[i]=data[0].data[i].toFixed(2)
        if(data[0].data[i]-data[1].data[i]>0){    //初始大，减少了
            decrease.push((data[0].data[i]-data[1].data[i]).toFixed(2))
            increase.push(0)
        }else{
            increase.push((data[1].data[i]-data[0].data[i]).toFixed(2))
            decrease.push(0)
        }
    }

    let item1={
        type:'bar',
        name: '初始',
        data:data[0].data,
        barMaxWidth: 20,
        stack:1,
    }
    ret.push(item1)
    item1={
        type:'bar',
        name: '增加',
        data:increase,
        barMaxWidth: 20,
        stack:1,
    }
    ret.push(item1)

    item1={
        type:'bar',
        name: '减少',
        data:decrease,
        barMaxWidth: 20,
        stack:1,
    }
    ret.push(item1)
return ret
}

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

function xAxisChange(value){
    let ret=[]
    for(let i=0;i<value.length;i++){
        ret.push(change(value[i]))
    }
    return ret
}

//地图处理
function getMapData(value){
    let ret1=[]
    let ret=[]
    let min=1000
    let max=0
    let item= {
        name: '耗时',
        type: 'map',
        mapType: 'china',
        coordinateSystem: 'geo',
        itemStyle:{
        normal:{
            label:{
                show:false,
                    textStyle:{
                    fontSize:10,
                        fontWeight:'lighter'
                },
            }
        },
        emphasis:{label:{show:true,textStyle:{
            fontSize:4
        },}}
    },
        data:[
        ]
    }
    for(let i=0;i<value.length;i++){
        item.data.push({name: value[i].province,value:value[i].data[0].toFixed(2)},)
        if(value[i].data[0].toFixed(2)<min){
            min=value[i].data[0].toFixed(2)
        }
        if(value[i].data[0]>max){
            max=value[i].data[0].toFixed(2)
        }
    }
    ret.push(item)
    /*let item1= {
        name: '成功率',
        type: 'map',
        mapType: 'china',
        coordinateSystem: 'geo',
        itemStyle:{
            normal:{
                label:{
                    show:false,
                    textStyle:{
                        fontSize:10,
                        fontWeight:'lighter'
                    },
                }
            },
            emphasis:{label:{show:true,textStyle:{
                fontSize:4
            },}}
        },
        data:[
        ]
    }
    for(let i=0;i<value.length;i++){
        item1.data.push({name: value[i].province,value:value[i].data[1].toFixed(2),visualMap: false})
        if(value[i].data[1].toFixed(2)<min){
            min=value[i].data[1].toFixed(2)
        }
        if(value[i].data[1].toFixed(2)>max){
            max=value[i].data[1].toFixed(2)
        }
    }
    ret.push(item1)
    */
    ret1.push(ret)
    ret1.push(min)
    ret1.push(max)

    return ret1

}


//总览页面
export function getPandectChart(para){

    let timestamp = Date.parse(new Date());
    let lastPara=para
    lastPara.timestamp=timestamp
    //浏览器信息
    function getBrowserInfo() {
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
    console.log('请求的参数')
    console.log(lastPara)
    //***********************************请求四个panel段的数据
    $.post(path+"general/info.php?",lastPara,
        function(data,status) {
            console.log('获得的纵览数据')
            ListStore.data.pansect.flag=false
            console.log(data)
            try{
                data=JSON.parse(data)
            }catch(error){
                data={"avarage":
                        {
                            "fulllink": {"hits":0,"averagetime":0,"successrate":false},
                            "client":{"averagetime":0,"successrate":false},
                            "mapi":{"averagetime":0,"successrate":false},
                            "platform":{"averagetime":0,"successrate":false}
                        },
                    "general":
                        {
                            "dataarr":[],
                            "linedata":[{"name":"\u5ba2\u6237\u7aef","data":[]},{"name":"mapi","data":[]}]
                        },
                    "detail":[],
                    "slowspeedrate":
                        {
                            "dataarr":[],
                            "linedata":[{"name":"\u5168\u94fe\u8def","data":[]}]
                        },
                    "distribution":
                        {
                            "linedata":[{"name":"\u603b\u8017\u65f6","data":[0,0,0,0,0,0]}],
                            "dataarr":["0-1s","1-2s","2-3s","3-4s","4-5s",">5s"]
                        },
                    "successrate":
                        {
                            "dataarr":[],
                            "linedata":[{"name":"\u5168\u94fe\u8def","data":[]},{"name":"\u5ba2\u6237\u7aef","data":[]}]
                        },
                    "map":{"mapinfo":[]}
                }

            }
            console.log(data)

            let average = data.avarage

            AppStore.data.pansect.tableData_pansect = average
            AppStore.emitChange()
            //*************************************请求总的响应时间均值
            let general=data.general
            let ret=generateChartData(general.linedata,'bar',1,0)
            AppStore.data.pansect.aveSumResTime.bar.xAxisData[0].data = general.dataarr

            let result=[]
            //柱状图从上到下依次是客户端、mapi、平台
            for(let i=0;i<ret[1].length;i++){
                if(ret[1][i].name=='全链路'){
                    result.push(ret[1][i])
                }
            }

            for(let i=0;i<ret[1].length;i++){
                if(ret[1][i].name=='平台'){
                    result.push(ret[1][i])
                }
            }

            for(let i=0;i<ret[1].length;i++){

                if(ret[1][i].name=='mapi'){
                    result.push(ret[1][i])
                }
            }

            for(let i=0;i<ret[1].length;i++){
                if(ret[1][i].name=='客户端'){
                    result.push(ret[1][i])
                }
            }
            AppStore.data.pansect.aveSumResTime.bar.data=result
            let typeres=[]
            for(let i=0;i<ret[0].length;i++){
                if(ret[0][i]=='全链路'){
                    typeres.push(ret[0][i])
                }
            }
            for(let i=0;i<ret[0].length;i++){
                if(ret[0][i]=='客户端'){
                    typeres.push(ret[0][i])
                }
            }


            for(let i=0;i<ret[0].length;i++){

                if(ret[0][i]=='mapi'){
                    typeres.push(ret[0][i])
                }
            }

            for(let i=0;i<ret[0].length;i++){
                if(ret[0][i]=='平台'){
                    typeres.push(ret[0][i])
                }
            }

            AppStore.data.pansect.aveSumResTime.bar.type=typeres
            AppStore.emitChange()
            //**************************************请求响应时间均值
            //data=JSON.parse(data)
            let alldetail = data.detail
            AppStore.data.pansect.allDetail = alldetail
            let finaldata = {dataarr: [], linedata: []}
            if(alldetail[0] && alldetail[alldetail.length - 1]) {
                let firstday = alldetail[0]
                let lastday = alldetail[alldetail.length - 1]
                finaldata.dataarr=alldetail[0].clienttype
                let item = {
                    name: 'startresult',
                    data: []
                }
                for(let i=0;i<finaldata.dataarr.length;i++){
                    item.data.push(firstday.client[finaldata.dataarr[i]])
                }
                finaldata.linedata.push(item)
                let item1 = {
                    name: 'endresult',
                    data: []
                }
                for(let i=0;i<finaldata.dataarr.length;i++){
                    item1.data.push(lastday.client[finaldata.dataarr[i]])
                }
                finaldata.linedata.push(item1)
            }else{
                finaldata.dataarr = ['dl', 'lw', 'parse_time', 'rb', 'rh', 'sc', 'sr', 'ssc', 'ws']
                let item = {
                    name: 'startresult',
                    data: []
                }
                item.data.push(0)
                item.data.push(0)
                item.data.push(0)
                item.data.push(0)
                item.data.push(0)
                item.data.push(0)
                item.data.push(0)
                item.data.push(0)
                item.data.push(0)
                finaldata.linedata.push(item)
                let item1 = {
                    name: 'endresult',
                    data: []
                }
                item1.data.push(0)
                item1.data.push(0)
                item1.data.push(0)
                item1.data.push(0)
                item1.data.push(0)
                item1.data.push(0)
                item1.data.push(0)
                item1.data.push(0)
                item1.data.push(0)
                finaldata.linedata.push(item1)
            }
            let ret1 = handleAveResTime(finaldata.linedata)
            AppStore.data.pansect.aveResTime.xAxisData[0].data = xAxisChange(finaldata.dataarr)
            AppStore.data.pansect.aveResTime.data = ret1
            AppStore.data.pansect.aveResTime.type = ['初始', '增加', '减少']
            AppStore.emitChange()
            //**************************************请求慢速比
            let slowspeedrate = data.slowspeedrate
            ret1 = generateChartData(slowspeedrate.linedata, 'line', 0, 0)
            AppStore.data.pansect.rateLowSpeed.xAxisData.data = slowspeedrate.dataarr
            AppStore.data.pansect.rateLowSpeed.data = ret1[1]
            AppStore.data.pansect.rateLowSpeed.type = ret1[0]

            AppStore.data.pansect.rateLowSpeed.yAxisData.max = Math.ceil(ret1[3] + (ret1[3] - ret1[2]) / 4)
            AppStore.data.pansect.rateLowSpeed.yAxisData.min = Math.floor(ret1[2] - (ret1[3] - ret1[2]) / 4)
            AppStore.emitChange()
            //**************************************请求响应耗时分布
            let distribute = data.distribution
            ret1 = generateChartData(distribute.linedata, 'bar', 0, 0)
            AppStore.data.pansect.distriResTime.yAxisData.data = distribute.dataarr
            AppStore.data.pansect.distriResTime.data = ret1[1]
           // AppStore.data.pansect.distriResTime.type = ret1[0]
            AppStore.emitChange()

            //**************************************请求成功率
            let successrate = data.successrate
            ret1 = generateChartData(successrate.linedata, 'line', 0, 0)
            AppStore.data.pansect.successRate.xAxisData[0].data = successrate.dataarr
            AppStore.data.pansect.successRate.data = ret1[1]
             typeres = []
            for (let i = 0; i < ret1[0].length; i++) {
                if (ret1[0][i] == '全链路') {
                    typeres.push(ret1[0][i])
                }
            }
            for (let i = 0; i < ret1[0].length; i++) {
                if (ret1[0][i] == '客户端') {
                    typeres.push(ret1[0][i])
                }
            }

            for (let i = 0; i < ret1[0].length; i++) {

                if (ret1[0][i] == 'mapi') {
                    typeres.push(ret1[0][i])
                }
            }

            for (let i = 0; i < ret1[0].length; i++) {
                if (ret1[0][i] == '平台') {
                    typeres.push(ret1[0][i])
                }
            }

            AppStore.data.pansect.successRate.type = typeres
            AppStore.data.pansect.successRate.yAxisData.max = 100
            AppStore.data.pansect.successRate.yAxisData.min = Math.floor(ret1[2] - (100 - ret1[2]) / 3)
            AppStore.emitChange()



            //**************************************请求地区耗时分布
            //$.post(path+"overview/mapinfo.php",para,
            let mapdata = data.map
            ret1 = getMapData(mapdata.mapinfo)
            AppStore.data.pansect.areaDisTimeCon.data = ret1[0]
            AppStore.data.pansect.areaDisTimeCon.visualMap.min = Math.floor(ret1[1]*10)/10

            AppStore.data.pansect.areaDisTimeCon.visualMap.max = Math.ceil(ret1[2]*10)/10
            AppStore.emitChange()
            console.log('......')
        }

    )

}








