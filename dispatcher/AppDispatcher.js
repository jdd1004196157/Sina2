/**
 * Created by sunqi on 16/5/8.
 */
import { Dispatcher } from 'flux'

import { getMetaData , changePort , getPandectChart } from '../actions/dataActions'
import { getClientChart  } from '../actions/clientAction'
import { getErrorChart  } from '../actions/errorAction'

const AppDispatcher = new Dispatcher()

AppDispatcher.register(function(payload) {


    let action = payload.action
    switch(action) {


        //全局操作
        //获得元数据
        case 'GET_META':
            console.log('get meta......')
            getMetaData()
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


        //客户端
        case 'GET_CLIENTCHART':
            console.log('dispatch get_chart')
            getClientChart(payload.data)
            break

        //错误统计
        case 'GET_ERRORCHART':
            console.log('dispatch get_chart')
            getErrorChart(payload.data)
            break


    }
    return true
})

export default AppDispatcher