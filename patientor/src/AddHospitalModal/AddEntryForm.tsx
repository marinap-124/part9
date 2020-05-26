import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField,  DiagnosisSelection } from "../AddEntryModal/FormField";

import { HospitalFormValues } from "../types";
import { useStateValue } from "../state";


interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
  
 

    return (
      <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
        discharge: {date: "", criteria: ""}
      }}

      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const formatError = "Incorrect format";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !Date.parse(values.date) ){
          errors.date  = formatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <Field
              label="Discharge date"
              name="discharge.date"
              placeholder="YYYY-MM-DD"
              component={TextField}
            />

            <Field
              label="Discharge criteria"
              name="discharge.criteria"
              placeholder="criteria"
              component={TextField}
            />            
  
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
  
            
          </Form>
        );
      }}
    </Formik>
    );
  };

  export default AddEntryForm;