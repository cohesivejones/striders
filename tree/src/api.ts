import * as axios from 'axios';

interface Response<T> {
  data: T
}
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
export const getStriders = (): Promise<Response<Person[]>> => axios.request({
  method: 'get', url: 'http://localhost:4000/people'
});
export const getSponsers = (): Promise<Response<Sponser[]>> => axios.request({
  method: 'get', url: 'http://localhost:4001/sponsers'
});
export const deleteSponser = (sponseeId: string): Promise<Response<null>> => axios.request({
  method: 'delete', 
  url: `http://localhost:4001/sponsers/${sponseeId}/delete`
});
export const createSponser = (sponseeId: string, sponserId: string): Promise<Response<Sponser>> => axios.request({
  method: 'post',
  url: 'http://localhost:4001/sponsers/create', 
  data: { id: sponseeId, parentId: sponserId }
});
