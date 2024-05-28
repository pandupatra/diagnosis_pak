import { Button } from "@mui/material"
import { useContext } from "react"
import { PasienContext } from "@/context/PasienContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Formik, Form, Field } from "formik"

const initialValues = {
  nik: ""
}

export default function SignIn() {
  const { setActivePasien } = useContext(PasienContext)
  const router = useRouter()

  const _onSubmit = async (nik) => {
    console.log(nik)
    try {
      const response = await axios.post('http://localhost:3003/pasien/signin', nik)
      console.log(response)
      if (response) {
        setActivePasien(response)
        console.log(response)
        router.push(`/${response.data._id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={_onSubmit}
    >
      {({ values }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="nik" className="block text-sm font-medium leading-6 text-gray-900">Masukkan NIK</label>
            <div className="mt-2">
              <Field id="nik" name="nik" type="number" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}