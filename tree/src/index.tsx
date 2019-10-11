import React, { useState, useEffect } from "react";
import * as ReactDOM from 'react-dom';
import SortableTree, { TreeItem } from "react-sortable-tree";
import * as axios from 'axios';
import _ from 'lodash';
import './styles.css';
import 'react-sortable-tree/style.css';

interface Response<T> {
  data: T
}
interface Person {
  id: string
  firstName: string
  lastName: string
  jobTitle: string
}
interface Sponser {
  id: string
  parentId: string
}
const getStriders = (): Promise<Response<Person[]>> => axios.request({
  method: 'get', url: 'http://localhost:4000/people'
});
const getSponsers = (): Promise<Response<Sponser[]>> => axios.request({
  method: 'get', url: 'http://localhost:4001/sponsers'
});
const deleteSponser = (sponseeId: string): Promise<Response<null>> => axios.request({
  method: 'delete', 
  url: `http://localhost:4001/sponsers/${sponseeId}/delete`
});
const createSponser = (sponseeId: string, sponserId: string): Promise<Response<Sponser>> => axios.request({
  method: 'post',
  url: 'http://localhost:4001/sponsers/create', 
  data: { id: sponseeId, parentId: sponserId }
});

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
    deleteSponser(node.id)
  }
  createSponser(node.id, nextParentNode.id)
};

interface ObjectWithId {
  id: string
  [x: string]: any
}

const mergeById = (a: ObjectWithId[], b: ObjectWithId[]) => {
  return a.map((itm) => ({
    ...b.find(item => item && (item.id === itm.id)), ...itm
  }))
}

const toNodeData = ({firstName, lastName, id, parentId, jobTitle}: {firstName: string, lastName: string, id: string, parentId: string, jobTitle: string}) => ({
  id, parentId, title: `${firstName} ${lastName}`, subtitle: jobTitle, expanded: true
})

interface TreeObject {
  id: string
  parentId: string
  children?: TreeObject[]
}

const listToTree = (data: TreeObject[] = []) => {
  let tree: TreeObject[] = [], childrenOf: { [id: string]: TreeObject[] } = {};
  data.forEach((item: TreeObject) => {
    const id = item.id;
    const parentId = item.parentId;
    childrenOf[id] = childrenOf[id] || [];
    item.children = childrenOf[id];
    if (parentId) {
      childrenOf[parentId] = childrenOf[parentId] || [];
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  });
  return tree;
}

function spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

const Employees = () => {
  const [treeData, setTreeData] = useState([]);
  const getData = (): Promise<TreeItem[]> => {
    return new Promise((resolve, reject) => {
      Promise.all([ getStriders(), getSponsers() ]).then(spread((striders, sponsers) => {
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
