
// https://github.com/jonmiles/react-bootstrap-treeview
// fixed and modified with use for kinect sample data.

let React = require('react');
let _ = require('underscore');

var TreeView = React.createClass({

  propTypes: {
    levels: React.PropTypes.number,

    expandIcon: React.PropTypes.string,
    collapseIcon: React.PropTypes.string,
    emptyIcon: React.PropTypes.string,
    nodeIcon: React.PropTypes.string,

    showBorder: React.PropTypes.bool,

    nodes: React.PropTypes.arrayOf(React.PropTypes.number)
  },

  getDefaultProps: function () {
    return {
      levels: 1,

      expandIcon: 'glyphicon glyphicon-plus',
      collapseIcon: 'glyphicon glyphicon-minus',
      emptyIcon: 'glyphicon',
      nodeIcon: 'glyphicon glyphicon-stop',

      showBorder: true,

      nodes: []
    }
  },

  render: function() {

    let data = this.props.data;
    let children = _.map(data, (skeleton, i) => {
        let name = "Skeleton " + i;
        return (<TreeNode node={name}
                          value={skeleton}
                          key={skeleton.trackingId}
                          level={1}
                          visible={true}
                          options={this.props} />
        );
    });

    return (
      <div id='treeview' className='treeview'>
        {children}
      </div>
    );
  }
});

var TreeNode = React.createClass({

  getInitialState: function() {
    var node = this.props.node;
    return {
      expanded: (node.state && node.state.hasOwnProperty('expanded')) ?
                  node.state.expanded :
                    (this.props.level < this.props.options.levels) ?
                      true :
                      false
    }
  },

  toggleExpanded: function(id, event) {
    this.setState({ expanded: !this.state.expanded });
    event.stopPropagation();
  },

  render: function() {

    var node = this.props.node;
    var value = this.props.value;
    var options = this.props.options;

    var style;
    if (!this.props.visible) {

      style = {
        display: 'none'
      };
    }
    else {

      style = {};

      if (!options.showBorder) {
        style.border = 'none';
      }
    }

  var expandCollapseIcon;
  if (value) {
    if (!this.state.expanded) {
      expandCollapseIcon = (
        <span className={options.expandIcon}
              onClick={this.toggleExpanded.bind(this, node.nodeId)}>
        </span>
      );
    }
    else {
      expandCollapseIcon = (
        <span className={options.collapseIcon}
              onClick={this.toggleExpanded.bind(this, node.nodeId)}>
        </span>
      );
    }
  }
  else {
    expandCollapseIcon = (
      <span className={options.emptyIcon}></span>
    );
  }

  var text;
  if (typeof node === "string") {
      text = (<span>{node}</span>)
  } else {
      // probably an error?
      text = (<span>{JSON.stringify(node)}</span>);
  }

  var children = [];

  if(this.state.expanded) {
    if (value.hasOwnProperty('x') && value.hasOwnProperty('y')) {
      // short-circuit {x:...,y:...}
      let name = "x: " + value.x + ", y: " + value.y;
      let key = node + "_xy";
      children.push(<TreeNode node={name}
                              value={undefined}
                              key={key}
                              level={this.props.level+1}
                              visible={this.props.visible}
                              options={options} />);
    } else if (typeof value === "object") {
      let keys = Object.keys(value);
      _.each(keys, (key, i) => {
          let name = node + "_" + i;
          children.push(<TreeNode node={key}
                                  value={value[key]}
                                  key={name}
                                  level={this.props.level+1}
                                  visible={this.props.visible}
                                  options={options} />);
      });
    } else if ((typeof value === "string" || typeof value === "number")) {
      let name = "final_" + node;
      children.push(<TreeNode node={value}
                              value={undefined}
                              key={name}
                              level={this.props.level+1}
                              visible={this.props.visible}
                              options={options} />);
    }
  }

  return (
    <ul className='list-group'>
      <li className='list-group-item'
          style={style}
          key={node}>
        {expandCollapseIcon}
        <span className='icon'>
          <i className={node.icon || options.nodeIcon}></i>
        </span>
        {text}
        {children}
      </li>
    </ul>
  );
  }
});

module.exports = {
    TreeView: TreeView
};