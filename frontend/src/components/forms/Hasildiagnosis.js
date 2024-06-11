import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { useMemo } from 'react';

const initValues = (hasildiagnosis, anamnesis) => {
  // compare the weights
  let objectWithMaxWeight;
  let labelGejala;
  if (anamnesis) {
    let maxWeight = Math.max(anamnesis?.gejala_tuberkulosis.weight, anamnesis?.gejala_hepatitis.weight, anamnesis?.gejala_tetanus.weight);
    if (maxWeight === anamnesis?.gejala_tuberkulosis.weight) {
      objectWithMaxWeight = anamnesis?.gejala_tuberkulosis;
      labelGejala = "tuberkulosis"
    } else if (maxWeight === anamnesis?.gejala_tetanus.weight) {
      objectWithMaxWeight = anamnesis?.gejala_tetanus;
      labelGejala = "tetanus"
    } else {
      objectWithMaxWeight = anamnesis?.gejala_hepatitis;
      labelGejala = "hepatitis"
    }
    
    }
  const hasilDiagnosisPak = `Berdasarkan anamnesis, pasien paling banyak memiliki gejala ${labelGejala} yaitu : ${objectWithMaxWeight?.symptom.join(", ")}`

  return {
    kesimpulan: hasildiagnosis?.kesimpulan || '',
    hasil_diagnosis_pak: anamnesis ? hasilDiagnosisPak : '',
    rekomendasi: hasildiagnosis?.rekomendasi || '',
    evaluasi: hasildiagnosis?.evaluasi || '' 
  }
}

export default function Hasildiagnosis({ activeAnamnesis, activeHasildiagnosis, onSubmit }) {

  const initialValues = useMemo(
    () => initValues(activeHasildiagnosis, activeAnamnesis),
    [activeHasildiagnosis, activeAnamnesis]
  )
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          <div>
            <label htmlFor="kesimpulan" className='block text-sm font-medium leading-6 text-gray-900'>Kesimpulan</label>
            <div className="mt-2">
              <Field as="textarea" id="kesimpulan" name="kesimpulan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="kesimpulan" component="div" />
          </div>

          <div>
            <label htmlFor="hasil_diagnosis_pak" className='block text-sm font-medium leading-6 text-gray-900'>Hasil diagnosis PAK</label>
            <div className="mt-2">
              <Field as="textarea" id="hasil_diagnosis_pak" name="hasil_diagnosis_pak" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="hasil_diagnosis_pak" component="div" />
          </div>

          <div>
            <label htmlFor="rekomendasi" className='block text-sm font-medium leading-6 text-gray-900'>Rekomendasi</label>
            <div className="mt-2">
              <Field as="textarea" id="rekomendasi" name="rekomendasi" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="rekomendasi" component="div" />
          </div>

          <div>
            <label htmlFor="evaluasi" className='block text-sm font-medium leading-6 text-gray-900'>Evaluasi</label>
            <div className="mt-2">
              <Field as="textarea" id="evaluasi" name="evaluasi" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="evaluasi" component="div" />
          </div>

          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}