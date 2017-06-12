/**
 * Created by chaijiang on 2017/6/8.
 */
import { Dispatcher } from 'flux'

import { changePort,getPandectChart,getSelectData,getMetaData } from '../actions1/dataActions'


const DashBoardDispatcher = new Dispatcher()

DashBoardDispatcher.register(function(payload) {


    let action = payload.action
    switch(action) {
        //全局操作
        //获得元数据
        case 'GET_META':
            console.log('get meta......')
            getMetaData(payload.data)
            break
        //改变端口
        case 'CHANGE_PORT':
            console.log('dispatch changing port')
            changePort(payload.data)
            break


        //总览
        //获得总览页面数据
        case 'GET_PANDECTCHART':
            console.log('dispatch pandect get_chart')
            getPandectChart(payload.data)
            break


        //选择图表中的选择框
        case 'CHANGE_select':
            console.log('dispatch get_chart')
            getSelectData(payload.data)
            break



    }
    return true
})

export default DashBoardDispatcher