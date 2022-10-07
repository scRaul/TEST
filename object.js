const TAG = {
  BUTTON: -1,
  NONE: 0,
  SHARE_FV: 1,
  SHARE_FOOD: 2,
  SHARE_DAIRY: 3,
  SHARE_HOT: 4
};
const B_TYPE = {
  RESTART:0,
  PRINT: 1,
  PLAY: 2
};
class Obj {
  pos;
  v1; //lower left
  v2; //upper left
  v3; // upper right
  v4; // lower right
  w;
  h;
  sprite;
  selected = false;
  tag = TAG.NONE;
  btype = null;
  spawn = null;
  constructor() {
    this.pos = new Vec(0, 0, 1);
    this.v1 = new Vec(-1, 0, 1); //lower left
    this.v2 = new Vec(-1, 1, 1); //upper left
    this.v3 = new Vec(1, 1, 1); // upper right
    this.v4 = new Vec(1, 0, 1); // lower right
    this.w = 1;
    this.h = 1;
  }
  translate(x, y) {
    var translate = new Mat(
      1, 0, x,
      0, 1, y,
      0, 0, 1
    );
    this.matrixMult(translate);
  }
  teleport(px, py) {
    this.translate(-this.pos.x, -this.pos.y);
    this.translate(px, py);
  }
  scale(w, h) {
    var tx = this.pos.x;
    var ty = this.pos.y;
    this.translate(-tx, -ty);
    var scale = new Mat(
      w, 0, 0,
      0, h, 0,
      0, 0, 1);
    this.matrixMult(scale);
    this.translate(tx, ty);
    this.w = (this.v4.x - this.v1.x);
    this.h = (this.v2.y - this.v1.y);
  }
  reSize(w, h) {
    this.pos = new Vec(0, 0, 1);
    this.v1 = new Vec(-1, 0, 1); //lower left
    this.v2 = new Vec(-1, 1, 1); //upper left
    this.v3 = new Vec(1, 1, 1); // upper right
    this.v4 = new Vec(1, 0, 1); // lower right
    this.w = 1;
    this.h = 1;
    this.scale(w, h);
  }
  getVerts() {
    return [this.pos, this.v1, this.v2, this.v3, this.v4];
  }
  addImg(src, callback = null) {
    this.sprite = new Image();
    if (callback != null)
      this.sprite.onload = callback;
    this.sprite.src = src;
  }
  setSpawn(spawn) {
    this.spawn = spawn;
    this.teleport(spawn.x, spawn.y);
  }
  changeTag(tag) {
    this.tag = tag;
  }
  setBttnType(btype){
    this.btype = btype;
  }
  matrixMult(transform) {
    this.pos = vMath(transform, '*', this.pos);
    this.v1 = vMath(transform, '*', this.v1);
    this.v2 = vMath(transform, '*', this.v2);
    this.v3 = vMath(transform, '*', this.v3);
    this.v4 = vMath(transform, '*', this.v4);
  }
  collided(point) {
    if (point.x < this.v1.x || point.x > this.v4.x) return false;
    if (point.y < this.v1.y || point.y > this.v3.y) return false;
    else return true;
  }
  inside(other) {
    var y = this.pos.y + ((this.v3.y - this.pos.y) / 2);
    var center = new Vec(this.pos.x, y, 1);
    return other.collided(center);
  }
}