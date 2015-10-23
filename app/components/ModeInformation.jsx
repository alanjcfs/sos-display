        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Mode Information</h3>
          </div>
          <div class="panel-body">
            <table class="table table-striped">
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
              <tr ng-repeat="(key,value) in debugInfo">
                <td>
                  <samp>{{key}}</samp>
                </td>
                <td>
                  <samp>{{value}}</samp>
                </td>
              </tr>
            </table>
          </div>
        </div>
