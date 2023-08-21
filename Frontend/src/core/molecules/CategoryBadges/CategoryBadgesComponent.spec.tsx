import { render, screen } from '@testing-library/react';
import CategoryBadges from './CategoryBadgesComponent';
const props = {
  rendering: {
    componentName: 'CategoryBadges',
  },
  params: {},
  fields: {
    Badges: [
      {
        id: 'b8c341ba-251e-4c12-b8d6-60eaa46f07f5',
        fields: {
          Icon: {
            value: {
              src: '/-/media/lifeabundance/category-badges/ppl-icon-sustainable.svg?h=120&iar=0&w=120&hash=0C915529999CA9F6D3399B5A3F34BC8D',
              alt: 'ppl-icon-sustainable',
              width: '120',
              height: '120',
            },
          },
          Text: {
            value: 'SUSTAINABLE',
          },
        },
      },
      {
        id: 'ef62b0ba-51e2-4a57-8e66-7ee184886650',
        fields: {
          Icon: {
            value: {
              src: '/-/media/lifeabundance/category-badges/ppl-icon-health.svg?h=120&iar=0&w=120&hash=F7ECECF06018C10FAA976111D82FD7BF',
              alt: 'ppl-icon-health',
              width: '120',
              height: '120',
            },
          },
          Text: {
            value: 'HEALTHY',
          },
        },
      },
      {
        id: 'bd58f1fe-d0dd-495a-826e-58f7f0980427',
        fields: {
          Icon: {
            value: {
              src: '/-/media/lifeabundance/category-badges/ppl-icon-conscious.svg?h=120&iar=0&w=120&hash=C3492A171AC5D2672931D9295CB4197B',
              alt: 'ppl-icon-conscious',
              width: '120',
              height: '120',
            },
          },
          Text: {
            value: 'CONSCIOUS',
          },
        },
      },
    ],
  },
};
describe('Render CategoryBadges', () => {
  it('Render CategoryBadges Badge Title', () => {
    render(<CategoryBadges {...props} />);
    const title = screen.getByText('SUSTAINABLE');
    expect(title).toBeInTheDocument();
  });
  it('Render CategoryBadges Badge Image', () => {
    render(<CategoryBadges {...props} />);
    const image = screen.getByAltText('ppl-icon-sustainable');
    expect(image).toBeInTheDocument();
  });
});
