import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectFieldHealthCheckRating, 
  DiagnosisSelection, HealthCheckRatingOption } from "../AddEntryModal/FormField";

import { HealthCheckFormValues, HealthCheckRating } from "../types";
import { useStateValue } from "../state";


interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
  
    const HealthCheckRatingOptions: HealthCheckRatingOption[] = [
        { value: HealthCheckRating.Healthy, label: "Healthy" },
        { value: HealthCheckRating.LowRisk, label: "LowRisk" },
        { value: HealthCheckRating.HighRisk, label: "HighRisk" },
        { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" }
      ];
 

    return (
      <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy
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

            <SelectFieldHealthCheckRating
              label="Health check rating"
              name="healthCheckRating"
              options={HealthCheckRatingOptions}
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