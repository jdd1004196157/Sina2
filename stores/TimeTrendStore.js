/**
 * Created by chaijiang on 2017/6/8.
 */


/**
 * Created by chaijiang on 2017/6/8.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppStore2 =Object.assign({}, EventEmitter.prototype, {

    data: {
        //**********************总览******************************／
        pansect: {

            //耗时趋势
            timeConsumeTrend: {
                title: '耗时趋势',
                type: [],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '日期',
                        type:'',
                        data:[]
                    }
                ],
                yAxisData: {
                    name: '时间（s）',
                    type:'value',
                    data:'',
                    scale:true,

                },
                nameLocation: 'end',
                nameGap: 22,
                boundaryGap: true,
                dataZoom: false,
                color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: true,
                data: [
                    {
                        type: 'line',
                        name: 'MAPI',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: '平台',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: '客户端',
                        data: [],
                        barWidth: 20
                    }
                ],
            },

            //耗时分布
            timeConsumeDistribute: {
                title: '耗时分布',
                type: [],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '百分比',
                        type:'value',
                        data:[]
                    }
                ],
                yAxisData: {
                    name: '时间分布',
                    type:'',
                    data:'',
                },
                nameLocation: 'end',
                nameGap: 22,
                boundaryGap: true,
                dataZoom: false,
                color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: true,
                data: [
                    {
                        type: 'line',
                        name: 'MAPI',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: '平台',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: '客户端',
                        data: [],
                        barWidth: 20
                    }
                ],
            },


        },


        //***********************选择框中内容***********************／
        //微博版本
        wbVersion:[
            {key:'All',value:"All"},
            {key:'7.2.0',value:"7.2.0"},
            {key:'7.3.0',value:"7.3.0"},
            {key:'7.4.0',value:"7.4.0"},
            {key:'7.5.0',value:"7.5.0"},
        ],
        //手机机型
        phoneType:[
            {key:'All',value:"All"},
            {key:'HTC',value:"HTC"},
            {key:'小米',value:"小米"},
        ],
        //系统版本
        sysVersion:[
            {key:'All',value:"All"},
            {key:'10.2.1',value:"10.2.1"},
            {key:'10.1.2',value:"10.1.2"},
            {key:'9.3.0',value:"9.3.0"},
            {key:'9.2.0',value:"9.2.0"},


        ]
        //***********************选择框中内容***********************／

    },


    // Emit Change event
    emitChange: function (value) {
        this.emit('change')
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback)
    },

    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback)
    }
})
module.exports = AppStore2;



