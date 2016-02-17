'use strict';
let React = require('react');
let Reflux = require('reflux');
let TreeView = require('./react-bootstrap-treeview').TreeView;
let store = require('../kinect/store');

module.exports = React.createClass({
    mixins: [ Reflux.connect(store, "data") ],
    render: function() {

        return (
            <TreeView data={this.state.data.skeletons} />
        )
    }
});