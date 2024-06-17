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

  get symptomWithMaxWeight() {
    let labelGejala;
    let objectWithMaxWeight;
    let maxWeight = Math.max(this.selected?.gejala_tuberkulosis?.weight, this.selected?.gejala_hepatitis?.weight, this.selected?.gejala_tetanus?.weight);
    if (maxWeight === this.selected?.gejala_tuberkulosis?.weight) {
      objectWithMaxWeight = this.selected?.gejala_tuberkulosis;
      labelGejala = "tuberkulosis"
    } else if (maxWeight === this.selected?.gejala_tetanus?.weight) {
      objectWithMaxWeight = this.selected?.gejala_tetanus;
      labelGejala = "tetanus"
    } else {
      objectWithMaxWeight = this.selected?.gejala_hepatitis;
      labelGejala = "hepatitis"
    }
    return { labelGejala, ...objectWithMaxWeight }
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