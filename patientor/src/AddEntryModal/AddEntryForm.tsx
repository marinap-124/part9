import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { SelectField,  TypeOption } from "./FormField";
 import { Type } from "../types";

 export type EntryFormValues = Type;

interface Props {
  onSubmit: (values: Type) => void;
  onCancel: () => void;
}


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

    const TypeOptions: TypeOption[] = [
        { value: "HealthCheck", label: "HealthCheck" },
        { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
        { value: "Hospital", label: "Hospital" }
      ];  

    return (
      <Formik
      initialValues={{
        type: "HealthCheck",
      }}


      onSubmit={onSubmit}
 
    >
      {() => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={TypeOptions}
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
                >
                  Continue
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