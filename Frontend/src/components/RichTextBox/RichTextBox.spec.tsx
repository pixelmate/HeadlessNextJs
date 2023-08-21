import { screen, render } from '@testing-library/react';
import RichTextBox from './RichTextBox';

describe('RichTextBox', () => {
  it('Render RichTextBox', async () => {
    const props = {
      rendering: {
        componentName: 'RichTextBox',
      },
      params: {},
      fields: {
        Description: {
          value:
            '<h2 style="color: #444444; line-height: 1.2;">Immune Health Function</h2>\r\n<p style="color: #444444; margin: 0px 0px 15px;">When your immune system is low, you&rsquo;re likely to catch a cold or something more severe, like a virus. And your pet&rsquo;s immune system is no different. When a cat or dog&rsquo;s immune system is compromised, they&rsquo;re more susceptible to sickness, too. Without a strong defense, they experience illnesses ranging from generalized inflammation to diabetes - and even cancer.</p>\r\n<p style="color: #444444; background-color: #ffffff; margin: 0px 0px 15px;"><strong>A nutritionally complete pet food is a good first step in boosting immunity, but you can go the extra mile with pet supplements.</strong>&nbsp;Supplements made with powerful antioxidants are integral to building up the strong immune response your pet needs when an infection comes knocking.</p>\r\n<p style="margin: 0px 0px 15px;">Our&nbsp;<a rel="noopener noreferrer" href="https://lifesabundance.com/Pets/Supplements/WellnessFoodSupplement.aspx?realname=&amp;cat=0&amp;hdr=&amp;Ath=False&amp;crt=0&amp;Category=DogDailySupplement_v11(Pet_Base)&amp;Sku=102018&amp;utm_source=blog&amp;utm_medium=article&amp;utm_content=pet-supplements-wellness&amp;utm_campaign=blog-referral" target="_blank" style="color: #05d8d8; background-color: transparent;">Wellness Food Supplement</a>&nbsp;combines a dozen healthy foods rich in important vitamins and minerals (plus guaranteed probiotics) that support an immune system so it&rsquo;s ready to combat any bacteria or virus - all in a convenient, chewable tablet! Think of it as your dog&rsquo;s multivitamin and an easy addition to their healthy to-do list.</p>',
        },
      },
    };
    render(<RichTextBox {...props} />);
    const Description = screen.getByText(/Immune\sHealth/);
    expect(Description).toBeInTheDocument();
  });
});
