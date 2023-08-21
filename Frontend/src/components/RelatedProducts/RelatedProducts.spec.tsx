import { screen, render } from '@testing-library/react';
import RelatedProducts from './RelatedProducts';

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  Image: (props: { field: { value: { alt: string; src: string } } }) => (
    <img src={props.field.value.src} alt={props.field.value.alt} />
  ),
  Text: (props: { field: { value: string } }) => {
    return props.field.value;
  },
}));
describe('RelatedProducts', () => {
  const props = {
    uid: '4a9a69f8-ff33-4b3b-b28c-431fa2f16c0c',
    componentName: 'RelatedProducts',
    fields: {
      RelatedProducts: [
        {
          id: '3581bc38-f2e2-4aff-aa5e-27d196ac3b94',
          url: '/products/cats/test-cat-product-1',
          fields: {
            Title: {
              value: 'Product',
            },
            Image: {
              value: {
                src: '/-/media/lifeabundance/data/media/img/jss_logo.png?iar=0&hash=5AD074C6932BCB7A5E92D9552EDD2A48',
                alt: 'jss_logo',
              },
            },
          },
        },
        {
          id: 'eeb55f9e-448c-4c12-8845-a6457a24377a',
          url: '/products/dogs/test-dog-product-1',
          fields: {
            Title: {
              value: 'Title',
            },
            Image: {
              value: {
                src: '/-/media/lifeabundance/data/media/img/jss_logo.png?iar=0&hash=5AD074C6932BCB7A5E92D9552EDD2A48',
                alt: 'jss_logo2',
              },
            },
          },
        },
      ],
      Title: {
        value: 'You',
      },
    },
  };
  it('Render Related Products Component', async () => {
    render(<RelatedProducts {...props} />);
    const Title = screen.getByText('You');
    expect(Title).toBeInTheDocument();
  });
  it('Render Related Product title', async () => {
    render(<RelatedProducts {...props} />);
    const productTitle = screen.getAllByText('Product');
    expect(productTitle[0]).toBeInTheDocument();
  });
  it('Render Related Product Image', async () => {
    render(<RelatedProducts {...props} />);
    const Image = screen.getAllByAltText('jss_logo2');
    expect(Image[0]).toBeInTheDocument();
  });
});
