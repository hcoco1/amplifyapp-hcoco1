/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NoteCreateFormInputValues = {
    auditor?: string;
    period?: string;
    username?: string;
    afe?: string;
    process?: string;
    error?: string;
    coaching?: string;
    durable?: string;
    image?: string;
};
export declare type NoteCreateFormValidationValues = {
    auditor?: ValidationFunction<string>;
    period?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
    afe?: ValidationFunction<string>;
    process?: ValidationFunction<string>;
    error?: ValidationFunction<string>;
    coaching?: ValidationFunction<string>;
    durable?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NoteCreateFormOverridesProps = {
    NoteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    auditor?: PrimitiveOverrideProps<SelectFieldProps>;
    period?: PrimitiveOverrideProps<SelectFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    afe?: PrimitiveOverrideProps<TextFieldProps>;
    process?: PrimitiveOverrideProps<TextFieldProps>;
    error?: PrimitiveOverrideProps<TextFieldProps>;
    coaching?: PrimitiveOverrideProps<TextFieldProps>;
    durable?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NoteCreateFormProps = React.PropsWithChildren<{
    overrides?: NoteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NoteCreateFormInputValues) => NoteCreateFormInputValues;
    onSuccess?: (fields: NoteCreateFormInputValues) => void;
    onError?: (fields: NoteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NoteCreateFormInputValues) => NoteCreateFormInputValues;
    onValidate?: NoteCreateFormValidationValues;
} & React.CSSProperties>;
export default function NoteCreateForm(props: NoteCreateFormProps): React.ReactElement;
