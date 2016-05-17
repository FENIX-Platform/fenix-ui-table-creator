/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'fx-olap/start',
    'test/js/toolbar',
    //'test/models/datashort',
    'test/models/dataFAOSTAT',

    //'test/models/uneca_population',
    //'test/models/dataFAOSTAT'
], function (log, $, Olap, Toolbar, Model/*, ModelUncea, ModelFaostat*/) {

    'use strict';

    function Test() { }

    Test.prototype.start = function () {
        log.trace("Test started");
        this._renderOlap();
    };

    Test.prototype._renderOlap = function () {

        var myToolbar = new Toolbar();

        myToolbar.init("toolbar", Model.metadata.dsd, {
            onchange: function () {
                var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);

                optGr["showRowHeaders"] = true;
				document.getElementById('toExport').innerHTML=JSON.stringify(optGr)
				olap.exportConf(Model.metadata.dsd,optGr)
                //myRenderer.rendererGridFX(Model, "result", config);
                olap.update(optGr);
				console.log("after update",olap)

            }, lang: "EN", nbDecimal: 2, showCode: false
        });

        myToolbar.display();

        var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);

        optGr["showRowHeaders"] = true;

        var config = $.extend(true, {}, {model: Model, el: "#result"}, optGr);
		document.getElementById('toExport').innerHTML=JSON.stringify(optGr)
        var olap = new Olap(config);
		olap.exportConf(Model.metadata.dsd,optGr)
    };


    return new Test();
});
