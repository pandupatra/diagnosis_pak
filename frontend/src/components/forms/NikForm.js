import { Formik, Form, Field } from 'formik';
import axios from 'axios'; // You'll need to install axios if you haven't already
import { Button } from '@mui/material';

const initialValues = {
  nik: ""
}

export default function NikForm({ onSubmit }) {

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <div className="mb-4">
            <div className="mt-2">
              <Field id="nik" name="nik" type="number" placeholder="Masukkan NIK" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <Button variant="contained" type="submit">Login</Button>
        </Form>
      )}
    </Formik>
  )
}