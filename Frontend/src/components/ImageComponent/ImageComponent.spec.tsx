import { screen, render } from '@testing-library/react';
import ImageComponent from './ImageComponent';

describe('ImageComponent', () => {
  it('Render ImageComponent', async () => {
    const props = {
      rendering: {
        componentName: 'ImageComponent',
      },
      params: {},
      fields: {
        Image: {
          value: {
            src: 'https://cd.lifeabundance.localhost/-/media/lifeabundance/herobanner/cf-main-img-80.jpg?h=1227&iar=0&w=2038&hash=BCDBB3E9BD67DFF658F442BEDCCB0385',
            alt: 'desktop',
            width: '2038',
            height: '1227',
          },
        },
        MobileImage: {
          value: {
            src: 'https://cd.lifeabundance.localhost/-/media/lifeabundance/herobanner/cf-main-img-mobile.jpg?h=394&iar=0&w=540&hash=A2C468F2C58E5E045B6CCDCADF4B987D',
            alt: 'mobile',
            width: '540',
            height: '394',
          },
        },
        Title: {
          value:
            'Giving your pets enough vitamins and minerals is possible with the help of pet supplements.',
        },
      },
    };
    render(<ImageComponent {...props} />);
    const ImageTitle = screen.getAllByText(
      'Giving your pets enough vitamins and minerals is possible with the help of pet supplements.'
    );
    expect(ImageTitle[0]).toBeInTheDocument();
    const Image = screen.getByAltText('desktop');
    expect(Image).toBeInTheDocument();
    const MobileImage = screen.getByAltText('mobile');
    expect(MobileImage).toBeInTheDocument();
  });
});
