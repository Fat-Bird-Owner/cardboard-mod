let classLib = require("CB-Classes");

Events.on(ClientLoadEvent, () => {

classLib.classes.configCore(
Vars.content.block("cb-box-core"), [
{ icon: "cb-cardboard", item: "copper", amount: 5 }, { icon: "cb-compressed-cardboard", item: "cb-cardboard", amount: 2 },  { icon: "cb-cardboard-box", item: "cb-compressed-cardboard", amount: 6 }
])

classLib.classes.poundDrill(
"cb-cardboard-drill",
"cb-cardboard"
)
  
});
