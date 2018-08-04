import axios from 'axios';
import {url} from '../globalConf.js';

export class APIService{
  constructor(){
    this.url = url;
  }

  get(endpoint, params) {
    return new Promise((res, rej) => {
      params = params || '';
      axios.get(this.url + `/${endpoint}`,params)
        .then((...args) => res(...args))
        .catch(err => {
          rej(err);
        })
    })
  }
  post(endpoint, params){
    console.log('posting - ', this.url, `/${endpoint}`,params)
    return new Promise((res, rej) =>{
      params = params || '';
      axios.post(this.url + `/${endpoint}`,params)
        .then((...args) => res(...args))
        .catch((err) => {
          rej(err);
        })
    })
  }
  delete(endpoint) {
    return new Promise((res, rej) => {
      axios.delete(this.url + `/${endpoint}`)
        .then((...args) => res(...args))
        .catch(err => {
          rej(err);
        });
    })
  }
}
