const contextMenu = (function () {
  let contextmenu;
  let restorMenu = false;

  let actionItem = {
    text: "Actions",
    icon: "demo/addons/contextMenu/img/icons/cogs.svg",
    items: [
      {
        text: "Ajouter Evènement",
        icon: "demo/addons/contextMenu/img/icons/cogs.svg",

        callback: function () {
          editionBar.addEvent();
        },
      },
    ],
  };
  let separatorItem = [
    "-", // this is a separator
  ];

  return {
    init: function () {
      contextmenu = new ContextMenu({
        width: 170,
        defaultItems: false, // defaultItems are (for now) Zoom In/Zoom Out
        items: separatorItem,
      });
      contextmenu.on("beforeopen", () => {
        contextmenu.clear();
        contextmenu.push(actionItem);
        contextmenu.push(["-"]);
        contextmenu.extend(contextmenu.getDefaultItems());
      });

      mviewer.getMap().addControl(contextmenu);
    },
  };
})();

new CustomComponent("contextMenu", contextMenu.init);
