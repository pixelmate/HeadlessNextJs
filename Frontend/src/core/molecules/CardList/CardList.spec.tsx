import { render, screen } from '@testing-library/react';
import { CardListProps } from './cardList';
import Classic from './Classic';
import Modern from './Modern';
import Neon from './Neon';
import Standard from './Standard';

describe('ComponentName -> CardList', () => {
  it('Should Render Classic Variation', async () => {
    const props = {
      rendering: {
        componentName: 'CardList',
      },
      params: {},
      fields: {
        CardColorContrast: {
          name: 'White Charcoal',
        },
        CardTitleFontColor: {
          name: 'Brown',
        },
        CardList: [
          {
            id: '1',
            fields: {
              Title: {
                value: 'Comprehensive',
              },
              SubTitle: {
                value: '',
              },
              Description: {
                value:
                  '<p>Creating custom formulas for dogs is an art form. Down to the last micronutrient, each ingredient we’ve selected was chosen for more than just its overall benefit, but also for the way it interacts with other ingredients to nourish the body and all its complex systems.</p>',
              },
              Image: {
                value: {},
              },
              Icon: {
                value: {},
              },
              Link: {
                value: {
                  href: '',
                },
              },
            },
          },
        ],
        BackgroundColorContrast: {
          name: 'Pearl Wood',
        },
        Link: {
          value: {
            href: '/blogs/b/blog',
            text: 'SHOP ALL DOG FOODS',
            class: '',
            target: '|Custom',
          },
        },
        CtaColorContrast: {
          name: 'SealBrown White',
        },
      },
    } as CardListProps;

    render(<Classic {...props} />);

    const cardHeading = screen.getByText('Comprehensive');
    const cardDescription = screen.getByText(
      'Creating custom formulas for dogs is an art form. Down to the last micronutrient, each ingredient we’ve selected was chosen for more than just its overall benefit, but also for the way it interacts with other ingredients to nourish the body and all its complex systems.'
    );
    const componentCtaText = screen.getByText('SHOP ALL DOG FOODS');

    expect(cardHeading).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
    expect(componentCtaText).toBeInTheDocument();
  });

  it('Should Render Neon Variation', async () => {
    const props = {
      rendering: {
        componentName: 'CardList',
      },
      params: {},
      fields: {
        CardColorContrast: {
          name: 'Violet White',
        },
        BackgroundColorContrast: {
          name: 'PaleGreen LightGreen',
        },
        CardList: [
          {
            id: '1',
            fields: {
              Title: {
                value: '',
              },
              SubTitle: {
                value: 'Shannon',
              },
              Description: {
                value:
                  '<p>We offer a full line of premium products for dogs and cats including food, treats, supplements and pet care products like shampoo.</p>',
              },
              Image: {
                value: {
                  src: '/_next/image?url=https%3A%2F%2Fcm.lifeabundance.localhost%2F-%2Fmedia%2Flifeabundance%2Fcardlist%2Fbreeders-quotes2.png%3Fh%3D200%26iar%3D0%26w%3D200%26hash%3D3F669F8F315B20F5B754A87E0E4755E3&w=16&q=75',
                },
              },
              Icon: {
                value: {},
              },
              Link: {
                value: {
                  href: '',
                },
              },
            },
          },
        ],
      },
    } as CardListProps;

    render(<Neon {...props} />);

    const cardHeading = screen.getByText('Shannon');
    const cardDescription = screen.getByText(
      'We offer a full line of premium products for dogs and cats including food, treats, supplements and pet care products like shampoo.'
    );

    expect(cardHeading).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
  });

  it('Should Render Standard Variation', async () => {
    const props = {
      rendering: {
        componentName: 'CardList',
      },
      params: {},
      fields: {
        CardColorContrast: {
          name: 'Violet White',
        },
        BackgroundColorContrast: {
          name: 'PaleGreen LightGreen',
        },
        CardList: [
          {
            id: '1',
            fields: {
              Title: {
                value: 'Organic.',
              },
              SubTitle: {
                value: '',
              },
              Description: {
                value:
                  '<p>Made with organic, plant based ingredients. Gentle with no sulfates, chemicals or harmful additives.</p>',
              },
              Image: {
                value: {
                  src: '/_next/image?url=https%3A%2F%2Fcm.lifeabundance.localhost%2F-%2Fmedia%2Flifeabundance%2Fcardlist%2Fcirclegirls_011.png%3Fh%3D220%26iar%3D0%26w%3D220%26hash%3DB8A577B2608814AC48D803599FFD25FC&w=16&q=75',
                },
              },
              Icon: {
                value: {},
              },
              Link: {
                value: {
                  href: '',
                },
              },
            },
          },
        ],
        Title: {
          value: '',
        },
        SubTitle: {
          value: 'Clean Beauty',
        },
        Description: {
          value: '<p>Component Level Description</p>',
        },
      },
    } as CardListProps;

    render(<Standard {...props} />);

    const componentSubTitle = screen.getByText('Clean Beauty');
    const componentDescription = screen.getByText('Component Level Description');
    const cardDescription = screen.getByText(
      'Made with organic, plant based ingredients. Gentle with no sulfates, chemicals or harmful additives.'
    );

    expect(componentSubTitle).toBeInTheDocument();
    expect(componentDescription).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
  });

  it('Should Render Standard Variation', async () => {
    const props = {
      rendering: {
        componentName: 'CardList',
      },
      params: {},
      fields: {
        CardColorContrast: {
          name: 'Violet White',
        },
        BackgroundColorContrast: {
          name: 'PaleGreen LightGreen',
        },
        CardList: [
          {
            id: '1',
            fields: {
              Title: {
                value: 'SUPPLEMENTS',
              },
              SubTitle: {
                value: '',
              },
              Description: {
                value:
                  '<p>Our employee-owners watch over every product until it begins its journey to you from one of our facilities. Made in frequent batches, you can trust that our rigorously developed and thoroughly tested foods will give your dog the bountiful nutrition you’ve been seeking.</p>',
              },
              Image: {
                value: {
                  src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/cardlist/pple-img-sup-80.jpg?h=225&iar=0&w=385&hash=CAD416377B7DB4A2B3FB2F5509D5CCAF',
                },
              },
              Icon: {
                value: {
                  src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/cardlist/pple-icon-supplements.svg?iar=0&hash=F7DB0817E68F1B99BE2537A053B25D1D',
                },
              },
              Link: {
                value: {
                  href: '/',
                  text: 'DISCOVER NUTRITION',
                  target: '|Custom',
                },
              },
            },
          },
        ],
        Title: {
          value: 'Beautiful, inside and out',
        },
        SubTitle: {
          value: 'Modern Variation Sub Title',
        },
        Description: {
          value: 'Modern Variation Description',
        },
      },
    } as CardListProps;

    render(<Modern {...props} />);

    const componentTitle = screen.getByText('Beautiful, inside and out');
    const componentSubTitle = screen.getByText('Modern Variation Sub Title');
    const componentDescription = screen.getByText('Modern Variation Description');
    const cardDescription = screen.getByText(
      'Our employee-owners watch over every product until it begins its journey to you from one of our facilities. Made in frequent batches, you can trust that our rigorously developed and thoroughly tested foods will give your dog the bountiful nutrition you’ve been seeking.'
    );

    expect(componentTitle).toBeInTheDocument();
    expect(componentSubTitle).toBeInTheDocument();
    expect(componentDescription).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
  });
});
