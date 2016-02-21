let Pixi = require('pixi.js');
let _ = require('underscore');

let {
  KINECTXOFFSET,
  KINECTYOFFSET
} = require('./constants');

const HANDSNORMAL = Symbol();
const HANDSCLOSED = Symbol();
const HANDSOPENED = Symbol();

let HandPointer = function() {

  this.visible = true;
  this.color = 0xFFFF00;

  // throbbing ball .. hee hee
  this.minSize = 5;
  this.maxSize = 15;
  this.size = this.minSize;
  this.sizeIncrement = 0.1;

  // fading ball .. hee hee
  this.minAlpha = 0.5;
  this.maxAlpha = 1.0;
  this.alpha = this.minAlpha;
  this.alphaIncrement = 0.05;

  this.getNextSize = () => {

    if(this.size >= this.maxSize) {
      this.sizeIncrement = -1;
    } else if(this.size <= this.minSize) {
      this.sizeIncrement = 1;
    }

    this.size = this.size + this.sizeIncrement;
    return this.size;
  };

  this.getNextAlpha = () => {

    if(this.alpha >= this.maxAlpha) {
      this.alphaIncrement = -0.05;
    } else if(this.alpha <= this.minAlpha) {
      this.alphaIncrement = 0.05;
    }

    this.alpha = this.alpha + this.alphaIncrement;
    return this.alpha;
  };
};

let SkeletalBody = function(color) {

  this._color = color;
  this._bodyData = {};
  this._alpha = 0.1;

  this.handPointer = new HandPointer();

  this.pointer = new Pixi.Graphics();
  this.torso = new Pixi.Graphics();
  this.leftHand = new Pixi.Graphics();
  this.rightHand = new Pixi.Graphics();
  this.head = new Pixi.Graphics();

  this.leftShoulderToElbow = new Pixi.Graphics();
  this.leftElbowToWrist = new Pixi.Graphics();
  this.leftWristToHand = new Pixi.Graphics();
  this.rightShoulderToElbow = new Pixi.Graphics();
  this.rightElbowToWrist = new Pixi.Graphics();
  this.rightWristToHand = new Pixi.Graphics();
  this.leftHipToKnee = new Pixi.Graphics();
  this.leftKneeToAnkle = new Pixi.Graphics();
  this.rightHipToKnee = new Pixi.Graphics();
  this.rightKneeToAnkle = new Pixi.Graphics();

  this._shapesData = new Pixi.Container();
  this._shapesData.x = KINECTXOFFSET;
  this._shapesData.y = KINECTYOFFSET;
  this._shapesData.alpha = this._alpha;

  let getLeftHandPoint = () => {
    let { x, y } = this._bodyData.joints['HandLeft'];
    let lstatus = this._bodyData['handLeftState'];
    let status = _.result({ 'Closed': HANDSCLOSED, 'Open': HANDSOPENED }, lstatus, HANDSNORMAL);
    return { x, y, status };
  };

  let getRightHandPoint = () => {
    let { x, y } = this._bodyData.joints['HandRight'];
    let rstatus = this._bodyData['handRightState'];
    let status = _.result({ 'Closed': HANDSCLOSED, 'Open': HANDSOPENED }, rstatus, HANDSNORMAL);
    return { x, y, status };
  };

  let getCenterHandsPoint = () => {
    let { x: lx, y: ly, status: lstatus } = getLeftHandPoint();
    let { x: rx, y: ry, status: rstatus } = getRightHandPoint();
    let x = (lx + rx) / 2;
    let y = (ly + ry) / 2;
    let status = lstatus === rstatus ? lstatus : HANDSNORMAL;
    return { x, y, status };
  };

  // toggle hand pointer between left, center, right
  let fns = [getCenterHandsPoint, getLeftHandPoint, getRightHandPoint];
  let index = Math.floor(Math.random() * fns.length);
  this.getHandPointerFn = fns[index];

  let drawLineBetweenJoints = (j1Name, j2Name, polygon) => {
    let j1 = this._bodyData.joints[j1Name];
    let j2 = this._bodyData.joints[j2Name];

    polygon.clear();
    polygon.position.x = j1.x;
    polygon.position.y = j1.y;
    polygon.lineStyle(1, 0xDEDEDE);
    polygon.beginFill(this._color);

    // get the normal of the line so we can extend it outwards appropriately.
    let width = j2.x - j1.x;
    let height = j2.y - j1.y;
    let numerator = Math.sqrt(Math.max(height * height + width * width, 1.0));
    let normalx = - height / numerator;
    let normaly = width / numerator;
    let scale = 8;
    normalx *= scale;
    normaly *= scale;

    polygon.moveTo(-normalx, 0.0);
    polygon.lineTo(0.0, normaly);
    polygon.lineTo(width, height + normaly);
    polygon.lineTo(width - normalx, height);
    polygon.lineTo(-normalx, 0.0);

    polygon.endFill();

    this._shapesData.addChild(polygon);
  };

  this.setBodyData = (bodyData) => {
    this._bodyData = bodyData;
  };

  this.remove = () => {
    this._shapesData.removeChildren();
    //_shapesData.destroy();
  };

  this.drawToStage = (container) => {

    this._shapesData.removeChildren();

    if(this._bodyData && this._bodyData.joints) {

      // polygon graphic for the torso
      this.torso.clear();
      this.torso.lineStyle(4, 0xFFFFFF);
      this.torso.beginFill(this._color);
      this.torso.moveTo(this._bodyData.joints.ShoulderLeft.x, this._bodyData.joints.ShoulderLeft.y);
      this.torso.lineTo(this._bodyData.joints.ShoulderRight.x, this._bodyData.joints.ShoulderRight.y);
      this.torso.lineTo(this._bodyData.joints.HipRight.x, this._bodyData.joints.HipRight.y);
      this.torso.lineTo(this._bodyData.joints.HipLeft.x, this._bodyData.joints.HipLeft.y);
      this.torso.lineTo(this._bodyData.joints.ShoulderLeft.x, this._bodyData.joints.ShoulderLeft.y);
      this.torso.endFill();
      this._shapesData.addChild(this.torso);

      // neck line
      // drawLineBetweenJoints('Head', 'Neck');

      // left arm
      drawLineBetweenJoints('ShoulderLeft', 'ElbowLeft', this.leftShoulderToElbow);
      drawLineBetweenJoints('ElbowLeft', 'WristLeft', this.leftElbowToWrist);
      drawLineBetweenJoints('WristLeft', 'HandLeft', this.leftWristToHand);

      // right arm
      drawLineBetweenJoints('ShoulderRight', 'ElbowRight', this.rightShoulderToElbow);
      drawLineBetweenJoints('ElbowRight', 'WristRight', this.rightElbowToWrist);
      drawLineBetweenJoints('WristRight', 'HandRight', this.rightWristToHand);

      // left leg
      drawLineBetweenJoints('HipLeft', 'KneeLeft', this.leftHipToKnee);
      drawLineBetweenJoints('KneeLeft', 'AnkleLeft', this.leftKneeToAnkle);

      // right leg
      drawLineBetweenJoints('HipRight', 'KneeRight', this.rightHipToKnee);
      drawLineBetweenJoints('KneeRight', 'AnkleRight', this.rightKneeToAnkle);

      this.leftHand.clear();
      this.leftHand.lineStyle(1, 0xFFFFFF);
      this.leftHand.beginFill(this._color).drawCircle(this._bodyData.joints.HandLeft.x, this._bodyData.joints.HandLeft.y, 5);
      this.leftHand.endFill();
      this._shapesData.addChild(this.leftHand);

      this.rightHand.clear();
      this.rightHand.lineStyle(1, 0xFFFFFF);
      this.rightHand.beginFill(this._color).drawCircle(this._bodyData.joints.HandRight.x, this._bodyData.joints.HandRight.y, 5);
      this.rightHand.endFill();
      this._shapesData.addChild(this.rightHand);

      this.head.clear();
      this.head.lineStyle(2, 0xFFFFFF);
      this.head.beginFill(this._color).drawCircle(this._bodyData.joints.Head.x, this._bodyData.joints.Head.y, 25);
      this.head.endFill();
      this._shapesData.addChild(this.head);

      if(this.handPointer.visible) {
        let { x, y, status } = this.getHandPointerFn();
        this.pointer.clear();
        this.pointer.lineStyle(2, 0xffffff);

        if (status === HANDSOPENED) {
          this.pointer.beginFill(0x00ff00); // green
        } else if (status === HANDSCLOSED) {
          this.pointer.beginFill(0xff0000); // red
        } else {
          this.pointer.beginFill(this.handPointer.color);
        }

        this.pointer.drawCircle(x, y, this.handPointer.getNextSize());
        this.pointer.alpha = this.handPointer.getNextAlpha();
        this.pointer.endFill();
        this._shapesData.addChild(this.pointer);
      }

      // decrement alpha if not at 1.0 yet
      if(this._alpha < 1.0) {
        this._alpha = this._alpha + 0.075;
        this._shapesData.alpha = Math.min(this._alpha, 1.0);
      }

      container.addChild(this._shapesData);
    }
  };
};

module.exports = {
  SkeletalBody,
  HandPointer
};
