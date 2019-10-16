import * as axios from 'axios';

interface Response<T> {
  data: T
}
type AsyncResponse<T> = Promise<Response<T>>

export interface Person {
  id: string
  firstName: string
  lastName: string
  jobTitle: string
}
export interface Sponser {
  id: string
  parentId: string
}
export const getStriders = (): AsyncResponse<Person[]> => axios.request({
  method: 'get', url: 'http://localhost:4000/people'
});
export const getSponsers = (): AsyncResponse<Sponser[]> => axios.request({
  method: 'get', url: 'http://localhost:4001/sponsers'
});
export const deleteSponser = (sponseeId: string): AsyncResponse<null> => axios.request({
  method: 'delete', 
  url: `http://localhost:4001/sponsers/${sponseeId}/delete`
});
export const createSponser = (sponseeId: string, sponserId: string): AsyncResponse<Sponser> => axios.request({
  method: 'post',
  url: 'http://localhost:4001/sponsers/create', 
  data: { id: sponseeId, parentId: sponserId }
});
