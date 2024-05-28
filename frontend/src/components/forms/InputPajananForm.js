import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { useMemo } from 'react';

const initValues = (inputpajanan) => {
  return {
    deskripsi_pekerjaan: inputpajanan?.deskripsi_pekerjaan || '',
    periode_waktu: inputpajanan?.periode_waktu || '',
    pajanan: inputpajanan?.pajanan || '',
    produk: inputpajanan?.produk || '',
    bahan: inputpajanan?.bahan || '',
    cara_kerja: inputpajanan?.cara_kerja || '',
    proses_kerja: inputpajanan?.proses_kerja || '',
    riwayat_kecelakaan_kerja: inputpajanan?.riwayat_kecelakaan_kerja || '',
    apd: inputpajanan?.apd || '',
  }
}

export default function InputPajananForm({ activeInputpajanan, onSubmit }) {

  const initialValues = useMemo(
    () => initValues(activeInputpajanan),
    [activeInputpajanan]
  )
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          <div>
            <label htmlFor="deskripsi_pekerjaan" className='block text-sm font-medium leading-6 text-gray-900'>Deskripsi Pekerjaan</label>
            <div className="mt-2">
              <Field as="textarea" id="deskripsi_pekerjaan" name="deskripsi_pekerjaan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="deskripsi_pekerjaan" component="div" />
          </div>

          <div>
            <label htmlFor="periode_waktu" className='block text-sm font-medium leading-6 text-gray-900'>Periode Waktu</label>
            <div className="mt-2">
              <Field type="text" id="periode_waktu" name="periode_waktu" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="periode_waktu" component="div" />
          </div>

          <div>
            <label htmlFor="pajanan" className='block text-sm font-medium leading-6 text-gray-900'>Pajanan</label>
            <div className="mt-2">
              <Field as="textarea" id="pajanan" name="pajanan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pajanan" component="div" />
          </div>

          <div>
            <label htmlFor="bahan" className='block text-sm font-medium leading-6 text-gray-900'>Bahan</label>
            <div className="mt-2">
              <Field as="textarea" id="bahan" name="bahan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="bahan" component="div" />
          </div>

          <div>
            <label htmlFor="cara_kerja" className='block text-sm font-medium leading-6 text-gray-900'>Cara Kerja</label>
            <div className="mt-2">
              <Field as="textarea" id="cara_kerja" name="cara_kerja" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="cara_kerja" component="div" />
          </div>

          <div>
            <label htmlFor="proses_kerja" className='block text-sm font-medium leading-6 text-gray-900'>Proses Kerja</label>
            <div className="mt-2">
              <Field as="textarea" id="proses_kerja" name="proses_kerja" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="proses_kerja" component="div" />
          </div>

          <div>
            <label htmlFor="riwayat_kecelakaan_kerja" className='block text-sm font-medium leading-6 text-gray-900'>Riwayat Kecelakaan Kerja</label>
            <div className="mt-2">
              <Field as="textarea" id="riwayat_kecelakaan_kerja" name="riwayat_kecelakaan_kerja" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="riwayat_kecelakaan_kerja" component="div" />
          </div>

          <div>
            <label htmlFor="apd" className='block text-sm font-medium leading-6 text-gray-900'>APD</label>
            <div className="mt-2">
              <Field as="textarea" id="apd" name="apd" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="apd" component="div" />
          </div>

          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}