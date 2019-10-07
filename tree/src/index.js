import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import SortableTree from "react-sortable-tree";
import axios from 'axios';
import _ from 'lodash';
import './styles.css';
import 'react-sortable-tree/style.css';

const getStriders = () => axios.get(`http://localhost:4000/people`)
const getSponsers = () => axios.get(`http://localhost:4001/sponsers`)
const deleteSponser = (sponseeId) => axios.delete(`http://localhost:4001/sponsers/${sponseeId}/delete`);
const createSponser = (sponseeId, sponserId) => axios.post('http://localhost:4001/sponsers/create', { id: sponseeId, parentId: sponserId });

const onMoveNode = ({
  treeData,
  node,
  nextParentNode,
  prevPath,
  prevTreeIndex,
  nextPath,
  nextTreeIndex
}) => {
  if (node.parentId) {
    deleteSponser(node.id)
  }
  createSponser(node.id, nextParentNode.id)
};

const mergeById = (a, b) => {
  return a.map((itm) => ({
    ...b.find(item => item && (item.id === itm.id)), ...itm
  }))
}

const toNodeData = ({firstName, lastName, id, parentId, jobTitle}) => ({
  id, parentId, title: `${firstName} ${lastName}`, subtitle: jobTitle, expanded: true
})

const listToTree = (data) => {
  let tree = [], childrenOf = {};
  let item, id, parentId;
  for (let i = 0, length = data.length; i < length; i++) {
    item = data[i];
    id = item.id;
    parentId = item.parentId || 0;
    childrenOf[id] = childrenOf[id] || [];
    item.children = childrenOf[id];
    if (parentId != 0) {
      childrenOf[parentId] = childrenOf[parentId] || [];
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  };
  return tree;
}

const Employees = () => {
  const [treeData, setTreeData] = useState([]);
  const getData = () => {
    return new Promise((resolve, reject) => {
      axios.all([ getStriders(), getSponsers() ]).then(axios.spread((striders, sponsers) => {
        const data = _.orderBy(
          mergeById(striders.data, sponsers.data).map(toNodeData),
          ['title'],
          ['asc']
        );
        resolve(listToTree(data));
      })
      ).catch(reject)
    });
  }
  const onChange = (treeData) => setTreeData(treeData)
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

render(<Employees />, document.getElementById("root"));
