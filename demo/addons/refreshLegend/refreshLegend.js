const refreshLegend = (function () {
    return {
        init: () => {
            const _map = mviewer.getMap();
            _map.getView().on("change:resolution", (e) => {
                // console.log(e.target.getResolution())
                // ol.proj.transformExtent(_map.getView().calculateExtent(_map.getSize()), 'EPSG:3857', 'EPSG:4326')
                const _extent = ol.proj.transformExtent(_map.getView().calculateExtent(_map.getSize()), 'EPSG:3857', 'EPSG:4326')
                const width = ol.extent.getWidth(_extent);
                const height= ol.extent.getHeight(_extent);
                console.log( _map.getView().getProjection().getCode())
                const _bbox = Array.from(_extent).join(',');
                // console.log(Array.from(ol.proj.transformExtent(_extent, 'EPSG:3857', 'EPSG:4326')).join(','))
                $.map(mviewer.getLayers(), (ol, i) => {
                    if (ol.layer.get('visible')) {
                        const _urlLegend = ol.layer.getSource().getLegendUrl(_map.getView().getResolution())
                        // ol.layer.getSource().updateParams({"Time": new Date().valueOf()})
                        // if (ol.dynamiclegend) {
                        // var legendUrl = _getlegendurl(layer, scale);
                        // $("#legend-" + ol.id).attr("src", ol.legendurl);
                        $("#legend-" + ol.id).attr("src", `${_urlLegend}&bbox=${_bbox}&srcwidth=${height}&srcheight=${width}&srs=EPSG:4326&legend_options=countMatched:true;fontAntiAliasing:true;hideEmptyRules:true;forceLabels:on`);
                        // }
                    }
                })
            });


        }
    }
})()
new CustomComponent("refreshLegend", refreshLegend.init);

