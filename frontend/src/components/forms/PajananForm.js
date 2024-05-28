import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { useMemo } from 'react';

const initValues = (pajanan) => {
  return {
    deskripsi_lingkungan_kerja: pajanan?.deskripsi_lingkungan_kerja || '',
    lama_kerja: pajanan?.lama_kerja || '',
    masa_kerja: pajanan?.masa_kerja || '',
    data_plk: pajanan?.data_plk || '',
    data_monitoring_biologis: pajanan?.data_monitoring_biologis || ''
  }
}

export default function PajananForm({ activePajanan, onSubmit }) {

  const initialValues = useMemo(
    () => initValues(activePajanan),
    [activePajanan]
  )
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          <div>
            <label htmlFor="deskripsi_lingkungan_kerja" className='block text-sm font-medium leading-6 text-gray-900'>Deskripsi lingkungan kerja</label>
            <div className="mt-2">
              <Field as="textarea" id="deskripsi_lingkungan_kerja" name="deskripsi_lingkungan_kerja" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="deskripsi_lingkungan_kerja" component="div" />
          </div>

          <div>
            <label htmlFor="lama_kerja" className='block text-sm font-medium leading-6 text-gray-900'>Lama kerja</label>
            <div className="mt-2">
              <Field as="textarea" id="lama_kerja" name="lama_kerja" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="lama_kerja" component="div" />
          </div>

          <div>
            <label htmlFor="masa_kerja" className='block text-sm font-medium leading-6 text-gray-900'>Masa kerja</label>
            <div className="mt-2">
              <Field as="textarea" id="masa_kerja" name="masa_kerja" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="masa_kerja" component="div" />
          </div>

          <div>
            <label htmlFor="data_plk" className='block text-sm font-medium leading-6 text-gray-900'>Data PLK</label>
            <div className="mt-2">
              <Field as="textarea" id="data_plk" name="data_plk" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="data_plk" component="div" />
          </div>

          <div>
            <label htmlFor="data_monitoring_biologis" className='block text-sm font-medium leading-6 text-gray-900'>Data monitoring biologis</label>
            <div className="mt-2">
              <Field as="textarea" id="data_monitoring_biologis" name="data_monitoring_biologis" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="data_monitoring_biologis" component="div" />
          </div>

          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}