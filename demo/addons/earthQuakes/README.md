## earthQuakes
Ajouter le control dans le fichier de configuration 
 ````
            <layer id="earthQuake"
                   name="Earthquakes"
                   visible="true"
                   type="customlayer"
                   vectorlegend="true"
                   opacity="1"
                   url="demo/addons/earthQuakes/layer.js"
                   attribution=""
                   metadata=""
                   metadata-csw=""
                   tooltip="true"
                   tooltipenabled="true"
                   tooltipcontent="{{title}}"
                   queryable="true"
                   infoformat="text/html"
                   customcontrol="true"
                   customcontrolpath="demo/addons/earthQuakes/Controls"
            >
                <template
                        url="demo/addons/earthQuakes/templates/default.mustache"></template>
            </layer>
 ````