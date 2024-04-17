const refreshLegend = (function () {
    const _calculateScale = function (res) {
        var ppi = 25.4 / 0.28;
        return (res * ppi) / 0.0254;
    };
    const getLegendUrl = ()=>{
        // ol.proj.transformExtent(_map.getView().calculateExtent(_map.getSize()), 'EPSG:3857', 'EPSG:4326')
        const _extent = _map.getView().calculateExtent();
        // const width = ol.extent.getWidth(_extent);
        // const height = ol.extent.getHeight(_extent);
        const _projection = _map.getView().getProjection().getCode()
        const _bbox = Array.from(_extent).join(',');
        $.map(mviewer.getLayers(), (_ol, i) => {
            if (_ol.layer.get('visible') && _ol.type != 'vector-tms' && _ol.vectorlegend != true) {
                var legendUrl = mviewer.getLegendUrl(_ol, _calculateScale(_map.getView().getResolution()));
                // $("#legend-" + ol.id).attr("src", ol.legendurl);
                $("#legend-" + _ol.id).attr("src", `${legendUrl}&srs=${_projection}&bbox=${_bbox}&srcwidth=768&srcheight=300&legend_options=countMatched:true;fontAntiAliasing:true;hideEmptyRules:true;forceLabels:on;dpi:96`);

            }
        })
    }
    return {
        init: () => {
            const _map = mviewer.getMap();
            _map.getView().on("change:resolution", (e) => {
                getLegendUrl();
            });
            _map.on("moveend", ()=>{
                getLegendUrl()
            });
            _map.on("loadend",()=>{
                getLegendUrl()
            });

        }
    }
})()
new CustomComponent("refreshLegend", refreshLegend.init);

// legendurl="http://localhost:8888/geoserver/osm/wms?SERVICE=WMS&amp;Version=1.1.1&amp;request=GetLegendGraphic&amp;LAYER=event&amp;STYLE=&amp;width=20&amp;height=20&amp;srcwidth=768&amp;srcheight=330&amp;bbox=-180,-90,180,90&amp;format=image/png&amp;legend_options=countMatched:true;fontAntiAliasing:true;hideEmptyRules:true;forceLabels:on"
