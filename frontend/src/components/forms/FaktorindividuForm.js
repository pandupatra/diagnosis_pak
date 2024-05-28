import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { useMemo } from 'react';

const initValues = (faktorindividu) => {
  return {
    kebiasaan: faktorindividu?.kebiasaan || '' ,
    riwayat_penyakit_genetik: faktorindividu?.riwayat_penyakit_genetik || '' ,
    riwayat_atopi: faktorindividu?.riwayat_atopi || '' ,
    penyakit_penyerta: faktorindividu?.penyakit_penyerta || '' 
  }
}

export default function FaktorindividuForm({ activePasien, activeFaktorindividu, onSubmit }) {

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  const initialValues = useMemo(
    () => initValues(activeFaktorindividu),
    [activeFaktorindividu]
  )
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>Jenis kelamin: <span className='capitalize'>{activePasien.jenis_kelamin}</span></label>
            <label className='block text-sm font-medium leading-6 text-gray-900'>Usia: {getAge(activePasien.tanggal_lahir)}</label>
          </div>
          <div>
            <label htmlFor="kebiasaan" className='block text-sm font-medium leading-6 text-gray-900'>Kebiasaan</label>
            <div className="mt-2">
              <Field as="textarea" id="kebiasaan" name="kebiasaan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="kebiasaan" component="div" />
          </div>

          <div>
            <label htmlFor="riwayat_penyakit_genetik" className='block text-sm font-medium leading-6 text-gray-900'>Riwayat penyakit genetik</label>
            <div className="mt-2">
              <Field as="textarea" id="riwayat_penyakit_genetik" name="riwayat_penyakit_genetik" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="riwayat_penyakit_genetik" component="div" />
          </div>

          <div>
            <label htmlFor="riwayat_atopi" className='block text-sm font-medium leading-6 text-gray-900'>Riwayat atopi</label>
            <div className="mt-2">
              <Field as="textarea" id="riwayat_atopi" name="riwayat_atopi" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="riwayat_atopi" component="div" />
          </div>

          <div>
            <label htmlFor="penyakit_penyerta" className='block text-sm font-medium leading-6 text-gray-900'>Penyakit penyerta</label>
            <div className="mt-2">
              <Field as="textarea" id="penyakit_penyerta" name="penyakit_penyerta" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="penyakit_penyerta" component="div" />
          </div>

          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}