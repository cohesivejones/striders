import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import SortableTree from "react-sortable-tree";
import './styles.css';
import 'react-sortable-tree/style.css';

const Employees = () => {
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/people`)
      .then(response => response.json())
      .then(data => {
        const mappedData = data.map(({id, firstName, lastName}) => (
          {
            key: id,
            title: `${firstName} ${lastName}`,
            expanded: false,
            children: []
          }
        ));
        setTreeData(mappedData)
      });
  });
  const onMoveNode = ({
    treeData,
    node,
    nextParentNode,
    prevPath,
    prevTreeIndex,
    nextPath,
    nextTreeIndex
  }) => {
    console.log(`Assign sponsee ${node.title} to sponser ${nextParentNode.title}`);
  };
  const onChange = () => null
  return (
    <div style={{ height: '100%' }}>
      <SortableTree treeData={treeData} onMoveNode={onMoveNode} onChange={onChange}/>
    </div>
  );
}

render(<Employees />, document.getElementById("root"));
