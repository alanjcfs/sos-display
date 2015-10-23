        <!-- media panel -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Select Mode</h3>
          </div>
          <div class="panel-body">
            <div class="list-group">
              <a href="#" class="list-group-item" ng-repeat="mode in loadedModes" ng-click="showMode(mode.id)" ng-class='{ "active":(activeMode.id == mode.id) }'>{{mode.title}}</a>
            </div>
            <button class="btn btn-default" type="submit" ng-click="showMode()">Clear Mode</button>
            <button class="btn btn-default" type="submit" ng-click="toggleKinectOverlay()">Toggle Kinect Overlay</button>
          </div>
        </div>
        <!-- END: media panel -->
