import { screen, render } from '@testing-library/react';
import RecentBlogCarousel from './RecentBlogCarousel';

describe('RecentBlogCarousel', () => {
  it('Render RecentBlogCarousel', async () => {
    const props = {
      rendering: {
        componentName: 'RecentBlogCarousel',
      },
      params: {},
      fields: {
        CarouselItems: [
          {
            url: '/components/blogcarousel/recent-blog-carousel/blogtile1',
            fields: {
              CarouselItem: {
                url: '/blogs/b/blog',
                fields: {
                  Title: {
                    value: 'Blog test',
                  },
                  Image: {
                    value: {
                      src: '/-/media/lifeabundance/herobanner/cf-main-img-80.jpg?h=1227&iar=0&w=2038&hash=F0382D5F57B472A2ECCD51DB5D7FC55C',
                      alt: '',
                      width: '2038',
                      height: '1227',
                    },
                  },
                  MobileImage: {
                    value: {
                      src: '/-/media/lifeabundance/herobanner/cf-main-img-mobile.jpg?h=394&iar=0&w=540&hash=DC5F6F106F879B01C0C245C6B7E96227',
                      alt: '',
                      width: '540',
                      height: '394',
                    },
                  },
                },
              },
              FeatureTitle: {
                value: '',
              },
            },
          },
          {
            url: '/components/blogcarousel/recent-blog-carousel/blogtile2',
            fields: {
              CarouselItem: {
                url: '/blogs/b/blog',
                fields: {
                  Title: {
                    value: 'Blog test',
                  },
                  Image: {
                    value: {
                      src: '/-/media/lifeabundance/herobanner/cf-main-img-80.jpg?h=1227&iar=0&w=2038&hash=F0382D5F57B472A2ECCD51DB5D7FC55C',
                      alt: '',
                      width: '2038',
                      height: '1227',
                    },
                  },
                  MobileImage: {
                    value: {
                      src: '/-/media/lifeabundance/herobanner/cf-main-img-mobile.jpg?h=394&iar=0&w=540&hash=DC5F6F106F879B01C0C245C6B7E96227',
                      alt: '',
                      width: '540',
                      height: '394',
                    },
                  },
                },
              },
              FeatureTitle: {
                value: '<h3 style="margin-top: 20px;">3 Recipes To Start The Year Off Healthy</h3>',
              },
            },
          },
        ],
        Title: {
          value: 'RECENT BLOG POSTS',
        },
      },
    };
    const { container } = render(<RecentBlogCarousel {...props} />);
    const title = screen.getByText('RECENT BLOG POSTS');
    const image = container.querySelector('img');
    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
