**1. Importer le plugin**
```
<extensions>
        <extension type="component" id="refreshLegend" path="demo/addons"/>
</extensions>
```
**2. Configurer le plugin**

Le rafraîchissement des couches se fait automatiquement aprés une durée bien précise et editable 
à partir fichier ``Config.json`` via le changement da la propriété `"timeToRefresh": 20000`. La durée de rafraîchissement est
en ``Millisecondes``
