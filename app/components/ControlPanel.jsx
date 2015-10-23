        <!-- canvas controls panel -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Canvas Controls</h3>
          </div>
          <div class="panel-body">

            <div class="btn-group" data-toggle="buttons">
              <label class="btn" ng-class="devModeInputGroupClass">
                <input type="radio" name="display-rotate" id="dev-mode" ng-model="wallDisplayMode" value="DEV" autocomplete="off">Development Mode
              </label>
              <label class="btn" ng-class="prodModeInputGroupClass">
                <input type="radio" name="display-rotate" id="prod-mode" ng-model="wallDisplayMode" value="PROD" autocomplete="off" checked="checked">LED Display Mode (rotated)
              </label>
            </div>

            <div ng-if="wallDisplayMode == 'DEV'">
              <h4>Currently in DEV mode.</h4>
              <p>The canvas element on your left is displaying in the same manner that it would appear on the LED wall.</p>
            </div>
            <div ng-if="wallDisplayMode == 'PROD'">
              <h4>Currently in Wall Display (PROD) mode.</h4>
              <p>The canvas element on your left is rotated -90 degrees, so it will appear correctly on the LED wall.</p>
            </div>

            <h4>Add offset to CANVAS position</h4>
            <form class="form-inline">
              <div class="form-group">
                <label for="xOffset">X Offset</label>
                <input type="text" class="form-control" id="xOffset" ng-model="offsetStyle.left">
              </div>
              <div class="form-group">
                <label for="yOffset">Y Offset</label>
                <input type="text" class="form-control" id="yOffset" ng-model="offsetStyle.top">
              </div>
            </form>


          </div>
        </div>
        <!-- END: canvas control panel -->
