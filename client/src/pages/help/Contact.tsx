import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import { contactValidationSchema } from '../../validations/contactValidation'
import { Button, FileInput, Label, TextInput, Textarea } from 'flowbite-react'
import Header from '../../components/Header'

interface contactInterface {
  subject: string,
  body: string,
  file: File | string
}

const initialState : contactInterface = {
  subject: "",
  body: "",
  file: ''
}

const Contact = () => {
  
  const handleSubmit = (values: contactInterface) =>{
    console.log(values)
  }

  return (
   <>
    <Header title='Contact Us' />
    <Formik
      validationSchema={contactValidationSchema}
      initialValues={initialState}
      onSubmit={handleSubmit}
    >
      {({errors, touched}) =>(
        <Form>
          <div className='flex max-w-2xl mt-12 border rounded-lg border-gray-300 p-10 mx-auto flex-col'>
          <div>
          <div className="mb-2 block">
            <Label
              htmlFor="subject"
              value="Name the problem"
            />
          </div>
          <Field as={TextInput}
            color={errors.subject && touched.subject && 'failure'}
            id="subject"
            name='subject'
            placeholder="ERROR ON THE PAGE!"
            required
            type="text"
          />
          <div className='h-7'>
            <ErrorMessage name='subject' component='span' className='text-xs text-red-600' />
          </div>
        </div>
        <div
          id="textarea"
        >
      <div className="mb-2 block">
        <Label
          htmlFor="body"
          value="Tell us more about the problem"
        />
      </div>
      <Field as={Textarea}
        id="body"
        name='body'
        color={errors.body && touched.body && 'failure'}
        placeholder="It doesn't showing products on products page."
        required
        rows={4}
      />
      <div className='h-7'>
        <ErrorMessage name='body' component='span' className='text-red-600 text-xs' />
      </div>
    </div>
    <div
      className="max-w-md"
      id="fileUpload"
    >
      <div className="mb-2 block">
        <Label
          htmlFor="file"
          value="Upload file (photo, docs, pdf of the problem)"
        />
      </div>
      <Field as={FileInput}
        id="file"
        name='file'
        accept=".pdf,.docx,.jpg,.png"
      />
    </div>
        <Button type='submit' className='ml-auto' color='success'>
          Submit
        </Button>
        </div>
        </Form>
      )}

    </Formik>
   </>
  )
}

export default Contact
