interface TreeObject {
  id: string
  parentId: string
  children?: TreeObject[]
}
type ObjectWithId = Required<{id: string}>
export const mergeById = (a: ObjectWithId[], b: ObjectWithId[]) => {
  return a.map((itm) => ({
    ...b.find(item => item && (item.id === itm.id)), ...itm
  }))
}
export const toNodeData = ({firstName, lastName, id, parentId, jobTitle}: {firstName: string, lastName: string, id: string, parentId: string, jobTitle: string}) => ({
  id, parentId, title: `${firstName} ${lastName}`, subtitle: jobTitle, expanded: true
})
export const listToTree = (data: TreeObject[] = []) => {
  let tree: TreeObject[] = []
  let childrenOf: Record<string, TreeObject[]> = {};
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
export function spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
