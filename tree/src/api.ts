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
export interface Sponsor {
  id: string
  parentId: string
}
export const getStriders = (): AsyncResponse<Person[]> => axios.request({
  method: 'get', url: 'http://localhost:4000/people'
});
export const getSponsors = (): AsyncResponse<Sponsor[]> => axios.request({
  method: 'get', url: 'http://localhost:4001/sponsors'
});
export const deleteSponsor = (sponseeId: string): AsyncResponse<null> => axios.request({
  method: 'delete', 
  url: `http://localhost:4001/sponsors/${sponseeId}/delete`
});
export const createSponsor = (sponseeId: string, sponsorId: string): AsyncResponse<Sponsor> => axios.request({
  method: 'post',
  url: 'http://localhost:4001/sponsors/create', 
  data: { id: sponseeId, parentId: sponsorId }
});
