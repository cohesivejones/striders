import React from "react";
import { render } from "react-dom";
import SortableTree from "react-sortable-tree";
import './styles.css';
import 'react-sortable-tree/style.css';

const Employees = () => {
  const treeData = [
    { title: "Chicken", expanded: true, children: [{ title: "Egg" }] }
  ];
  return (
    <div style={{ height: 500 }}>
      <SortableTree treeData={treeData} />
    </div>
  );
}

render(<Employees />, document.getElementById("root"));
