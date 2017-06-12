/**
 * Created by ccy on 2017/3/2.
 */
import AppStore2 from '../stores/AppStore2'
import ChooseStore from '../stores/ChooseStore'
import TimeDisStore from '../stores/TimeDisStore'
import TimeTrendStore from '../stores/TimeTrendStore'
import $ from 'jquery'

//var path='http://10.236.30.68:8111/'
//var path='http://10.235.31.20:8111/'
//var path='http://10.236.35.47:8111/'
//修改要提交给接口的数据
export function changePort(data) {
    //相同部分
    if( data.item == 'phone_plateform' ){ //手机平台
        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData.phone_plateform=data.value
        }
    }
    if( data.item == 'wb_version' ){ // 微博版本
        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData. wb_version=data.value
        }
    }
    if( data.item == 'ver_option' ){ // 版本选项

        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData.ver_option=data.value
        }

    }
    if( data.item == 'during_time' ){ // 采样时间
        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData.during_time=data.value
        }

    }
    if( data.item == 'phone_type' ){ // 手机机型
        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData.phone_type=data.value
        }
    }

    if( data.item == 'sys_version' ){ // 系统版本
        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData.sys_version=data.value
        }
    }
    if( data.item == 'granularity' ){ // 颗粒度（目前只有总览页面有）
        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData.granularity=data.value
        }
    }


    if( data.item == 'first_run' ){ // 首次启动
        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData.first_run=data.value
        }

    }
    if( data.item == 'range' ){ // 取图类型
        if(data.page=='pandect'){
            ChooseStore.data.pansect.PortData.range=data.value
        }

    }
    ChooseStore.emitChange("changeport")
}

//将数组转化为key value 的形式（获取原数据时用）
function transfer(data,flag){
    let ret=[]
    if(flag==1) {
        ret.push({key: 'all', value: 'All'})
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


//获取原数据
export function getMetaData(para){
    $.post("http://dekai.sla.weibo.cn/php/start.php?api=BnewStartTime.getselect",{during_time:para.during_time},
        function(data,status) {
            console.log('原数据')
            console.log(data)

            AppStore2.data.phoneType.iphone=transfer(data.data.mobile.iphone,1)
            AppStore2.data.phoneType.android=transfer(data.data.mobile.android,1)
            AppStore2.data.sysVersion.iphone=transfer(data.data.system.iphone,1)
            AppStore2.data.sysVersion.android=transfer(data.data.system.android,1)
            AppStore2.data.wbVersion.iphone=transfer(data.data.version.iphone,0)
            AppStore2.data.wbVersion.android=transfer(data.data.version.android,0)
            console.log(AppStore2.data)
            AppStore2.emitChange()
        }
    )
}

//总览页面
export function getPandectChart(para){

    console.log('请求的参数All');
    console.log(para);
    $.post("http://test.sla.weibo.cn/php/start.php?api=BnewStartTime.getdata",para,
        function(data,status) {
            console.log('获得的纵览数据');
            console.log(data);
            ChooseStore.data.pansect.flag=false;
            //*************************************耗时趋势
            data=data.data
            let timeConsumeTrend=data.ct
            let ret=generateChartData(timeConsumeTrend.dataArr,'line',0,0)
            TimeTrendStore.data.pansect.timeConsumeTrend.xAxisData[0].data = timeConsumeTrend.title
            TimeTrendStore.data.pansect.timeConsumeTrend.data = ret[1]
            TimeTrendStore.data.pansect.timeConsumeTrend.type = ret[0]

            //*************************************耗时趋势
            let timeConsumeDistribute=data.cd
            let timeConsumeDistributeret=generateChartData(timeConsumeDistribute.dataArr,'bar',0,0)
            TimeDisStore.data.pansect.timeConsumeDistribute.yAxisData.data = timeConsumeDistribute.title
            TimeDisStore.data.pansect.timeConsumeDistribute.data = timeConsumeDistributeret[1]
            TimeDisStore.data.pansect.timeConsumeDistribute.type = timeConsumeDistributeret[0]

            TimeTrendStore.emitChange()
            TimeDisStore.emitChange()

        }

    );

}

export function getSelectData(para){

    console.log('请求的参数part')
    if(para.which=='timeConsumeTrend') {  //如果修改的是耗时趋势
        let requestPara=ChooseStore.data.pansect.PortData
        requestPara.range='ct'
        requestPara.ctime_type=para.selected
        console.log(requestPara)
        $.post("http://test.sla.weibo.cn/php/start.php?api=BnewStartTime.getdata",requestPara,
            function(data,status) {
                console.log('获得的数据')
                console.log(data)
                let timeConsumeTrend =data.data
                let ret = generateChartData(timeConsumeTrend.dataArr, 'line', 0, 0)
                TimeTrendStore.data.pansect.timeConsumeTrend.xAxisData[0].data = timeConsumeTrend.title
                TimeTrendStore.data.pansect.timeConsumeTrend.data = ret[1]
                TimeTrendStore.data.pansect.timeConsumeTrend.type = ret[0]
                TimeTrendStore.emitChange()
            }
        )
    }else if(para.which=='timeConsumeDistribute') {
        let requestPara=ChooseStore.data.pansect.PortData
        requestPara.range='cd'
        requestPara.ctime_type=para.selected
        $.post("http://test.sla.weibo.cn/php/start.php?api=BnewStartTime.getdata",requestPara,
            function(data,status) {
                console.log('获得的数据')
                console.log(data)
                let timeConsumeDistribute =data.data
                let timeConsumeDistributeret = generateChartData(timeConsumeDistribute.dataArr, 'bar', 0, 0)
                TimeDisStore.data.pansect.timeConsumeDistribute.yAxisData.data = timeConsumeDistribute.title
                TimeDisStore.data.pansect.timeConsumeDistribute.data = timeConsumeDistributeret[1]
                TimeDisStore.data.pansect.timeConsumeDistribute.type = timeConsumeDistributeret[0]
                TimeDisStore.emitChange()
            }
        )
    }






}








