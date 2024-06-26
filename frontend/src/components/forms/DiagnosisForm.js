import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { useContext, useMemo } from 'react';
import { StoreContext } from '@/store';
import { observer } from 'mobx-react-lite';

const initValues = (diagnosis, anamnesis) => {
  // compare the weights
  let objectWithMaxWeight;
  let labelGejala;
  let hasilDiagnosisPak;
  if (anamnesis.gejalaSubmitted) {
    let maxWeight = Math.max(anamnesis?.gejala_tuberkulosis?.weight, anamnesis?.gejala_hepatitis?.weight, anamnesis?.gejala_tetanus?.weight);
    if (maxWeight === anamnesis?.gejala_tuberkulosis?.weight) {
      objectWithMaxWeight = anamnesis?.gejala_tuberkulosis;
      labelGejala = "tuberkulosis"
    } else if (maxWeight === anamnesis?.gejala_tetanus?.weight) {
      objectWithMaxWeight = anamnesis?.gejala_tetanus;
      labelGejala = "tetanus"
    } else {
      objectWithMaxWeight = anamnesis?.gejala_hepatitis;
      labelGejala = "hepatitis"
    }
    hasilDiagnosisPak = `Berdasarkan anamnesis, pasien paling banyak memiliki gejala ${labelGejala} yaitu : ${objectWithMaxWeight?.symptom.join(", ")}`
  }

  return {
    waktu_timbul_gejala: diagnosis?.waktu_timbul_gejala || '',
    pemeriksaan_prakerja: diagnosis?.pemeriksaan_prakerja || '',
    hasil_diagnosis_klinis: diagnosis?.hasil_diagnosis_klinis ? diagnosis?.hasil_diagnosis_klinis : hasilDiagnosisPak || ''
  }
}

export default observer(function DiagnosisForm({ onSubmit }) {
  const store = useContext(StoreContext)

  const initialValues = useMemo(
    () => initValues(store.diagnosis.selected, store.anamnesis.selected),
    [store.diagnosis, store.anamnesis]
  )
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          <div>
            <label htmlFor="waktu_timbul_gejala" className='block text-sm font-medium leading-6 text-gray-900'>Waktu timbul gejala</label>
            <div className="mt-2">
              <Field as="textarea" id="waktu_timbul_gejala" name="waktu_timbul_gejala" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="waktu_timbul_gejala" component="div" />
          </div>

          <div>
            <label htmlFor="pemeriksaan_prakerja" className='block text-sm font-medium leading-6 text-gray-900'>Pemeriksaan pra-kerja</label>
            <div className="mt-2">
              <Field as="textarea" id="pemeriksaan_prakerja" name="pemeriksaan_prakerja" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pemeriksaan_prakerja" component="div" />
          </div>

          <div>
            <label htmlFor="hasil_diagnosis_klinis" className='block text-sm font-medium leading-6 text-gray-900'>Hasil diagnosis klinis</label>
            <div className="mt-2">
              <Field as="textarea" height="100" id="hasil_diagnosis_klinis" name="hasil_diagnosis_klinis" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="hasil_diagnosis_klinis" component="div" />
          </div>

          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
})