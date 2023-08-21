# GenericForm usage guide

GenericForm is wrapper for other forms which provide `FormContext`

Example form would be this simple form:

```tsx
export const RegistrationForm = () => {
  const { register } = useFormContext();

  return (
    <Form.Group className="mb-3" controlId="registrationForm">
      <Form.Label>Username</Form.Label>
      <Form.Control {...register('username')} type="text" />
      <br />
      <Form.Label>Password</Form.Label>
      <Form.Control {...register('password')} type="password" />
      <br />
      <Form.Label>Age</Form.Label>
      <Form.Control {...register('age')} type="number" />
    </Form.Group>
  );
};
```

You should use methods that come from `useFormContext` and not manage form state inside form components

for more details refer to https://react-hook-form.com/docs/useformcontext

# Dynamic value
To set dynamic value for button with `{{Placeholder}}` inside, set value of  `genericFormDynamicValue` atom inside form component
```tsx
import { genericFormDynamicValue } from 'data/atoms/genericForm';

...
  const [dynamicValue, setDynamicValue] = useAtom(genericFormDynamicValue);
```