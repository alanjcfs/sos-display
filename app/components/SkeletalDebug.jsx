'use strict';
let React = require('react');
let Reflux = require('reflux');
let TreeView = require('./react-bootstrap-treeview').TreeView;
let store = require('../kinect/store');

module.exports = React.createClass({
    mixins: [ Reflux.connect(store, "data") ],

    // update only once a second since the data is complex and intensive
    componentDidMount: function() {
        this.canUpdate = true;
        this._timer = setInterval(() => { this.canUpdate = true; }, 1000);
    },

    componentWillUnmount: function() {
        this.canUpdate = false;
        clearInterval(this._timer);
    },

    shouldComponentUpdate: function() {
        if(this.canUpdate) {
            this.canUpdate = false;
            return true;
        }
        return false;
    },

    render: function() {
        return (
            <TreeView data={this.state.data.skeletons} />
        )
    }
});