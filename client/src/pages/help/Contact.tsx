import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { contactValidationSchema } from "../../validations/contactValidation";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import Header from "../../components/UI/Header";
import axios from "axios";
import useSelectedPage from "../../hooks/useSelectedPage";

interface contactInterface {
  subject: string;
  bodyText: string;
  file?: File | string;
}

const initialState: contactInterface = {
  subject: "",
  bodyText: "",
};

const Contact = () => {
  const userJSON = localStorage.getItem("user");
  const accessToken = userJSON ? JSON.parse(userJSON).accessToken : "";

  useSelectedPage("Contact Us");

  const handleSubmit = (values: contactInterface) => {
    let formData = new FormData();
    formData.append("subject", values.subject);
    formData.append("bodyText", values.bodyText);
    if (values.file) formData.append("file", values.file);

    axios
      .post("/contact-us", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("Finshed");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header title="Contact Us" />
      <Formik
        initialValues={initialState}
        validationSchema={contactValidationSchema}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          handleSubmit(values);
          values.file = undefined;
          setFieldValue("file", "");
          resetForm();
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="flex max-w-2xl mt-5 border rounded-lg border-gray-300 p-8 mx-auto flex-col">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="subject" value="Name the problem" />
                </div>
                <Field
                  as={TextInput}
                  color={errors.subject && touched.subject && "failure"}
                  id="subject"
                  name="subject"
                  placeholder="ERROR ON THE PAGE!"
                  required
                  type="text"
                />
                <div className="h-7">
                  <ErrorMessage
                    name="subject"
                    component="span"
                    className="text-xs text-red-600"
                  />
                </div>
              </div>
              <div id="textarea">
                <div className="mb-2 block">
                  <Label
                    htmlFor="bodyText"
                    value="Tell us more about the problem"
                  />
                </div>
                <Field
                  as={Textarea}
                  id="bodyText"
                  name="bodyText"
                  className="resize-none"
                  color={errors.bodyText && touched.bodyText && "failure"}
                  placeholder="It doesn't showing products on products page."
                  required
                  rows={4}
                />
                <div className="h-7">
                  <ErrorMessage
                    name="bodyText"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
              </div>
              <div className="mb-4" id="fileUpload">
                <div className="mb-2 block">
                  <Label
                    htmlFor="file"
                    value="Upload file (photo, docs, pdf of the problem)"
                  />
                </div>
                <input
                  type="file"
                  className="border border-gray-300 rounded-lg w-full bg-gray-50"
                  id="file"
                  name="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files)
                      setFieldValue("file", e.currentTarget.files[0]);
                  }}
                  accept=".pdf,.docx,.jpg,.png,.txt"
                />
              </div>
              <Button type="submit" className="ml-auto w-1/4" color="success">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Contact;
