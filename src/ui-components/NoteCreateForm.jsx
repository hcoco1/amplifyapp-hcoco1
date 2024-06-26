/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createNote } from "../graphql/mutations";
const client = generateClient();
export default function NoteCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    period: "",
    username: "",
    afe: "",
    process: "",
    error: "",
    coaching: "",
    durable: "",
    auditor: "",
  };
  const [period, setPeriod] = React.useState(initialValues.period);
  const [username, setUsername] = React.useState(initialValues.username);
  const [afe, setAfe] = React.useState(initialValues.afe);
  const [process, setProcess] = React.useState(initialValues.process);
  const [error, setError] = React.useState(initialValues.error);
  const [coaching, setCoaching] = React.useState(initialValues.coaching);
  const [durable, setDurable] = React.useState(initialValues.durable);
  const [auditor, setAuditor] = React.useState(initialValues.auditor);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPeriod(initialValues.period);
    setUsername(initialValues.username);
    setAfe(initialValues.afe);
    setProcess(initialValues.process);
    setError(initialValues.error);
    setCoaching(initialValues.coaching);
    setDurable(initialValues.durable);
    setAuditor(initialValues.auditor);
    setErrors({});
  };
  const validations = {
    period: [],
    username: [],
    afe: [],
    process: [],
    error: [],
    coaching: [],
    durable: [],
    auditor: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          period,
          username,
          afe,
          process,
          error,
          coaching,
          durable,
          auditor,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const modelFieldsToSave = {
            period: modelFields.period,
            username: modelFields.username,
            afe: modelFields.afe,
            process: modelFields.process,
            error: modelFields.error,
            coaching: modelFields.coaching,
            durable: modelFields.durable,
          };
          await client.graphql({
            query: createNote.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFieldsToSave,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteCreateForm")}
      {...rest}
    >
      <SelectField
        label="Period"
        placeholder="Please select an option"
        isDisabled={false}
        value={period}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              period: value,
              username,
              afe,
              process,
              error,
              coaching,
              durable,
              auditor,
            };
            const result = onChange(modelFields);
            value = result?.period ?? value;
          }
          if (errors.period?.hasError) {
            runValidationTasks("period", value);
          }
          setPeriod(value);
        }}
        onBlur={() => runValidationTasks("period", period)}
        errorMessage={errors.period?.errorMessage}
        hasError={errors.period?.hasError}
        {...getOverrideProps(overrides, "period")}
      >
        <option
          children="1 (6:30 -10:00 PM)"
          value="1 (6:30 -10:00 PM)"
          {...getOverrideProps(overrides, "periodoption0")}
        ></option>
        <option
          children="2 (10:30 PM -02:00 AM)"
          value="2 (10:30 PM -02:00 AM)"
          {...getOverrideProps(overrides, "periodoption1")}
        ></option>
        <option
          children="3 (2:30 AM -05:00 AM)"
          value="3 (2:30 AM -05:00 AM)"
          {...getOverrideProps(overrides, "periodoption2")}
        ></option>
        <option
          children="4 (5:15 AM -07:00 AM)"
          value="4 (5:15 AM -07:00 AM)"
          {...getOverrideProps(overrides, "periodoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Username"
        isRequired={false}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              period,
              username: value,
              afe,
              process,
              error,
              coaching,
              durable,
              auditor,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label="Afe"
        isRequired={false}
        isReadOnly={false}
        value={afe}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              period,
              username,
              afe: value,
              process,
              error,
              coaching,
              durable,
              auditor,
            };
            const result = onChange(modelFields);
            value = result?.afe ?? value;
          }
          if (errors.afe?.hasError) {
            runValidationTasks("afe", value);
          }
          setAfe(value);
        }}
        onBlur={() => runValidationTasks("afe", afe)}
        errorMessage={errors.afe?.errorMessage}
        hasError={errors.afe?.hasError}
        {...getOverrideProps(overrides, "afe")}
      ></TextField>
      <TextField
        label="Process"
        isRequired={false}
        isReadOnly={false}
        value={process}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              period,
              username,
              afe,
              process: value,
              error,
              coaching,
              durable,
              auditor,
            };
            const result = onChange(modelFields);
            value = result?.process ?? value;
          }
          if (errors.process?.hasError) {
            runValidationTasks("process", value);
          }
          setProcess(value);
        }}
        onBlur={() => runValidationTasks("process", process)}
        errorMessage={errors.process?.errorMessage}
        hasError={errors.process?.hasError}
        {...getOverrideProps(overrides, "process")}
      ></TextField>
      <TextField
        label="Error"
        isRequired={false}
        isReadOnly={false}
        value={error}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              period,
              username,
              afe,
              process,
              error: value,
              coaching,
              durable,
              auditor,
            };
            const result = onChange(modelFields);
            value = result?.error ?? value;
          }
          if (errors.error?.hasError) {
            runValidationTasks("error", value);
          }
          setError(value);
        }}
        onBlur={() => runValidationTasks("error", error)}
        errorMessage={errors.error?.errorMessage}
        hasError={errors.error?.hasError}
        {...getOverrideProps(overrides, "error")}
      ></TextField>
      <TextField
        label="Coaching"
        isRequired={false}
        isReadOnly={false}
        value={coaching}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              period,
              username,
              afe,
              process,
              error,
              coaching: value,
              durable,
              auditor,
            };
            const result = onChange(modelFields);
            value = result?.coaching ?? value;
          }
          if (errors.coaching?.hasError) {
            runValidationTasks("coaching", value);
          }
          setCoaching(value);
        }}
        onBlur={() => runValidationTasks("coaching", coaching)}
        errorMessage={errors.coaching?.errorMessage}
        hasError={errors.coaching?.hasError}
        {...getOverrideProps(overrides, "coaching")}
      ></TextField>
      <TextField
        label="Durable"
        isRequired={false}
        isReadOnly={false}
        value={durable}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              period,
              username,
              afe,
              process,
              error,
              coaching,
              durable: value,
              auditor,
            };
            const result = onChange(modelFields);
            value = result?.durable ?? value;
          }
          if (errors.durable?.hasError) {
            runValidationTasks("durable", value);
          }
          setDurable(value);
        }}
        onBlur={() => runValidationTasks("durable", durable)}
        errorMessage={errors.durable?.errorMessage}
        hasError={errors.durable?.hasError}
        {...getOverrideProps(overrides, "durable")}
      ></TextField>
      <SelectField
        label="Label"
        placeholder="Please select an option"
        value={auditor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              period,
              username,
              afe,
              process,
              error,
              coaching,
              durable,
              auditor: value,
            };
            const result = onChange(modelFields);
            value = result?.auditor ?? value;
          }
          if (errors.auditor?.hasError) {
            runValidationTasks("auditor", value);
          }
          setAuditor(value);
        }}
        onBlur={() => runValidationTasks("auditor", auditor)}
        errorMessage={errors.auditor?.errorMessage}
        hasError={errors.auditor?.hasError}
        {...getOverrideProps(overrides, "auditor")}
      >
        <option
          children="Ivan"
          value="Ivan"
          {...getOverrideProps(overrides, "auditoroption0")}
        ></option>
        <option
          children="Yoanli"
          value="Yoanli"
          {...getOverrideProps(overrides, "auditoroption1")}
        ></option>
        <option
          children="Guest"
          value="Guest"
          {...getOverrideProps(overrides, "auditoroption2")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
