import React, { useState, useEffect } from "react";
import * as ReactDOM from 'react-dom';
import { createSponsor, deleteSponsor, getStriders, getSponsors } from './api'
import { spread, toNodeData, mergeById, listToTree } from './helpers'
import SortableTree, { TreeItem } from "react-sortable-tree";
import _ from 'lodash';
import './styles.css';
import 'react-sortable-tree/style.css';

function onMoveNode({ treeData, node, nextParentNode, prevPath, prevTreeIndex, nextPath, nextTreeIndex}: {
  treeData: TreeItem[],
  node: TreeItem,
  nextParentNode: TreeItem,
  prevPath: Array<string | number>,
  prevTreeIndex: number,
  nextPath: Array<string | number>,
  nextTreeIndex: number
}): void {
  if (node.parentId) {
    deleteSponsor(node.id)
  }
  createSponsor(node.id, nextParentNode.id)
};

const Employees = () => {
  const [treeData, setTreeData] = useState([]);
  const getData = (): Promise<TreeItem[]> => {
    return new Promise((resolve, reject) => {
      Promise.all([ getStriders(), getSponsors() ]).then(spread((striders, sponsors) => {
        const data = _.orderBy(
          mergeById(striders.data, sponsors.data).map(toNodeData),
          ['title'],
          ['asc']
        );
        resolve(listToTree(data));
      })
      ).catch(reject)
    });
  }
  const onChange = (treeData: TreeItem[]) => setTreeData(treeData)
  useEffect(() => {
    const setData = async () => {
      const data = await getData();
      setTreeData(data);
    };
    setData();
  }, [JSON.stringify(treeData)]);
  return (
    <div style={{ height: '100%' }}>
      <SortableTree treeData={treeData} onMoveNode={onMoveNode} onChange={onChange}/>
    </div>
  );
}

ReactDOM.render(<Employees />, document.getElementById("root"));
