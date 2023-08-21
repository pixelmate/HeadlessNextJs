import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  Path,
  DeepPartial,
  FieldValues,
} from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Schema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

type ServerErrors<T> = {
  [Property in keyof T]: string;
};

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetValues?: TFormValues | DeepPartial<TFormValues> | null;
  className?: string;
  [key: string]: unknown;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormComponent = <TFormValues extends Record<string, any> = Record<string, any>>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  serverError,
  resetValues,
  ...props
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(!!validationSchema && { resolver: yupResolver<any>(validationSchema) }),
    ...(!!useFormProps && useFormProps),
  });
  useEffect(() => {
    if (serverError) {
      Object.entries(serverError).forEach(([key, value]) => {
        methods.setError(key as Path<TFormValues>, {
          type: 'manual',
          message: value,
        });
      });
    }
  }, [serverError, methods]);

  useEffect(() => {
    if (resetValues) {
      methods.reset(resetValues);
    }
  }, [resetValues, methods]);
  return (
    <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate {...props}>
      {children(methods)}
    </Form>
  );
};
