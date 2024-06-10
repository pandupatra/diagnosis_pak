import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Divider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ChainForm from './ChainForm';

const API_ENDPOINT = 'http://localhost:3003'

const initValues = (anamnesis) => {
  return {
    pemeriksaan_fisik: anamnesis?.pemeriksaan_fisik || '',
    tingkat_pernapasan: anamnesis?.tingkat_pernapasan || '',
    abdomen: anamnesis?.abdomen || '',
    tekanan_darah: anamnesis?.tekanan_darah || '',
    pemeriksaan_penunjang: anamnesis?.pemeriksaan_penunjang || ''
  }
}

export default function AnamnesisForm({ activeAnamnesis, setActiveAnamnesis, onSubmit }) {
  const [isGejalaSubmitted, setIsGejalaSubmitted] = useState(false)

  const onChainSubmit = async (values) => {
    const categorizedGejala = {};
    const categorizedWeights = {};

    questions.forEach((question, index) => {
      if (values[`question_${index}`] === 'yes') {
        if (!categorizedWeights[question.type]) {
          categorizedWeights[question.type] = 0;
        }
        categorizedWeights[question.type] += question.weight;

        if (!categorizedGejala[question.type]) {
          categorizedGejala[question.type] = []
        }
        categorizedGejala[question.type].push(question.gejala)

        if (question.follow_up) {
          question.follow_up.forEach((fu, fuIndex) => {
            if (values[`question_${index}_follow_up_${fuIndex}`] === 'yes') {
              if (!categorizedWeights[question.type]) {
                categorizedWeights[question.type] = 0;
              }
              categorizedWeights[question.type] += question.follow_up[fuIndex].weight;

              if (!categorizedGejala[question.type]) {
                categorizedGejala[question.type] = []
              }
              categorizedGejala[question.type].push(question.follow_up[fuIndex].gejala);
            }
          })
        }
      }
    });

    try {
      let endpoint;
      if (activeAnamnesis) {
        anamnesis = {
          _id: activeAnamnesis._id,
          ...anamnesis
        }
        endpoint = `${API_ENDPOINT}/anamnesis/update`
      } else {
        endpoint = `${API_ENDPOINT}/anamnesis/create`
      }
      const response = await axios.post(endpoint, {
        pasien: activePasien._id,
        gejala_tetanus: {
          gejala: categorizedGejala.tetanus,
          weight: categorizedWeights.tetanus,
        },
        gejala_tuberkulosis: {
          gejala: categorizedGejala.tuberkulosis,
          weight: categorizedWeights.tuberkulosis,
        },
        gejala_hepatitis_a: {
          gejala: categorizedGejala.hepatitis_a,
          weight: categorizedWeights.hepatitis_a,
        },
        gejala_hepatitis_c: {
          gejala: categorizedGejala.hepatitis_c,
          weight: categorizedWeights.hepatitis_c
        },
      });
      console.log('Response:', response.data);
      setIsGejalaSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error);
    }

  };

  const initialValues = useMemo(
    () => initValues(activeAnamnesis),
    [activeAnamnesis]
  )

  useEffect(() => {
    setIsGejalaSubmitted(activeAnamnesis?.gejala_hepatitis_a && activeAnamnesis?.gejala_hepatitis_c && activeAnamnesis?.gejala_tetanus && activeAnamnesis?.gejala_tuberkulosis ? true : false)
  }, [activeAnamnesis])
  
  return (
    <>
    {isGejalaSubmitted ?
    <>
    <div className='mb-8'>
      <div className='mb-2'>
        <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala Tetanus: </label>
        <ul className='list-disc my-3 ml-5'>
          {activeAnamnesis.gejala_tetanus.gejala.map((gejala, index) => (
            <li key={index} className='text-sm leading-6 text-gray-900'>{gejala}</li>
          ))}
        </ul>
        <span className='block text-sm font-medium leading-6 text-gray-900'>Bobot: {activeAnamnesis.gejala_tetanus.weight}</span>
        <Divider />
      </div>
      
      <div className='mb-2'>
        <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala Tuberkulosis: </label>
        <ul className='list-disc my-3 ml-5'>
          {activeAnamnesis.gejala_tuberkulosis.gejala.map((gejala, index) => (
            <li key={index} className='text-sm leading-6 text-gray-900'>{gejala}</li>
          ))}
        </ul>
        <span className='block text-sm font-medium leading-6 text-gray-900'>Bobot: {activeAnamnesis.gejala_tuberkulosis.weight}</span>
        <Divider />
      </div>

      <div className='mb-2'>
        <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala Hepatitis A: </label>
        <ul className='list-disc my-3 ml-5'>
          {activeAnamnesis.gejala_hepatitis_a.gejala.map((gejala, index) => (
            <li key={index} className='text-sm leading-6 text-gray-900'>{gejala}</li>
          ))}
        </ul>
        <span className='block text-sm font-medium leading-6 text-gray-900'>Bobot: {activeAnamnesis.gejala_hepatitis_a.weight}</span>
        <Divider />
      </div>

      <div className='mb-2'>
        <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala Hepatitis C: </label>
        <ul className='list-disc my-3 ml-5'>
          {activeAnamnesis.gejala_hepatitis_c.gejala.map((gejala, index) => (
            <li key={index} className='text-sm leading-6 text-gray-900'>{gejala}</li>
          ))}
        </ul>
        <span className='block text-sm font-medium leading-6 text-gray-900'>Bobot: {activeAnamnesis.gejala_hepatitis_c.weight}</span>
        <Divider />
      </div>
      <Button variant="contained" onClick={() => setIsGejalaSubmitted(false)}>Input ulang gejala</Button>
    </div>
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
    </>
    :
      <ChainForm anamnesis={activeAnamnesis} onSubmit={onChainSubmit} />
    }
    </>
  )
}