import { render, screen } from '@testing-library/react';
import BlogFacets from './BlogFacets';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Search_BlogCategoryList: 'Category List',
      }[text];
    },
  }),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockReturnValue({
    isLoading: false,
    isError: false,
    data: {
      category: [
        {
          FacetTitle: 'Healthy Living',
          FacetQueryValue: 'Healthy+Living',
          AggregateCount: 2,
        },
        {
          FacetTitle: 'Pet Advice & Ideas',
          FacetQueryValue: 'Pet+Advice+%26+Ideas',
          AggregateCount: 2,
        },
      ],
    },
    error: null,
  }),
}));

const props = {
  rendering: {
    uid: 'b9a75a41-c224-4bf5-8a01-53c9e4b69d02',
    componentName: 'BlogFacets',
    fields: {
      ApiEndpoint: {
        id: '13bff970-3231-4f9f-8f02-481bc438c8ed',
        name: 'BlogCategoryFacets',
        fields: {
          Value: {
            value: 'http://localhost:3000/categories',
          },
        },
      },
      SearchPage: {
        value: {
          href: '/blogs',
          id: '{A402FD4C-D1BC-48E6-A47F-D65ADE6D059C}',
        },
      },
    },
  },
  params: {},
  fields: {
    ApiEndpoint: {
      id: '13bff970-3231-4f9f-8f02-481bc438c8ed',
      fields: {
        Value: {
          value: 'http://localhost:3000/categories',
        },
      },
    },
    SearchPage: {
      value: {
        href: '/blogs',
        text: '',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{A402FD4C-D1BC-48E6-A47F-D65ADE6D059C}',
      },
    },
  },
};

describe('BlogFacets Component', () => {
  it('Should render the component with category list', async () => {
    render(<BlogFacets {...props} />);
    const title = await screen.getByText('Category List');
    const list1 = await screen.getByText('Healthy Living (2)');
    expect(title).toBeInTheDocument();
    expect(list1).toBeInTheDocument();
  });
});
