import { makeAutoObservable } from 'mobx';
import api from '@/utils/apiService';

export default class Anamnesis {
  constructor() {
    this.selected = {}

    makeAutoObservable(this)
  }

  setSelected = (anamnesis) => (this.selected = anamnesis);

  get isGejalaSubmitted() {
    return !!this.selected.gejalaSubmitted;
  }

  *fetch(pasienId) {
    try {
      const response = yield api.get(`/anamnesis/${pasienId}`);
      const anamnesis = response.data
      this.setSelected(anamnesis)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *update(data) {
    try {
      const response = yield api.post('/anamnesis/update', data);
      const anamnesis = response.data
      this.setSelected(anamnesis)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(data) {
    try {
      const response = yield api.post('/anamnesis/create', data);
      const anamnesis = response.data
      this.setSelected(anamnesis)

      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}