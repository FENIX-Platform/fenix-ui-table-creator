define([
    'jquery',
    'underscore',
    'loglevel',
    '../../config/errors',
    '../../config/events',
    '../../config/config',
    'fenix-ui-pivotator',
    'bootstrap-table'
], function ($, _, log, ERR, EVT, C, BTable) {

    'use strict';


    function BootstrapTable(o) {
        log.info("FENIX BootstrapTable");
        log.info(o);

        $.extend(true, this, C, o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            //this._bindEventListeners();

            //this._renderBootstrapTable(this.btableConfig);

            return this;

        } else {
            log.error("Impossible to create BootstrapTable");
            log.error(valid)
        }
    }

    // API

    /**
     * pub/sub
     * @return {Object} BootstrapTable instance
     */
    BootstrapTable.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

    BootstrapTable.prototype.update = function (config) {

        this._renderBootstrapTable(config);

    };

    BootstrapTable.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    // end API

    BootstrapTable.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        return errors.length > 0 ? errors : valid;

    };

    BootstrapTable.prototype._initVariables = function () {

        //pub/sub
        this.channels = {};

        this.btable = new BTable();

        this.lang = this.lang.toUpperCase();

        this.$el = $(this.el);

    };

    return BootstrapTable;
});