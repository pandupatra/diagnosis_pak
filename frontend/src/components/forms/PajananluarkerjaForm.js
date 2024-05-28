import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { useMemo } from 'react';

const initValues = (pajananluarkerja) => {
  return {
    pekerjaan_rumah: pajananluarkerja?.pekerjaan_rumah || '',
    hobi: pajananluarkerja?.hobi || '',
    pekerjaan_sampingan: pajananluarkerja?.pekerjaan_sampingan || '',
  }
}

export default function PajananluarkerjaForm({ activePajananluarkerja, onSubmit }) {

  const initialValues = useMemo(
    () => initValues(activePajananluarkerja),
    [activePajananluarkerja]
  )
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          <div>
            <label htmlFor="pekerjaan_rumah" className='block text-sm font-medium leading-6 text-gray-900'>Pekerjaan rumah</label>
            <div className="mt-2">
              <Field as="textarea" id="pekerjaan_rumah" name="pekerjaan_rumah" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pekerjaan_rumah" component="div" />
          </div>

          <div>
            <label htmlFor="hobi" className='block text-sm font-medium leading-6 text-gray-900'>Hobi</label>
            <div className="mt-2">
              <Field as="textarea" id="hobi" name="hobi" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="hobi" component="div" />
          </div>

          <div>
            <label htmlFor="pekerjaan_sampingan" className='block text-sm font-medium leading-6 text-gray-900'>Pekerjaan sampingan</label>
            <div className="mt-2">
              <Field as="textarea" id="pekerjaan_sampingan" name="pekerjaan_sampingan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pekerjaan_sampingan" component="div" />
          </div>

          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}