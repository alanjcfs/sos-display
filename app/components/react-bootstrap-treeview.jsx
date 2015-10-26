
// https://github.com/jonmiles/react-bootstrap-treeview
// fixed and modified with use for kinect sample data.

let React = require('react');

var TreeView = React.createClass({

  propTypes: {
    levels: React.PropTypes.number,

    expandIcon: React.PropTypes.string,
    collapseIcon: React.PropTypes.string,
    emptyIcon: React.PropTypes.string,
    nodeIcon: React.PropTypes.string,

    color: React.PropTypes.string,
    backColor: React.PropTypes.string,
    borderColor: React.PropTypes.string,

    showBorder: React.PropTypes.bool,
    showTags: React.PropTypes.bool,

    nodes: React.PropTypes.arrayOf(React.PropTypes.number)
  },

  getDefaultProps: function () {
    return {
      levels: 2,

      expandIcon: 'glyphicon glyphicon-plus',
      collapseIcon: 'glyphicon glyphicon-minus',
      emptyIcon: 'glyphicon',
      nodeIcon: 'glyphicon glyphicon-stop',

      color: undefined,
      backColor: undefined,
      borderColor: undefined,

      showBorder: true,
      showTags: false,

      nodes: []
    }
  },

  render: function() {

    let data = this.props.data;
    // this.setNodeId({ nodes: data });

    var children = [];
    if (data) {
      var _this = this;
      data.forEach(function (node) {
        children.push(<TreeNode node={node}
                                level={1}
                                visible={true}
                                options={_this.props} />);
      });
    }

    return (
      <div id='treeview' className='treeview'>
        <ul className='list-group'>
          {children}
        </ul>
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
    var options = this.props.options;

    var style;
    if (!this.props.visible) {

      style = {
        display: 'none'
      };
    }
    else {

      style = {
        color: node.color || options.color,
        backgroundColor: node.backColor || options.backColor
      };

      if (!options.showBorder) {
        style.border = 'none';
      }
      else if (options.borderColor) {
        style.border = '1px solid ' + options.borderColor;
      }
  }

  var indents = [];
  for (var i = 0; i < this.props.level-1; i++) {
    indents.push(<span className='indent'></span>);
  }

  var expandCollapseIcon;
  if (node.nodes) {
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

  var badges;
  if (options.showTags && node.tags) {
    badges = node.tags.map(function (tag) {
      return (
        <span className='badge'>{tag}</span>
      );
    });
  }

  var children = [];
  if (node.nodes) {
    node.nodes.forEach((node, i) => {
      children.push(<TreeNode node={node}
                              key={i}
                              level={this.props.level+1}
                              visible={this.state.expanded && this.props.visible}
                              options={options} />);
    });
  }

  // console.log(children);

  return (
      <li className='list-group-item'
          style={style}
          key={node.nodeId}>
        {indents}
        {expandCollapseIcon}
        <span className='icon'>
          <i className={node.icon || options.nodeIcon}></i>
        </span>
        <span>{node.text}</span>
        {badges}
        {children}
      </li>
  );
  }
});

module.exports = {
    TreeView: TreeView
};