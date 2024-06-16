import { makeAutoObservable } from 'mobx';
import api from '@/utils/apiService';

export default class FaktorIndividu {
  constructor() {
    this.selected = {}

    makeAutoObservable(this)
  }

  setSelected = (faktorindividu) => (this.selected = faktorindividu);

  *update(data) {
    try {
      const response = yield api.post('/faktorindividu/update', data);
      const faktorindividu = response.data
      this.setSelected(faktorindividu)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(data) {
    try {
      const response = yield api.post('/faktorindividu/create', data);
      const faktorindividu = response.data
      this.setSelected(faktorindividu)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}