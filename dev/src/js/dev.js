/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    '../../../src/js/index',
    'fenix-ui-filter',
    'fenix-ui-pivotator-utils',
    'dev/src/models/UNECA_Education.json',
    'dev/src/models/all',
    'dev/src/models/filter-interaction',
    'dev/src/models/i18n',
    'bootstrap-table',
    '../../../src/html/renderers/bootstrap-table.hbs',
    '../../../node_modules/bootstrap-table/dist/bootstrap-table-locale-all.min',
    '../../../node_modules/bootstrap-table/dist/extensions/multiple-sort/bootstrap-table-multiple-sort.min'
], function (log, $, _, OlapCreator, Filter, FenixTool, Model, AllModel, FilterModel, i18nModel, bootstrapTable, bTableTemplate) {

    'use strict';

    var idj = 0;

    var s = {
        CONFIGURATION_EXPORT: "#configuration-export",
        FILTER_INTERACTION: "#filter-interaction",
        OLAP_INTERACTION: "#olap-interaction"
    };

    function Dev() {

        console.clear();

        this._importThirdPartyCss();

        // silent - trace

        log.setLevel('trace');

        this.fenixTool = new FenixTool();
        this.start();
    }

    Dev.prototype.start = function () {
        log.trace("Test started");
        //this._testFilterInteraction();
        this._testBoostrapTable();
    };

    Dev.prototype._testFilterInteraction = function () {

        //create filter configuration
        var itemsFromFenixTool = this.fenixTool.toFilter(i18nModel);
        //FilterModel contains static filter selectors, e.g. show code, show unit
        var items = $.extend(true, {}, FilterModel, itemsFromFenixTool);

        log.trace("Filter configuration from FenixTool", items);

        this.filter = new Filter({
            el: s.FILTER_INTERACTION,
            selectors: items
        });

        this.filter.on("ready", _.bind(function () {

            var config = this._getOlapConfigFromFilter();

            config = $.extend(true, {}, {
                    model: i18nModel,
                    el: "#olap-interaction",
                    lang : "EN"
                }, config
                //,derived
            );

            log.trace("Init Olap");
            log.trace(config);

            for (var d in config.derived) {
                config.aggregations.push(d);
            }

            this.olap = new OlapCreator(config);

        }, this));

        this.filter.on("change", _.bind(function () {

            var config = this._getOlapConfigFromFilter();

            log.trace("Update chart");
            log.trace(config);
            //console.log("config2",config)
            this.olap.update(config);
        }, this));

    };

    Dev.prototype._getOlapConfigFromFilter = function () {
        var values = this.filter.getValues();
        //console.log("_getOlapConfigFromFilter",values)
        var config = this.fenixTool.toTableConfig(values);

        this._printOlapConfiguration(config);

        return config;

    };

    Dev.prototype._printOlapConfiguration = function () {

        var values = this.filter.getValues(),
            config = this.fenixTool.toTableConfig(values);

        //Export configuration
        $(s.CONFIGURATION_EXPORT).html(JSON.stringify(config));

        return config;
    };

    Dev.prototype._testBoostrapTable = function () {
        var config = $.extend(true, {}, {
                model: i18nModel,
                el: "#olap-interaction",
                lang : "EN",
                type : "bootstrap-table"
            }, config
        );

        log.trace("Init Boostrap Table");
        log.trace(JSON.stringify(config));

        this.olap = new OlapCreator(config);

    };
    // Utils

    Dev.prototype._importThirdPartyCss = function () {

        //Bootstrap
        //require("bootstrap-loader");
        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');
        //dropdown selector
        require("../../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        //tree selector
        require("../../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix-ui-filter
        require("../../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");
        // bootstrap-table
        require("../../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

    };

    return new Dev();
});
