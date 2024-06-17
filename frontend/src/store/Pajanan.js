import { makeAutoObservable } from 'mobx';
import api from '@/utils/apiService';

export default class Pajanan {
  constructor() {
    this.selected = {}

    makeAutoObservable(this)
  }

  setSelected = (pajanan) => (this.selected = pajanan);

  *fetch(pasienId) {
    try {
      const response = yield api.get(`/pajanan/${pasienId}`);
      const pajanan = response.data
      this.setSelected(pajanan)

      return { status: 200, data: response.data };
    } catch (error) {
      this.setSelected(null)
      return { status: error?.response?.status };
    }
  }

  *update(data) {
    try {
      const response = yield api.post('/pajanan/update', data);
      const pajanan = response.data
      this.setSelected(pajanan)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(data) {
    try {
      const response = yield api.post('/pajanan/create', data);
      const pajanan = response.data
      this.setSelected(pajanan)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}