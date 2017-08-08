define([
    'jquery',
    'underscore',
    'loglevel',
    '../../config/errors',
    '../../config/events',
    '../../config/config',
    'bootstrap-table',
    '../../../src/html/renderers/bootstrap-table.hbs',
    '../../../node_modules/bootstrap-table/dist/bootstrap-table-locale-all.min',
    '../../../node_modules/bootstrap-table/dist/extensions/multiple-sort/bootstrap-table-multiple-sort.min'

], function ($, _, log, ERR, EVT, C, bootstrapTable, bTableTemplate) {

    'use strict';
    var idj = 0;


    function BootstrapTable(o) {
        log.info("FENIX BootstrapTable");
        log.info(o);

        $.extend(true, this, C, o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            this._bindEventListeners();

            this._renderBoostrapTable();

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

        this.lang = this.lang.toUpperCase();

        this.$el = $(this.el);

        this.config = {
            data: null,
            locale : this.lang.toLowerCase()+"-"+this.lang.toUpperCase(),
            pagination: true,
            search: true,
            height: 543,
            showMultiSort: true
        }

    };

    BootstrapTable.prototype._bindEventListeners = function () {

        //amplify.subscribe(this._getEventName(EVT.SELECTOR_READY), this, this._onSelectorReady);

    };

    BootstrapTable.prototype._renderBoostrapTable = function () {

        var tab = this._createHTML(this.el, this.model);
        this.data = this._parseData(this.model);

        this.config.data = this.data;

        $(tab).bootstrapTable(this.config);

    };

    BootstrapTable.prototype._createHTML = function(content, model) {
        // Requires : id to put the table inside, the model to build the table
        var config = {
            idElem : "fx_bTable_"+idj,
            colElem : []
        };
        var self = this;
        // Does:
        // - Read DSD
        $.each(model.metadata.dsd.columns, function(id1, ob1){
            // Push them !all
            if (ob1.dataType === "year" || ob1.dataType === "number" || ob1.dataType === "text" ) {
                if (!(ob1.id.indexOf('_') >= 0)) {
                    // If we're here, we should always put there
                    config.colElem.push({
                        id: ob1.id,
                        title: ob1.title[self.lang],
                        isNumber: (ob1.dataType === "number") ? true : false
                    });
                } else {
                    // Here we should check if the text is on the right language
                    var dsd_lang = ob1.id.substring(ob1.id.indexOf('_')+1,ob1.id.size);
                    if (dsd_lang.toUpperCase() === self.lang.toUpperCase())
                        config.colElem.push({
                            id: ob1.id,
                            title: ob1.title[self.lang]
                        });
                }
            }
        });

        // - Create HTML table according to DSD
        $(content).append(bTableTemplate(config));

        idj++;
        // Returns: id element

        return '#'+config.idElem;

    };

    BootstrapTable.prototype._parseData = function (model) {
        var data = [];
        var structure = {};

        // Here we should do some finer purge, but since the btable ignores
        // when data is not conform to the structure, I guess we're fine.
        // Plus, it's 40 degrees today, I can't do much!

        $.each(model.metadata.dsd.columns, function(id1, ob1){
            structure[ob1.id] = id1;
        });

        $.each(model.data, function(id2, ob2){
            var toPush = $.extend({}, structure);
            $.each(structure, function(id3, ob3) {
                toPush[id3] = ob2[ob3];
            });
            data.push(toPush);
        });

        return data;
    };

    BootstrapTable.prototype._numberWithCommas = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    //disposition
    BootstrapTable.prototype._unbindEventListeners = function () {

    };

    BootstrapTable.prototype.dispose = function () {

        //unbind event listeners
        this._unbindEventListeners();

    };


    return BootstrapTable;
});