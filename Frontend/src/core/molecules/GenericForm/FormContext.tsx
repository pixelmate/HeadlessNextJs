import { createContext, useCallback, useState } from 'react';
import * as Yup from 'yup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidationSchema = Yup.ObjectSchema<any>;

type ValidationSchemaState = {
  validationSchema: ValidationSchema | undefined;
  addValidationSchema: (schema: ValidationSchema | undefined) => void;
  clearValidationSchemas: () => void;
};

type FormValidationProviderProps = {
  children: JSX.Element;
};

export const FormValidationContext = createContext<ValidationSchemaState>({
  validationSchema: undefined,
  addValidationSchema: () => null,
  clearValidationSchemas: () => null,
});

function mergeSchemas(schemas: ValidationSchema[]) {
  const [first, ...rest] = schemas;
  return rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first);
}

function FormValidationProvider({ children }: FormValidationProviderProps) {
  const [validationSchemas, setValidationSchema] = useState<ValidationSchema[]>([]);

  const addValidationSchema = useCallback(
    (schema: ValidationSchema) => {
      setValidationSchema([...validationSchemas, schema]);
    },
    [validationSchemas]
  );

  const clearValidationSchemas = () => {
    setValidationSchema([]);
  };

  return (
    <FormValidationContext.Provider
      value={{
        validationSchema: mergeSchemas(validationSchemas),
        addValidationSchema,
        clearValidationSchemas,
      }}
    >
      {children}
    </FormValidationContext.Provider>
  );
}

export default FormValidationProvider;
