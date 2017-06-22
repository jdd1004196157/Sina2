/**
 * Created by chaijiang on 2017/6/8.
 */


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ChooseStore =Object.assign({}, EventEmitter.prototype, {

    data: {
        //**********************总览******************************／
        pansect: {
            flag: true,
            //端口
            PortData: {
                phone_plateform: 'android',
                wb_version: ['752'],
                ver_option: 'n',
                during_time: '20170606-20170608',
                phone_type: 'all',
                sys_version: 'all',
                first_run: 'n',
                granularity: 'd',
                range: 'all'
            },

        },

        value:'snet',
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

module.exports = ChooseStore;