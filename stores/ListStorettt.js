/**
 * Created by Administrator on 2017/3/7.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ListStore =Object.assign({}, EventEmitter.prototype, {

    data: {
        //**********************总览******************************／
        pansect: {
            flag:true,
            aveSumResTime:{
                tt:'none',
            },
            //端口
            PortData: {
                startdate:'20170101',  //开始时间
                enddate:'20170101', //结束时间
                subtype:'refresh_feed', //业务
                granularity:'Daily',  //颗粒度
                phonetype:'All', //手机类型
                network_type:'All',  //网络类型
                app_version:   'All', //微博版本


                //systemversion:[ //系统版本
                //    'os7.2.1',
                //]
            },

        },
        client:{
            flag:true,
            //端口
            PortData: {
                startdate:'20170401',  //开始时间
                enddate:'20170515', //结束时间
                subtype:'refresh_feed', //业务
                phonetype:'All', //手机类型
                network_type:'wifi',  //网络类型
                startappversion:'7.1.0',
                endappversion:'7.4.0',
                systemversion:[ //系统版本
                    'All',
                ]
            },

        },
        errorcount:{
            flag:true,
            //端口
            PortData: {
                startdate:'20170101',  //开始时间
                enddate:'20170101', //结束时间
                subtype:'refresh_feed', //业务
                granularity:'Daily',  //颗粒度
                phonetype:'All', //手机类型
                network_type:'All',  //网络类型
                app_version:   'All', //微博版本
            },

        },

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

module.exports = ListStore;