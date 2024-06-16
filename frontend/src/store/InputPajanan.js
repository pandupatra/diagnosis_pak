import { makeAutoObservable } from 'mobx';
import api from '@/utils/apiService';

export default class InputPajanan {
  constructor() {
    this.selected = {}

    makeAutoObservable(this)
  }

  setSelected = (inputpajanan) => (this.selected = inputpajanan);

  *update(data) {
    try {
      const response = yield api.post('/inputpajanan/update', data);
      const inputpajanan = response.data
      this.setSelected(inputpajanan)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(data) {
    try {
      const response = yield api.post('/inputpajanan/create', data);
      const inputpajanan = response.data
      this.setSelected(inputpajanan)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}