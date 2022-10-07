class Game {
  progress = 0;
  bgameOver = false;
  objPool = null; // will hold refrences to all possible Objects
  itemPool = [];//possible items
  itemList = []; // current items in play //aka dynamic Objects, buttons,movables etc
  staticList = []; // static objects 
  targetObj = []; // target Locations for the in play items
  testPoint; // used to visualize a point 
  constructor() {
    if (this.constructor == Game) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.load();
  }
  load() {
    throw new Error("Load() must be implemented");
  }
  setUp() {
    throw new Error("setUp() must be implemented");
  }
  cleanUP() {
    throw new Error("cleanUp() must be implemented");
  }
  isGameOver() { return this.bgameOver; }
  setFill() {
    if (this.progress < 0) return;
    if (this.progress > 100) progress = 100;
    var percent = this.progress / 100;
    var s = barMax * percent;
    var li = this.objPool.pFill.v1.x;
    var yi = this.objPool.pFill.v1.y;
    this.objPool.pFill.reSize(s, 2);
    var lf = this.objPool.pFill.v1.x;
    var yf = this.objPool.pFill.v1.y;
    this.objPool.pFill.translate(li - lf, yi - yf);
  }
  handleObjMoved(item) {
    var target = null;
    for (let i = 0; i < this.targetObj.length; i++) {
      if (item.inside(this.targetObj[i])) {
        target = this.targetObj[i];
        i = this.targetObj.length;
      }
    }
    //no target hit
    if (target == null) {
      item.teleport(item.spawn.x, item.spawn.y);
      return;
    }
    //target hit but not correct one 
    if (target.tag != item.tag) {
      playSound(audioFile.wrong, .5, 1, 2);
      item.teleport(item.spawn.x, item.spawn.y);
      return;
    }
    this.progress += 5;
    this.setFill();
    playSound(audioFile.correct, .15, 1, 2);
    var spawn = item.spawn;
    item.spawn = null;
    this.itemList = itemRemove(this.itemList, item.sprite);

    let index = Math.floor(Math.random() * this.itemPool.length);
    while (this.itemPool[index].spawn != null) {
      index = Math.floor(Math.random() * this.itemPool.length);
    }
    this.itemList.push(this.itemPool[index]);
    this.itemPool[index].setSpawn(spawn);
    if (this.progress >= 100) {
      this.bgameOver = true;
    }
  }
  buttonPressed(button) {
    if (button.btype = B_TYPE.PRINT)
      printCertificate();
  }

};



class CertGame extends Game {
  constructor() { super(); }
  load() {
    this.objPool = {
      certificate: new Obj(),
      printButton: new Obj(),
    }
    this.objPool.certificate.addImg("Images/certificate.png");
    this.objPool.printButton.addImg("Images/printButton.png");

    var filePromises = [];
    filePromises.push(this.objPool.certificate.sprite);
    filePromises.push(this.objPool.printButton.sprite);
    Promise.all(filePromises).then(this.setUp());
  }
  setUp() {
    // ======================== SCALE Objects =================================
    this.objPool.printButton.scale(5, 2);
    this.objPool.certificate.scale(8 * aspectRatio, 8);
    //====================== TELEPORT Objects =============================
    this.objPool.printButton.teleport(0, -2);
    this.objPool.certificate.teleport(8, 2);
    //=========================== ADD TO STATIC LIST =======================
    this.staticList.push(this.objPool.certificate);
    // ======== Set Up Buttons and Add to Item LIST=============================
    this.objPool.printButton.changeTag(TAG.BUTTON);
    this.objPool.printButton.setBttnType(B_TYPE.PRINT);

    this.itemList.push(this.objPool.printButton);
  }
}



class ShareAndTake extends Game {

  constructor() { super(); }
  load() {
    this.objPool = {
      //progressBar 
      pBar: new Obj(),
      pFill: new Obj(),
      //Background 
      cafeteria: new Obj(),
      shareStation: new Obj(),
      tray: new Obj(),
      //Fruits & Vegtables 
      apple: new Obj(),
      banana: new Obj(),
      carrots: new Obj(),
      celery: new Obj(),
      orange: new Obj(),
      //Dairy
      milk: new Obj(),
      chocolate: new Obj(),
      cheeseStick: new Obj(),
      creamCheese: new Obj(),
      yogurt: new Obj(),
      //HOT FOODS 
      burrito: new Obj(),
      burgers: new Obj(),
      pizza: new Obj(),
      corndog: new Obj(),
      //Other FOODS 
      sandwich: new Obj(),
      bagel: new Obj(),
      chips: new Obj(),
      cereal: new Obj(),
    };
    this.objPool.pBar.addImg("Images/pBar.png");
    this.objPool.pFill.addImg("Images/pFill.png");
    this.objPool.cafeteria.addImg("Images/cafeteria.png");
    this.objPool.shareStation.addImg("Images/shareStation.png");
    this.objPool.tray.addImg("Images/tray.png");
    this.objPool.apple.addImg("Images/apple.png");
    this.objPool.banana.addImg("Images/banana.png");
    this.objPool.carrots.addImg("Images/carrots.png");
    this.objPool.celery.addImg("Images/celery.png");
    this.objPool.orange.addImg("Images/orange.png");
    this.objPool.milk.addImg("Images/milk.png");
    this.objPool.chocolate.addImg("Images/chocolate.png");
    this.objPool.cheeseStick.addImg("Images/cheeseStick.png");
    this.objPool.creamCheese.addImg("Images/creamcheese.png");
    this.objPool.yogurt.addImg("Images/yogurt.png");
    this.objPool.burrito.addImg("Images/burrito.png");
    this.objPool.pizza.addImg("Images/pizza.png");
    this.objPool.corndog.addImg("Images/corndog.png");
    this.objPool.burgers.addImg("Images/burgers.png");
    this.objPool.sandwich.addImg("Images/sandwich.png");
    this.objPool.bagel.addImg("Images/bagel.png");
    this.objPool.chips.addImg("Images/chips.png");
    this.objPool.cereal.addImg("Images/cereal.png");

    // ADD OBJECT.SPRITE for OBJ WITH IMAGES
    var filePromises = [];
    filePromises.push(this.objPool.pBar.sprite);
    filePromises.push(this.objPool.pFill.sprite);
    filePromises.push(this.objPool.cafeteria.sprite);
    filePromises.push(this.objPool.shareStation.sprite);
    filePromises.push(this.objPool.tray.sprite);
    filePromises.push(this.objPool.apple.sprite);
    filePromises.push(this.objPool.banana.sprite);
    filePromises.push(this.objPool.carrots.sprite);
    filePromises.push(this.objPool.celery.sprite);
    filePromises.push(this.objPool.orange.sprite);
    filePromises.push(this.objPool.milk.sprite);
    filePromises.push(this.objPool.chocolate.sprite);
    filePromises.push(this.objPool.cheeseStick.sprite);
    filePromises.push(this.objPool.creamCheese.sprite);
    filePromises.push(this.objPool.yogurt.sprite);
    filePromises.push(this.objPool.burrito.sprite);
    filePromises.push(this.objPool.corndog.sprite);
    filePromises.push(this.objPool.pizza.sprite);
    filePromises.push(this.objPool.burgers.sprite);
    filePromises.push(this.objPool.sandwich.sprite);
    filePromises.push(this.objPool.bagel.sprite);
    filePromises.push(this.objPool.chips.sprite);
    filePromises.push(this.objPool.cereal.sprite);
    Promise.all(filePromises).then(this.setUp());
  }
  setUp() {
    // initialize progress bar to 0 
    this.setFill();
    //========================= CREATE TARGET OBJ ========================
    var dairyBin = new Obj();
    dairyBin.changeTag(TAG.SHARE_DAIRY);
    this.targetObj.push(dairyBin);

    var fruitVegBin = new Obj();
    fruitVegBin.changeTag(TAG.SHARE_FV);
    this.targetObj.push(fruitVegBin);

    var hotFoodBin = new Obj();
    hotFoodBin.changeTag(TAG.SHARE_HOT);
    this.targetObj.push(hotFoodBin);

    var otherFoodBin = new Obj();
    otherFoodBin.changeTag(TAG.SHARE_FOOD);
    this.targetObj.push(otherFoodBin);

    // ======================== SCALE Objects =================================
    dairyBin.scale(2, 3);
    fruitVegBin.scale(2, 3);
    hotFoodBin.scale(2, 3);
    otherFoodBin.scale(2, 3);

    this.objPool.pBar.scale(barMax * 1.02, 2.5);
    this.objPool.pFill.scale(0.1, 2);
    this.objPool.cafeteria.scale(25, 30);
    this.objPool.tray.scale(10, 10);
    this.objPool.shareStation.scale(12 * aspectRatio, 12);

    this.objPool.apple.scale(3 * aspectRatio, 3);
    this.objPool.banana.scale(2, 4);
    this.objPool.orange.scale(2, 5);
    this.objPool.carrots.scale(2, 4);
    this.objPool.celery.scale(4, 3);

    this.objPool.milk.scale(3 * aspectRatio, 3);
    this.objPool.cheeseStick.scale(1, 8);
    this.objPool.creamCheese.scale(3 * aspectRatio, 3);
    this.objPool.chocolate.scale(3 * aspectRatio, 3);
    this.objPool.yogurt.scale(2, 5);

    this.objPool.burrito.scale(3, 3);
    this.objPool.burgers.scale(3, 6);
    this.objPool.corndog.scale(6, 6);
    this.objPool.pizza.scale(6, 6);

    this.objPool.chips.scale(3 * aspectRatio, 3);
    this.objPool.bagel.scale(5, 5);
    this.objPool.cereal.scale(4 * aspectRatio, 4);
    this.objPool.sandwich.scale(4, 4);

    //====================== TELEPORT Objects =============================
    dairyBin.teleport(5, 1);
    fruitVegBin.teleport(5, 7);
    otherFoodBin.teleport(12, 7);
    hotFoodBin.teleport(12, 1);
    this.objPool.pBar.teleport(-13, 9.8);
    this.objPool.pFill.teleport(-22.8, 10.1);
    this.objPool.cafeteria.teleport(0, -14);
    this.objPool.tray.teleport(0, -14);
    this.objPool.shareStation.teleport(8, 0);
    //=========================== ADD TO STATIC LIST =======================

    this.staticList.push(this.objPool.cafeteria);
    this.staticList.push(this.objPool.tray);
    this.staticList.push(this.objPool.shareStation);
    this.staticList.push(this.objPool.pBar);
    this.staticList.push(this.objPool.pFill);

    // ======== Set Up Tags   and add to item pool==================================== 
    this.objPool.apple.changeTag(TAG.SHARE_FV);
    this.itemPool.push(this.objPool.apple);
    this.objPool.banana.changeTag(TAG.SHARE_FV);
    this.itemPool.push(this.objPool.banana);
    this.objPool.carrots.changeTag(TAG.SHARE_FV);
    this.itemPool.push(this.objPool.carrots);
    this.objPool.celery.changeTag(TAG.SHARE_FV);
    this.itemPool.push(this.objPool.celery);
    this.objPool.orange.changeTag(TAG.SHARE_FV);
    this.itemPool.push(this.objPool.orange);
    this.objPool.milk.changeTag(TAG.SHARE_DAIRY);
    this.itemPool.push(this.objPool.milk);
    this.objPool.chocolate.changeTag(TAG.SHARE_DAIRY);
    this.itemPool.push(this.objPool.chocolate);
    this.objPool.cheeseStick.changeTag(TAG.SHARE_DAIRY);
    this.itemPool.push(this.objPool.cheeseStick);
    this.objPool.creamCheese.changeTag(TAG.SHARE_DAIRY);
    this.itemPool.push(this.objPool.creamCheese);
    this.objPool.yogurt.changeTag(TAG.SHARE_DAIRY);
    this.itemPool.push(this.objPool.yogurt);
    this.objPool.burrito.changeTag(TAG.SHARE_HOT);
    this.itemPool.push(this.objPool.burrito);
    this.objPool.pizza.changeTag(TAG.SHARE_HOT);
    this.itemPool.push(this.objPool.pizza);
    this.objPool.corndog.changeTag(TAG.SHARE_HOT);
    this.itemPool.push(this.objPool.corndog);
    this.objPool.burgers.changeTag(TAG.SHARE_HOT);
    this.itemPool.push(this.objPool.burgers);
    this.objPool.sandwich.changeTag(TAG.SHARE_FOOD);
    this.itemPool.push(this.objPool.sandwich);
    this.objPool.bagel.changeTag(TAG.SHARE_FOOD);
    this.itemPool.push(this.objPool.bagel);
    this.objPool.chips.changeTag(TAG.SHARE_FOOD);
    this.itemPool.push(this.objPool.chips);
    this.objPool.cereal.changeTag(TAG.SHARE_FOOD);
    this.itemPool.push(this.objPool.cereal);

    // set up spawn points  --------------------------------
    //this.testPoint = new Vec(-5.5, -11, 1); // if want to visualize
    var spawnPoints = []; // temporarily store the spawn points 
    //tray spawn points 
    spawnPoints.push(new Vec(-6, -6, 1));
    spawnPoints.push(new Vec(-1, -6, 1));
    spawnPoints.push(new Vec(3.5, -6, 1));
    spawnPoints.push(new Vec(2, -11, 1));
    spawnPoints.push(new Vec(-5.5, -11, 1));

    //initial initial items ----------------------------------
    for (let i = 0; i < spawnPoints.length; i++) {
      let index = Math.floor(Math.random() * this.itemPool.length);
      while (this.itemPool[index].spawn != null && this) {
        index = Math.floor(Math.random() * this.itemPool.length);
      }
      this.itemList.push(this.itemPool[index]);
      this.itemList[i].setSpawn(spawnPoints[i]);
    }
  }

}


//removes items based on sprite.sprite value
function itemRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele.sprite != value;
  });
}