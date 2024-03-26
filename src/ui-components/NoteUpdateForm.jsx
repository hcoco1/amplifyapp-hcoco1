/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getNote } from "../graphql/queries";
import { updateNote } from "../graphql/mutations";
const client = generateClient();
export default function NoteUpdateForm(props) {
  const {
    id: idProp,
    note: noteModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    auditor: "",
    period: "",
    username: "",
    afe: "",
    processPath: "",
    error: "",
    coaching: "",
    durable: "",
  };
  const [auditor, setAuditor] = React.useState(initialValues.auditor);
  const [period, setPeriod] = React.useState(initialValues.period);
  const [username, setUsername] = React.useState(initialValues.username);
  const [afe, setAfe] = React.useState(initialValues.afe);
  const [processPath, setProcessPath] = React.useState(
    initialValues.processPath
  );
  const [error, setError] = React.useState(initialValues.error);
  const [coaching, setCoaching] = React.useState(initialValues.coaching);
  const [durable, setDurable] = React.useState(initialValues.durable);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = noteRecord
      ? { ...initialValues, ...noteRecord }
      : initialValues;
    setAuditor(cleanValues.auditor);
    setPeriod(cleanValues.period);
    setUsername(cleanValues.username);
    setAfe(cleanValues.afe);
    setProcessPath(cleanValues.processPath);
    setError(cleanValues.error);
    setCoaching(cleanValues.coaching);
    setDurable(cleanValues.durable);
    setErrors({});
  };
  const [noteRecord, setNoteRecord] = React.useState(noteModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getNote.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getNote
        : noteModelProp;
      setNoteRecord(record);
    };
    queryData();
  }, [idProp, noteModelProp]);
  React.useEffect(resetStateValues, [noteRecord]);
  const validations = {
    auditor: [{ type: "Required" }],
    period: [],
    username: [],
    afe: [],
    processPath: [],
    error: [],
    coaching: [],
    durable: [],
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
          auditor,
          period: period ?? null,
          username: username ?? null,
          afe: afe ?? null,
          processPath: processPath ?? null,
          error: error ?? null,
          coaching: coaching ?? null,
          durable: durable ?? null,
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
          await client.graphql({
            query: updateNote.replaceAll("__typename", ""),
            variables: {
              input: {
                id: noteRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteUpdateForm")}
      {...rest}
    >
      <TextField
        label="Auditor"
        isRequired={true}
        isReadOnly={false}
        value={auditor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              auditor: value,
              period,
              username,
              afe,
              processPath,
              error,
              coaching,
              durable,
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
      ></TextField>
      <TextField
        label="Period"
        isRequired={false}
        isReadOnly={false}
        value={period}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              auditor,
              period: value,
              username,
              afe,
              processPath,
              error,
              coaching,
              durable,
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
      ></TextField>
      <TextField
        label="Username"
        isRequired={false}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              auditor,
              period,
              username: value,
              afe,
              processPath,
              error,
              coaching,
              durable,
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
              auditor,
              period,
              username,
              afe: value,
              processPath,
              error,
              coaching,
              durable,
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
        label="Process path"
        isRequired={false}
        isReadOnly={false}
        value={processPath}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              auditor,
              period,
              username,
              afe,
              processPath: value,
              error,
              coaching,
              durable,
            };
            const result = onChange(modelFields);
            value = result?.processPath ?? value;
          }
          if (errors.processPath?.hasError) {
            runValidationTasks("processPath", value);
          }
          setProcessPath(value);
        }}
        onBlur={() => runValidationTasks("processPath", processPath)}
        errorMessage={errors.processPath?.errorMessage}
        hasError={errors.processPath?.hasError}
        {...getOverrideProps(overrides, "processPath")}
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
              auditor,
              period,
              username,
              afe,
              processPath,
              error: value,
              coaching,
              durable,
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
              auditor,
              period,
              username,
              afe,
              processPath,
              error,
              coaching: value,
              durable,
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
              auditor,
              period,
              username,
              afe,
              processPath,
              error,
              coaching,
              durable: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || noteModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || noteModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
