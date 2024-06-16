import { makeAutoObservable } from 'mobx';
import api from '@/utils/apiService';

export default class Diagnosis {
  constructor() {
    this.selected = {}

    makeAutoObservable(this)
  }

  setSelected = (diagnosis) => (this.selected = diagnosis);

  *update(data) {
    try {
      const response = yield api.post('/diagnosis/update', data);
      const diagnosis = response.data
      this.setSelected(diagnosis)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(data) {
    try {
      const response = yield api.post('/diagnosis/create', data);
      const diagnosis = response.data
      this.setSelected(diagnosis)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}