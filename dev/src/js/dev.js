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
        this._bootstrapTable();
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

    Dev.prototype._bootstrapTable = function () {

        var lang = "EN";

        function createHTML(content, model) {
            // Requires : id to put the table inside, the model to build the table
            var config = {
                idElem : "fx_bTable_"+idj,
                colElem : []
            };
            // Does:
            // - Read DSD
            $.each(model.metadata.dsd.columns, function(id1, ob1){
                // Push them !all
                if (ob1.dataType === "year" || ob1.dataType === "number" || ob1.dataType === "text" ) {
                    if (!(ob1.id.indexOf('_') >= 0)) {
                        // If we're here, we should always put there
                        config.colElem.push({
                            id: ob1.id,
                            title: ob1.title[lang]
                        });
                    } else {
                        // Here we should check if the text is on the right language
                        var dsd_lang = ob1.id.substring(ob1.id.indexOf('_')+1,ob1.id.size);
                        if (dsd_lang.toUpperCase() === lang.toUpperCase())
                            config.colElem.push({
                                id: ob1.id,
                                title: ob1.title[lang]
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

        function parseData(model) {
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
                $.each(structure, function(id3, ob3){ toPush[id3] = ob2[ob3]; });
                data.push(toPush);
            });

            return data;
        }


        var tab = createHTML('#grid', Model);
        var data = parseData(Model);


        $(tab).bootstrapTable({
            data: data,
            locale : lang.toLowerCase()+"-"+lang.toUpperCase(),
            pagination: true,
            search: true,
            height: 543,
            showMultiSort: true
        });

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
