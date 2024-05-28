import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { useMemo } from 'react';

const initValues = (anamnesis) => {
  return {
    pemeriksaan_fisik: anamnesis?.pemeriksaan_fisik || '',
    tingkat_pernapasan: anamnesis?.tingkat_pernapasan || '',
    abdomen: anamnesis?.abdomen || '',
    tekanan_darah: anamnesis?.tekanan_darah || '',
    pemeriksaan_penunjang: anamnesis?.pemeriksaan_penunjang || ''
  }
}

export default function AnamnesisForm({ activeGejala, activeAnamnesis, onSubmit }) {

  const initialValues = useMemo(
    () => initValues(activeAnamnesis),
    [activeAnamnesis]
  )
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          <div>
            <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Pemeriksaan Fisik</label>
            <div className="mt-2">
              <Field as="textarea" id="pemeriksaan_fisik" name="pemeriksaan_fisik" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pemeriksaan_fisik" component="div" />
          </div>

          <div>
            <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala Tetanus: {activeGejala.gejala_tetanus} </label>
            <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala Tuberkulosis: {activeGejala.gejala_tuberkulosis} </label>
            <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala Hepatitis A: {activeGejala.gejala_hepatitis_a} </label>
            <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala Hepatitis C: {activeGejala.gejala_hepatitis_c} </label>
          </div>

          <div>
            <label htmlFor="tingkat_pernapasan" className='block text-sm font-medium leading-6 text-gray-900'>Tingkat Pernapasan</label>
            <div className="mt-2">
              <Field as="textarea" id="tingkat_pernapasan" name="tingkat_pernapasan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="tingkat_pernapasan" component="div" />
          </div>

          <div>
            <label htmlFor="abdomen" className='block text-sm font-medium leading-6 text-gray-900'>Abdomen</label>
            <div className="mt-2">
              <Field as="textarea" id="abdomen" name="abdomen" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="abdomen" component="div" />
          </div>

          <div>
            <label htmlFor="tekanan_darah" className='block text-sm font-medium leading-6 text-gray-900'>Tekanan Darah</label>
            <div className="mt-2">
              <Field as="textarea" id="tekanan_darah" name="tekanan_darah" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="tekanan_darah" component="div" />
          </div>

          <div>
            <label htmlFor="pemeriksaan_penunjang" className='block text-sm font-medium leading-6 text-gray-900'>Pemeriksaan Penunjang</label>
            <div className="mt-2">
              <Field as="textarea" id="pemeriksaan_penunjang" name="pemeriksaan_penunjang" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pemeriksaan_penunjang" component="div" />
          </div>

          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}