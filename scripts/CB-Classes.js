
// Config core
function configCore(block, recipes){
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

returnButton(items, amt){
let dialog = new Table();

for (let i = 0; i < items.length; i++){
let button = new Button();
let item = Vars.content.item(items[i].item)
let output = Vars.content.item(items[i].icon)
let index = i
if (!item) return;

if (!Vars.state.isCampaign() || output.unlocked()){
button.clicked(() => {
if (isNaN(Number(amt.getText()))) return;
for (let i = 0; i < Number(amt.getText()); i++){
this.configure(items[index]);
}})

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
if (!this.items.has(Vars.content.item(value.item), value.amount)) return;
this.items.remove(Vars.content.item(value.item), value.amount)
this.items.add(Vars.content.item(value.icon), 1)
},

buildConfiguration(table){

let textInput = new TextArea("1");
table.add(textInput).size(250, 50).pad(5)
table.row();
    
table.add(this.returnButton(
recipes, textInput)
);

table.row();
},

shouldHideConfigure(player){
return false;
}

});
}

function poundDrill(blockN, item){
let block = Vars.content.block(blockN)
block.tier = 2
block.rotateSpeed = 5;

block.buildType = () => extend(Drill.DrillBuild, block, {

updateTile(){

this.progress = this.timeDrilled
if (this.progress >= this.block.getDrillTime(this.dominantItem)){
Fx.shockwave.at(this.x, this.y, this.block.size*4)
this.timeDrilled = 0;
}

this.dominantItem = Vars.content.item(item);
this.super$updateTile();
},

mul(){

return 1 - Interp.sineOut.apply(
0.2 * (this.progress / this.block.getDrillTime(this.dominantItem))
);
},

draw(){

Draw.z(30)

Draw.color(Color.black, 0.3)
Draw.rect(this.block.region, this.x-4, this.y-4)
Draw.reset()

Draw.z(31)
Draw.rect(this.block.region, this.x, this.y)

Draw.color(Color.white, (this.mul()/3)*2 + 0.33)
Draw.rect(
this.block.rotatorRegion,
this.x,
this.y, 
this.block.size*8*this.mul(),
this.block.size*8*this.mul()
)

}

})
}

function distributionPylon(blockN){
let block = Vars.content.block(blockN);
block.buildType = () => extend(MassDriver.MassDriverBuild, block, {
connections: new OrderedSet(),

updateTile(){
this.reloadCounter = 0;
if (this.waitingShooters.size >= this.connections.size) this.connections = this.waitingShooters.copy();
this.super$updateTile();
},

acceptItem(source, item){
if (
    this.items.total() <= this.block.itemCapacity || 
    source instanceof MassDriver.MassDriverBuild
){
return true;
}},

draw(){
Draw.rect(this.block.baseRegion, this.x, this.y);

Draw.z(100)
this.connections.each(shooter => {
Draw.color(Pal.accent)
Lines.stroke(2)
Lines.line(this.x, this.y, shooter.x, shooter.y)
})

Draw.reset()
}

});
}

exports.classes = {
configCore: configCore,
poundDrill: poundDrill,
distributionPylon: distributionPylon
}
