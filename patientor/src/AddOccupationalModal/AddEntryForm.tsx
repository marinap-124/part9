import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField,  DiagnosisSelection } from "../AddEntryModal/FormField";
import { OccupationalFormValues } from "../types";
import { useStateValue } from "../state";


interface Props {
  onSubmit: (values: OccupationalFormValues) => void;
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
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {startDate: "", endDate: ""}
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
        if (!values.employerName) {
          errors.employerName = requiredError;
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
              label="Employer name"
              name="employerName"
              placeholder="employerName"
              component={TextField}
            />

            <Field
              label="Start date"
              name="sickLeave.startDate"
              placeholder="YYYY-MM-DD"
              component={TextField}
            /> 

            <Field
              label="End date"
              name="sickLeave.endDate"
              placeholder="YYYY-MM-DD"
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