'use client'

import { Formik, Form, Field, ErrorMessage } from "formik"
import { questions } from "@/data/questions"
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const maxSteps = questions.length - 1

const areAllFieldsFilled = (values) => {
  return Object.values(values).every(value => value !== '');
};

const initialValues = questions.reduce((acc, curr, index) => {
  acc[`question_${index}`] = '';

  // Check if there are follow-up questions
  if (curr.follow_up && Array.isArray(curr.follow_up)) {
    curr.follow_up.forEach((followUp, followUpIndex) => {
      acc[`question_${index}_follow_up_${followUpIndex}`] = '';
    });
  }
  
  return acc;
}, {});

const validationSchema = Yup.object(
  questions.reduce((acc, curr, index) => {
    acc[`question_${index}`] = Yup.string()
      .required('This question is required')
      .oneOf(['yes', 'no'], 'Invalid answer');

    if (curr.follow_up && Array.isArray(curr.follow_up)) {
      curr.follow_up.forEach((followUp, followUpIndex) => {
        acc[`question_${index}_follow_up_${followUpIndex}`] = Yup.string().when(
          `question_${index}`,
          {
            is: 'yes',
            then: () => Yup.string().required('This follow-up question is required if the answer is yes'),
            otherwise: () => Yup.string()
          }
        );
      });
    }

    return acc;
  }, {})
);

export default function ChainForm ({ anamnesis, onSubmit }) {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    if (activeStep < maxSteps) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched }) => (
        <Form className='space-y-4 w-full'>
          {questions.map((q, index) => (
            index == activeStep && (
              <>
              <div key={index}>
                <div className="block w-full text-sm font-medium leading-6 text-gray-900">
                  <label>{q.question}</label>
                </div>
                <div className="flex items-center gap-x-3">
                  <label>
                    <Field type="radio" name={`question_${index}`} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="yes" />
                    Ya
                  </label>
                  <label>
                    <Field type="radio" name={`question_${index}`} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="no" />
                    Tidak
                  </label>
                </div>
                {errors[`question_${index}`] && touched[`question_${index}`] && (
                  <ErrorMessage className='block text-sm font-medium text-red-600' name={`question_${index}`} component="div" />
                )}
              </div>
              {/* Render follow up questions conditionally */}
              {values[`question_${index}`] == "yes" && questions[index].follow_up && (
                questions[index].follow_up.map((fu, fuIndex) => (
                  <div key={fuIndex}>
                    <div className="mt-1 text-sm leading-6 text-gray-600">
                      <label>{fu.question}</label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <label>
                        <Field type="radio" defaultChecked name={`question_${index}_follow_up_${fuIndex}`} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="yes" />
                        Ya
                      </label>
                      <label>
                        <Field type="radio" name={`question_${index}_follow_up_${fuIndex}`} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="no" />
                        Tidak
                      </label>
                    </div>
                    {errors[`question_${index}_follow_up_${fuIndex}`] && touched[`question_${index}_follow_up_${fuIndex}`] && (
                      <ErrorMessage className='block text-sm font-medium text-red-600' name={`question_${index}_follow_up_${fuIndex}`} component="div" />
                    )}
                  </div>
                ))
              )}
              <div className="flex flex-row justify-between">
                <Button disabled={activeStep == 0} variant="contained" type="button" onClick={handleBack}>
                  Back
                </Button>
                <Button 
                  disabled={!values[`question_${index}`]} 
                  variant="contained" 
                  type="button" 
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
              </>
              
            )
          ))}
          {activeStep == maxSteps && (
            <Button disabled={!areAllFieldsFilled(values)} variant="contained" type="Submit">Submit</Button>
          )}
        </Form>
      )}
    </Formik>
    
  )
}