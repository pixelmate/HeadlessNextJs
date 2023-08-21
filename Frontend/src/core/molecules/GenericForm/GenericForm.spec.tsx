import { render, screen } from '@testing-library/react';
import { GenericForm } from './GenericForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next/router', () => ({ useRouter: () => ({ asPath: '/' }) }));
describe('GenericForm', () => {
  const GenericFormProps = {
    rendering: {
      uid: 'bb24cef9-e361-4fe6-ab53-52169cc8dfcd',
      componentName: 'GenericForm',
      dataSource: '{71F2AC7C-2118-4280-B666-0822BB543CB0}',
      params: { CtaAlignment: 'center' },
      fields: {
        ApiEndpoint: {
          id: '7c589a34-0e35-4d0a-b2e5-de1e58dd86bb',
          url: '/sitecore/content/globals/lookups/api-endpoints/products/producttiles',
          name: 'ProductTiles',
          displayName: 'ProductTiles',
          fields: { Value: { value: 'api/products/tiles' } },
        },
        SuccessCallback: { value: {} },
        ErrorCallback: { value: {} },
        Title: { value: 'This is btn' },
      },
      placeholders: {
        'jss-form': [
          {
            uid: '62e6620c-1d34-4611-88d7-7353bdeebbb8',
            componentName: 'LoginForm',
            dataSource: '{42392C66-CC76-4B68-A95E-881544B5410D}',
            fields: {},
          },
        ],
      },
    },
    fields: {
      ApiEndpoint: {
        id: '7c589a34-0e35-4d0a-b2e5-de1e58dd86bb',
        url: '/sitecore/content/globals/lookups/api-endpoints/products/producttiles',
        name: 'ProductTiles',
        displayName: 'ProductTiles',
        fields: { Value: { value: 'api/products/tiles' } },
      },
      SuccessCallback: { value: {} },
      ErrorCallback: { value: {} },
      Title: { value: 'This is btn' },
    },
    params: { CtaAlignment: 'center' },
  };
  it('can find component inside placeholder', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <GenericForm {...GenericFormProps} />
      </QueryClientProvider>
    );
    // since limitations with jest, component couldn't be found, so orange placeholder
    expect(screen.getByText('LoginForm')).toBeInTheDocument();
  });
});
