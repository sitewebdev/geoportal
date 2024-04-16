const refreshMap=(function (){
    return{
        init:()=>{
            setInterval(()=>{
                // var current_zoom = mviewer.getMap().getView().getZoom();
                // mviewer.getMap().getView().setZoom(Math(current_zoom - 0.001,0));
                // const map = mviewer.getMap();
                // map.getView().setZoom(map.getView().getZoom() + 1)
                //map.getView().setZoom(map.getView().getZoom() - 1)

                $.map(mviewer.getLayers(),(ol,i)=>{
                    if(ol.layer.get('visible'))
                    {
                        // ol.layer.getSource().updateParams({"Time": new Date().valueOf()})
                        ol.layer.getSource().changed()
                        if (ol.dynamiclegend) {
                            // var legendUrl = _getlegendurl(layer, scale);
                            $("#legend-" + ol.id).attr("src", ol.legendurl);
                        }
                    }
                })
            },mviewer.customComponents.refreshMap.config.options['timeToRefresh'])
        }
    }
})()
new CustomComponent("refreshMap", refreshMap.init);