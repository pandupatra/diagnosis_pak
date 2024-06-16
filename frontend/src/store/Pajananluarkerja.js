import { makeAutoObservable } from 'mobx';
import api from '@/utils/apiService';

export default class PajananLuarKerja {
  constructor() {
    this.selected = {}

    makeAutoObservable(this)
  }

  setSelected = (pajananluarkerja) => (this.selected = pajananluarkerja);

  *update(data) {
    try {
      const response = yield api.post('/pajananluarkerja/update', data);
      const pajananluarkerja = response.data
      this.setSelected(pajananluarkerja)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(data) {
    try {
      const response = yield api.post('/pajananluarkerja/create', data);
      const pajananluarkerja = response.data
      this.setSelected(pajananluarkerja)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}