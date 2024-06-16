import { action, makeObservable, observable } from 'mobx';
import Pasien from './Pasien';
import Anamnesis from './Anamnesis';
import Diagnosis from './Diagnosis';
import FaktorIndividu from './FaktorIndividu';
import HasilDiagnosis from './HasilDiagnosis';
import InputPajanan from './InputPajanan';
import Pajanan from './Pajanan';
import PajananLuarKerja from './Pajananluarkerja';

export default class Store {
  constructor() {
    this.pasien = new Pasien();
    this.anamnesis = new Anamnesis();
    this.diagnosis = new Diagnosis();
    this.faktorindividu = new FaktorIndividu();
    this.hasildiagnosis = new HasilDiagnosis();
    this.inputpajanan = new InputPajanan();
    this.pajanan = new Pajanan();
    this.pajananluarkerja = new PajananLuarKerja();

    makeObservable(this, {
      pasien: observable,
      anamnesis: observable,
      diagnosis: observable,
      faktorindividu: observable,
      hasildiagnosis: observable,
      inputpajanan: observable,
      pajanan: observable,
      pajananluarkerja: observable,
    })
  }
}