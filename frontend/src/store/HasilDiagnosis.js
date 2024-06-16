import { makeAutoObservable } from 'mobx';
import api from '@/utils/apiService';

export default class HasilDiagnosis {
  constructor() {
    this.selected = {}

    makeAutoObservable(this)
  }

  setSelected = (hasildiagnosis) => (this.selected = hasildiagnosis);

  *update(data) {
    try {
      const response = yield api.post('/hasildiagnosis/update', data);
      const hasildiagnosis = response.data
      this.setSelected(hasildiagnosis)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(data) {
    try {
      const response = yield api.post('/hasildiagnosis/create', data);
      const hasildiagnosis = response.data
      this.setSelected(hasildiagnosis)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}