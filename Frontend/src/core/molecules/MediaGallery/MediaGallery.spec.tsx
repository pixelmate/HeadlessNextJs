import { render } from '@testing-library/react';
import MediaGalleryModern from './MediaGalleryModern';

describe('Media Gallery', () => {
  it('Render Media Gallery', async () => {
    const props = {
      uid: '38e5bf09-c9bc-4364-baa2-75ab2cbd61ba',
      componentName: 'MediaGallery',
      dataSource: '{FCE972EB-F848-4F88-B79C-C2978F1BC71F}',
      params: {
        Variant: 'Modern',
      },
      fields: {
        MediaGallery: [
          {
            id: '46d243fc-78d6-4d4e-906a-3e5e2de335c1',
            url: '/products/people/clean-beauty/facial-cleanser/page-components/mediagallery/image-1',
            name: 'Image 1',
            displayName: 'Image 1',
            fields: {
              Image: {
                value: {
                  src: '/-/media/lifeabundance/products/people/cleanbeauty/facialcleanser/lifes-abundance-facial-cleanser-02.jpg?h=636&iar=0&w=853&hash=97BB5CA758356805487EE1D7BFDA0CF9',
                  alt: 'lifes-abundance-facial-cleanser-02',
                  width: '853',
                  height: '636',
                },
              },
              VideoLink: {
                value: '',
              },
            },
          },
        ],
      },
    };
    render(<MediaGalleryModern {...props} />);
    const ImageModern = document.getElementsByTagName('img');
    expect(ImageModern).toHaveLength(1);
  });
});
