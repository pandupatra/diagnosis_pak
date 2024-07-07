import { makeAutoObservable } from 'mobx';
import api from '@/utils/apiService';

export default class Pasien {
  constructor() {
    this.items = []
    this.selected = {}

    makeAutoObservable(this)
  }

  setSelected = (pasien) => (this.selected = pasien);

  *signin(nik) {
    try {
      const response = yield api.post('/pasien/signin', nik);
      this.items = response.data;
      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *update(data) {
    try {
      const response = yield api.post('/pasien/update', data);
      const pasien = response.data
      this.setSelected(pasien)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(nik) {
    try {
      const response = yield api.post('/pasien/create', nik);
      const pasien = response.data
      this.setSelected(pasien)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}