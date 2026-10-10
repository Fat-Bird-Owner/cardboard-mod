
// Config core
function ConfigCore(block, recipes){
let block = Vars.content.block(block);
block.buildType = () => extend(CoreBlock.CoreBuild, block, {

draw(){

Draw.color(Color.black, 0.25)
Draw.rect(
this.block.region, 
this.x-(this.block.size*0.95), 
this.y-(this.block.size*0.95)
)

Draw.reset();
this.super$draw();
},

returnButton(items){
let dialog = new Table();

for (let i = 0; i < items.length; i++){
let button = new Button();
let item = Vars.content.item(items[i].item)
let output = Vars.content.item(items[i].icon)
let index = i
if (!item) return;

if (!output.unlocked()){
button.clicked(() => {
this.configure(items[index])
})

button.add(String(items[i].amount)).pad(5);
button.add(new Image(item.uiIcon)).size(30);
button.add(new Image(Icon.right)).pad(20);

button.add(String(1)).pad(5);
button.add(new Image(Core.atlas.find(items[i].icon))).size(30);


} else {
    button.add(new Image(Icon.lock))
}

dialog.add(button).size(250, 50).pad(5)
dialog.row();
}

return dialog;
},

configured(player, value){
log(value);
if (!this.items.has(Vars.content.item(value.item), value.amount)) return;
this.items.remove(Vars.content.item(value.item), value.amount)
this.items.add(Vars.content.item(value.icon), 1)
},

buildConfiguration(table){

table.add(this.returnButton(
recipes
))};

export.classes = {
configCore: ConfigCore
}

table.row();
}

});
