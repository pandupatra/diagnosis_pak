'use client'

import React, { useContext, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { StoreContext } from '@/store';

const initValues = (pasien) => {
  return {
    _id: pasien._id,
    nama: pasien.nama || '',
    jenis_kelamin: pasien.jenis_kelamin || '',
    tahun_masuk: pasien.tahun_masuk || '',
    no_riwayat_medis: pasien.no_riwayat_medis || '',
    golongan_darah: pasien.golongan_darah || '',
    tinggi_badan: pasien.tinggi_badan || '',
    berat_badan: pasien.berat_badan || '',
    no_telepon: pasien.no_telepon || '',
    alamat: pasien.alamat || '',
    agama: pasien.agama || '',
    pekerjaan: pasien.pekerjaan || '',
    tanggal_lahir: pasien.tanggal_lahir ? new Date(pasien.tanggal_lahir).toISOString().slice(0, 10) : '',
    nip: pasien.nip || '',
    nik: pasien.nik || '',
    skenario: pasien.skenario || ''
  }
}

const PasienForm = ({ onSubmit }) => {
  const store = useContext(StoreContext)
  const initialValues = useMemo(
    () => initValues(store.pasien.selected),
    [store.pasien]
  )

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          {/* Nama */}
          <div>
            <label htmlFor="nama" className='block w-full text-sm font-medium leading-6 text-gray-900'>Nama</label>
            <div className="mt-2">
              <Field type="text" id="nama" name="nama" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="nama" component="div" />
          </div>
          {/* Jenis Kelamin */}
          <div>
            <div className="mt-1 text-sm leading-6 text-gray-600">
              <label>Jenis Kelamin</label>
            </div>
            <div className="flex items-center gap-x-3">
              <label>
                <Field type="radio" name="jenis_kelamin" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="pria" />
                Pria
              </label>
              <label>
                <Field type="radio" name="jenis_kelamin" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="wanita" />
                Wanita
              </label>
            </div>
          </div>
          {/* Tahun masuk */}
          <div>
            <label htmlFor="tahun_masuk" className='block text-sm font-medium leading-6 text-gray-900'>Tahun masuk</label>
            <div className="mt-2">
              <Field type="number" id="tahun_masuk" name="tahun_masuk" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="tahun_masuk" component="div" />
          </div>
          {/* No riwayat medis */}
          <div>
            <label htmlFor="no_riwayat_medis" className='block text-sm font-medium leading-6 text-gray-900'>No riwayat medis</label>
            <div className="mt-2">
              <Field type="number" id="no_riwayat_medis" name="no_riwayat_medis" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="no_riwayat_medis" component="div" />
          </div>
          {/* Golongan darah */}
          <div>
            <label htmlFor="golongan_darah" className="block text-sm font-medium leading-6 text-gray-900">Golongan darah</label>
            <div className="mt-2">
              <Field as="select" id="golongan_darah" name="golongan_darah" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </Field>
            </div>
          </div>
          {/* Tinggi badan */}
          <div>
            <label htmlFor="tinggi_badan" className='block text-sm font-medium leading-6 text-gray-900'>Tinggi badan (cm)</label>
            <div className="mt-2">
              <Field type="number" min="0" id="tinggi_badan" name="tinggi_badan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="tinggi_badan" component="div" />
          </div>
          {/* Berat badan */}
          <div>
            <label htmlFor="berat_badan" className='block text-sm font-medium leading-6 text-gray-900'>Berat badan (kg)</label>
            <div className="mt-2">
              <Field type="number" min="0" id="berat_badan" name="berat_badan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="berat_badan" component="div" />
          </div>
          {/* No telepon */}
          <div>
            <label htmlFor="no_telepon" className='block text-sm font-medium leading-6 text-gray-900'>No telepon</label>
            <div className="mt-2">
              <Field type="number" id="no_telepon" name="no_telepon" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="no_telepon" component="div" />
          </div>
          {/* Alamat */}
          <div>
            <label htmlFor="alamat" className='block text-sm font-medium leading-6 text-gray-900'>Alamat</label>
            <div className="mt-2">
              <Field as="textarea" id="alamat" name="alamat" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="alamat" component="div" />
          </div>
          {/* Agama */}
          <div>
            <label htmlFor="agama" className='block w-full text-sm font-medium leading-6 text-gray-900'>Agama</label>
            <div className="mt-2">
              <Field as="select" id="agama" name="agama" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="Islam">Islam</option>
                <option value="Kristen Protestan">Kristen Protestan</option>
                <option value="Kristen Katolik">Kristen Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
                <option value="Lainnya">Lainnya</option>
              </Field>
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="agama" component="div" />
          </div>
          {/* Pekerjaan */}
          <div>
            <label htmlFor="pekerjaan" className='block w-full text-sm font-medium leading-6 text-gray-900'>Pekerjaan</label>
            <div className="mt-2">
              <Field type="text" id="pekerjaan" name="pekerjaan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pekerjaan" component="div" />
          </div>
          {/* Tanggal lahir */}
          <div>
            <div className='block text-sm font-medium leading-6 text-gray-900'>
              <label htmlFor='tanggal_lahir'>Tanggal lahir</label>
            </div>
            <Field type="date" name="tanggal_lahir" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          {/* NIP */}
          <div>
            <label htmlFor="nip" className='block text-sm font-medium leading-6 text-gray-900'>NIP</label>
            <div className="mt-2">
              <Field type="number" id="nip" name="nip" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="nip" component="div" />
          </div>
          {/* NIK */}
          <div>
            <label htmlFor="nik" className='block text-sm font-medium leading-6 text-gray-900'>NIK</label>
            <div className="mt-2">
              <Field type="number" id="nik" name="nik" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="nik" component="div" />
          </div>
          {/* Skenario */}
          <div>
            <label htmlFor="skenario" className='block w-full text-sm font-medium leading-6 text-gray-900'>Skenario</label>
            <div className="mt-2">
              <Field as="textarea" id="skenario" name="skenario" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="skenario" component="div" />
          </div>
          <Button variant='contained' type='submit'>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(PasienForm)