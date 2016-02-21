let Pixi = require('pixi.js');

let { KINECTXOFFSET, KINECTYOFFSET } = require('./constants');

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

let SkeletalBody = function() {

  this._bodyData = {};
  this._shapesData = null;
  this._color = null;
  this._isActive = true;
  this._alpha = 0.1;

  this.handPointer = new HandPointer();
  this.getHandPointerFn = null;

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

  let getJointAsPoint = (jointName) => {
    let joint = this._bodyData.joints[jointName];
    if(joint) {
      return { x : joint.x, y : joint.y };
    } else {
      return null;
    }
  };

  let getCenterPoint = function(topLeftRect, bottomRightRect) {
    let centerX = (topLeftRect.x + bottomRightRect.x) / 2;
    let centerY = (topLeftRect.y + bottomRightRect.y) / 2;
    return { x : centerX, y :  centerY };
  };

  let getLeftHandPointerPoint = () => {
    return getJointAsPoint('HandLeft');
  };

  let getRightHandPointerPoint = () => {
    return getJointAsPoint('HandRight');
  };

  let getHandPointerPoint = () => {
    return getCenterPoint(getJointAsPoint('HandLeft'),
                          getJointAsPoint('HandRight'));
  };

  let randomizeHandPointer = () => {
    let fns = [getHandPointerPoint, getLeftHandPointerPoint, getRightHandPointerPoint];
    let index = Math.floor(Math.random() * fns.length);
    this.getHandPointerFn = fns[index];
  };

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

  this.init = (color) => {

    // set up stage reference
    this._color = color;

    // set up shapes
    this._shapesData = new Pixi.Container();
    this._shapesData.x = this._shapesData.x + KINECTXOFFSET;
    this._shapesData.y = this._shapesData.y + KINECTYOFFSET;
    this._shapesData.alpha = this._alpha;

    // toggle pointer
    randomizeHandPointer();
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
        let pointerLoc = this.getHandPointerFn();
        this.pointer.clear();
        this.pointer.lineStyle(2, 0xffffff);
        this.pointer.beginFill(this.handPointer.color);
        this.pointer.drawCircle(pointerLoc.x, pointerLoc.y, this.handPointer.getNextSize());
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
  KINECTXOFFSET,
  KINECTYOFFSET,
  SkeletalBody,
  HandPointer
};
