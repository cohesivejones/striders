import { Person, Sponsor } from './api'

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
export const toNodeData = ({firstName, lastName, id, parentId, jobTitle}: Pick<Person & Sponsor, 'firstName' | 'lastName' | 'id' | 'jobTitle' | 'parentId'>) => ({
  id, parentId, title: `${firstName} ${lastName}`, subtitle: jobTitle, expanded: true
})
export const listToTree = (data: TreeObject[] = []) => {
  let childrenOf: Record<string, TreeObject[]> = {};
  return data.reduce((tree: TreeObject[], item: TreeObject) => {
    const id = item.id;
    const parentId = item.parentId;
    childrenOf[id] = childrenOf[id] || [];
    if (parentId) {
      childrenOf[parentId] = childrenOf[parentId] || [];
      childrenOf[parentId].push({...item, children: childrenOf[id]});
    } else {
      tree = [...tree, {...item, children: childrenOf[id]}]
    }
    return tree;
  }, []);
}
export function spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
