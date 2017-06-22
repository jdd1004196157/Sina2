var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppStore =Object.assign({}, EventEmitter.prototype, {

    data: {
        //**********************总览******************************／
        pansect: {
            flag:true,

            //端口
            PortData: {
                startdate:'20170101',  //开始时间
                enddate:'20170101', //结束时间
                bussinesstype:'Feed', //业务
                granularity:'Daily',  //颗粒度
                phonetype:'All', //手机类型
                nettype:'All',  //网络类型
                appversion:[     //微博版本
                    '7.3.0',
                ],
                //systemversion:[ //系统版本
                //    'os7.2.1',
                //]
            },

            tableData_pansect: {
                fulllink:{
                    hits:0,
                    averagetime:0,
                },
                client: {
                    averagetime:0,
                    successrate:0,
                },
                mapi: {
                    averagetime:0,
                    successrate:0,
                },
                platform: {
                    averagetime:0,
                    successrate:0,
                },
            },

            //总的响应时间均值
            aveSumResTime: {
                bar:{
                    title: '总的响应时间均值',
                    type: [],
                    tooltip:'axis',
                    yAxisData:{
                        name: '时间（s）',
                        type: 'value',
                        data:'',
                        min:0,
                        max:3,
                    },
                    nameLocation: 'end',
                    nameGap: 22,
                    xAxisData: [
                        {
                            name: '日期',
                            type: 'category',
                            data:[]
                        }
                    ],
                    boundaryGap: true,
                    dataZoom: false,
                    color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    animation: false,
                 
                    data:[
                        {
                            type:'bar',
                            name: 'MAPI',
                            data:[],
                            barMaxWidth: 20,
                            stack:1,
                        },
                        {
                            type:'bar',
                            name: '平台',
                            data:[],
                            barMaxWidth: 20,
                            stack:1,
                        },
                        {
                            type:'bar',
                            name: '客户端',
                            data:[],
                            barMaxWidth: 20,
                            stack:1,
                        }

                    ],
                },

            },


            //成功率
            successRate: {
                title: '成功率',
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
                    name: '百分比（%）',
                    type:'value',
                    data:'',
                    scale:true,
                    min:60,
                    max:100,
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

            //响应时间均值
            aveResTime: {
                title: '响应时间均值',
                type: ['初始','增加','减少'],
                tooltip:'axis',
                nameLocation: 'end',
                nameGap: 22,

                xAxisData: [
                    {
                        name: '',
                        type:'category',
                        data:[]
                    },
                ],
                yAxisData:{
                    name: '时间（ms）',
                    type: 'value',
                    data:''
                },
                boundaryGap: true,
                dataZoom: false,
                color: ['#2f4554', '#61a0a8', '#c23531','#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: false,
                data:[
                    {
                        type:'bar',
                        name: '初始',
                        data:[],
                        barMaxWidth: 20,
                        stack:1,
                    },
                    {
                        type:'bar',
                        name: '增加',
                        data:[],
                        barMaxWidth: 20,
                        stack:1,
                    },
                    {
                        type:'bar',
                        name: '减少',
                        data:[],
                        barMaxWidth: 20,
                        stack:1,
                    }
                ]
            },

            //响应耗时分布
            distriResTime: {
                title: '响应耗时分布',
                type: [],
                nameLocation: 'end',
                nameGap: 22,
                tooltip:'axis',
                xAxisData:{
                    name: '百分比',
                    type: 'value',
                    data:''
                },
                yAxisData: {
                    name:'时间分布(s)',
                    type:'category',
                    data:['0-1','1-2','2-3','3-4','4-5','>5']
                },
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: false,
                min:0,

                data:[
                    {
                        type:'bar',
                        name: '总耗时',
                        data:[],
                        barMaxWidth: 5,
                    },
                    {
                        type:'bar',
                        name: '平台耗时',
                        data:[],
                        barMaxWidth: 5,

                    },
                    {
                        type:'bar',
                        name: 'MAPI耗时',
                        data:[],
                        barMaxWidth: 5,

                    },
                    {
                        type:'bar',
                        name: '客户端耗时',
                        data:[],
                        barMaxWidth: 5,

                    },

                ]
            },

            //慢速比
            rateLowSpeed: {
                title: '慢速比(响应时间>2s)',
                type: [],
                nameLocation: 'end',
                tooltip:'axis',
                nameGap: 22,
                xAxisData:{
                    name:'日期',
                    type:'category',
                    data:[]
                },
                yAxisData:{
                    name:'百分比（%）',
                    type: 'value',
                    data:''
                },
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: false,
                min:0,
                data:[
                    {
                        type:'line',
                        name: '本地时间',
                        data:[],
                        barMaxWidth: 10,

                    },
                    {
                        type:'line',
                        name: '网络时间',
                        data:[],
                        barMaxWidth: 10,

                    }
                ]
            },

            //地区耗时分布
            areaDisTimeCon: {
                title: '地区耗时分布',
                type: [],
                nameLocation: 'end',
                nameGap: 22,
                dataZoom: false,
                color: [],
                tooltip:'item',
                tooltipset: function(params) {
                    var res = params.name+'<br/>';
                    var myseries = AppStore.data.pansect.areaDisTimeCon.data;
                    for (var i = 0; i < myseries.length; i++) {
                        for(var j=0;j<myseries[i].data.length;j++){
                            if(myseries[i].data[j].name==params.name){
                                if(i==0){
                                    res+=myseries[i].name +' : '+myseries[i].data[j].value+'s</br>';
                                }else if(i==1){
                                    res+=myseries[i].name +' : '+myseries[i].data[j].value+'%</br>';
                                }
                            }
                        }
                    }
                    return res
                }  ,
                visualMap: {
                    min:0.5,
                    max:3,
                    left: '20',
                    top: 'bottom',
                    text:['高','低'],
                    calculable : true,
                    precision:1
                },
                type: [],
                data:[
                    {
                        name: 'iphone',
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
                    },
                    {
                        name: 'iphone1',
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
                    },
                ]
            },

            //所有的细节
            allDetail:[
                {
                    datetime:20170401,
                    client: {
                        lw: 0.023,
                        dl:0,
                        sc:0,
                        ssc: 0.234,
                        sr:0,
                        ws: 0.024,
                        rh:0,
                        rb:0,
                        parse_time:0
                    },
                    clienttype:[]
                }
            ]



        },
        client:{
            flag:true,
            //端口
            PortData: {
                startdate:'20170401',  //开始时间
                enddate:'20170515', //结束时间
                bussinesstype:'Feed', //业务
                phonetype:'iPhone', //手机类型
                nettype:'wifi',  //网络类型
                startappversion:'7.3.0',
                endappversion:'7.3.0',
                systemversion:[ //系统版本
                    'os7.2.1',
                ]
            },

            //客户端细分平均耗时
            aveTime: {
                title: '客户端细分平均耗时',
                type: [],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '版本',
                        type:'',
                        data:[]
                    }
                ],
                yAxisData: {
                    name: '时间（ms）',
                    type:'value',
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
                        name: '本地等待',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: 'DNS查询',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: 'tcp连接',
                        data: [],
                        barWidth: 20
                    },
                ],
            },

            //客户端成功率
            successRate: {
                title: '客户端成功率（版本分布）',
                type: [],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '版本',
                        type:'',
                        data:[]
                    }
                ],
                yAxisData: {
                    name: '百分比（%）',
                    type:'value',
                    data:'',
                    scale:true,
                    min:70,
                    max:100,
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
                        name: '',
                        data: [],
                        barWidth: 20
                    },

                ],
                min:70,
                max:100,
            },

            //客户端耗时缩减百分比
            timeDeRate: {
                title: '客户端耗时缩减百分比（起始版本，结束版本）',
                type: [],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '版本',
                        type:'',
                        data:[]
                    }
                ],
                yAxisData: {
                    name: '百分比（%）',
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
                        type: 'bar',
                        name: '',
                        data: [],
                        barWidth: 20
                    },

                ],
                min:70,
                max:100,
            },

            //客户端耗时均值
            aveTimeConsum: {
                title: '客户端耗时均值',
                type: ['os10.2.1','os10.2.2','android7.3',],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '版本',
                        type:'',
                        data:[]
                    }
                ],
                yAxisData: {
                    name: '时间（ms）',
                    type:'value',
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
                        name: 'os10.2.1',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: 'os10.2.2',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: 'android7.3',
                        data: [],
                        barWidth: 20
                    },
                ],


            },

            //客户端耗时非链接复用均值
            aveTimeNot: {
                title: '客户端耗时非连接复用均值',
                type: ['本地等待', 'DNS查询','tcp连接',],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '版本',
                        type:'',
                        data:[]
                    }
                ],
                yAxisData: {
                    name: '时间（ms）',
                    type:'value',
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
                        name: '本地等待',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: 'DNS查询',
                        data: [],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: 'tcp连接',
                        data: [],
                        barWidth: 20
                    },
                ],


            },

            //客户端耗时链接复用占比
            timeRate: {
                title: '客户端连接复用占比',
                type: [],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '版本',
                        type:'',
                        data:[]
                    }
                ],
                yAxisData: {
                    name: '百分比（%）',
                    type:'value',
                    data:'',
                    scale:true,
                    min:0
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
                        name: '',
                        data: [],
                        barWidth: 20
                    },

                ],
                min:70,
                max:100,
            },
        },
        errorcount:{
            flag:true,
            //端口
            PortData: {
                startdate:'20170401',  //开始时间
                enddate:'20170515', //结束时间
                bussinesstype:'Feed', //业务
                phonetype:'iphone', //手机类型
                nettype:'wifi',  //网络类型
                startappversion:'7.3.0',
                endappversion:'7.3.0',
                systemversion:[ //系统版本
                    'os7.2.1',
                ]
            },

            //错误码Top10
            errorCode: {
                title: '错误码Top10',
                type: [],
                nameLocation: 'end',
                nameGap: 22,
                tooltip:'axis',
                xAxisData:{
                    name: '百分比',
                    type: 'value',
                    data:[]
                },
                yAxisData: {
                    name:'错误码分布',
                    type:'category',
                    data:['错误码1','错误码2','错误码3','错误码4']
                },
                dataZoom: false,
                color: ['#d48265','#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: false,
                min:0,

                data:[
                    {
                        type:'bar',
                        name: '总耗时',
                        data:[12,23,45,67,],
                        barMaxWidth: 15,
                    },

                ]
            },
            //网络错误码Top10
            neterrorCode: {
                title: '网络错误码Top10',
                type: [],
                nameLocation: 'end',
                nameGap: 22,
                tooltip:'axis',
                xAxisData:{
                    name: '百分比',
                    type: 'value',
                    data:''
                },
                yAxisData: {
                    name:'错误码分布',
                    type:'category',
                    data:['错误码1','错误码2','错误码3','错误码4']
                },
                dataZoom: false,
                color: [ '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: false,
                min:0,

                data:[
                    {
                        type:'bar',
                        name: '总耗时',
                        data:[12,23,45,67,],
                        barMaxWidth: 15,
                    },

                ]
            },
            //错误类型占比
            errortype: {
                title: '错误类型占比',
                type: ['错误码1','错误码2','错误码3',],
                tooltip:'axis',
                yAxisData:{
                    name: '占比（%）',
                    type: 'value',
                    data:'',

                },
                nameLocation: 'end',
                nameGap: 22,
                xAxisData: [
                    {
                        name: '日期',
                        type: 'category',
                        data:['20170102','20170202','20170202','20170202','20170202']
                    }
                ],
                boundaryGap: true,
                dataZoom: false,
                color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: false,

                data:[
                    {
                        type:'bar',
                        name: '错误码1',
                        data:[12,23,12,23,12],
                        barMaxWidth: 20,
                        stack:1,
                    },
                    {
                        type:'bar',
                        name: '错误码2',
                        data:[12,23,12,23,12],
                        barMaxWidth: 20,
                        stack:1,
                    },
                    {
                        type:'bar',
                        name: '错误码3',
                        data:[12,23,12,23,12],
                        barMaxWidth: 20,
                        stack:1,
                    }

                ],

            },
            //错误码趋势
            errortrend: {
                title: '错误码趋势',
                type: ['错误码1','错误码2','错误码3',],
                tooltip:'axis',
                xAxisData: [
                    {
                        name: '时间',
                        type:'',
                        data:['20170102','20170202','20170202','20170202','20170202']
                    }
                ],
                yAxisData: {
                    name: '次数（次）',
                    type:'value',
                    data:'',
                },
                nameLocation: 'end',
                nameGap: 22,
                boundaryGap: true,
                dataZoom: false,
                color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a', '#c4ccd4','#6e7074', '#546570'],
                animation: true,
                data: [
                    {
                        type: 'line',
                        name: '错误码1',
                        data: [12,23,34,14,23],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: '错误码2',
                        data: [12,23,34,14,23],
                        barWidth: 20
                    },
                    {
                        type: 'line',
                        name: '错误码3',
                        data: [12,23,34,14,23],
                        barWidth: 20
                    },
                ],
            },
        },

        //***********************选择框中内容***********************／
        //业务线
        business:[
            {key:'refresh_feed',value:"Feed刷新"},
        ],
        //微博版本
        version:[
            {key:'All',value:"All"},
            {key:'7.2.0',value:"7.2.0"},
            {key:'7.3.0',value:"7.3.0"},
            {key:'7.4.0',value:"7.4.0"},
            {key:'7.5.0',value:"7.5.0"},

        ],
        pandectversion:[
            {key:'All',value:"All"},
            {key:'7.2.0',value:"7.2.0"},
            {key:'7.3.0',value:"7.3.0"},
            {key:'7.4.0',value:"7.4.0"},
            {key:'7.5.0',value:"7.5.0"},
        ],
        //网络类型
        netType:[
            {key:'All',value:"All"},
            {key:'mobile',value:"2G"},
            {key:'3g',value:"3G"},
            {key:'4g',value:"4G"},
            {key:'wifi',value:"wifi"},
        ],
        //手机系统
        computerType:[
            {key:'All',value:"All"},
            {key:'iPhone',value:"iPhone"},
            {key:'Android',value:"Android"},
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
module.exports = AppStore;



