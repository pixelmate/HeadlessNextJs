import { Form } from 'react-bootstrap';
import styles from './ProductVariationSelect.module.scss';
import { useRouter } from 'next/router';
import { ProductVariationSelectProps } from './ProductVariationSelect.type';
import { useI18n } from 'next-localization';
import { sortBy } from 'lodash';
export const ProductVariationSelect = (props: ProductVariationSelectProps) => {
  const navigator = useRouter();
  const { t } = useI18n();
  const sortedItems = sortBy(props.productLinks, (item) => {
    const link = item?.fields?.Link?.value?.href;
    if (!link) return 1;
    return navigator.asPath.endsWith(link) ? 0 : 1;
  });

  return (
    <>
      <Form.Label className={styles.variationLabel}>
        {t('Form_Generic_Tag_ChooseABundle')}
      </Form.Label>
      <Form.Select
        data-testid="product-variation-select"
        className={styles.variationSelect}
        onChange={(item) => {
          navigator.push(item.target.value);
        }}
      >
        {sortedItems.map((item) => (
          <option key={item?.id} value={item?.fields?.Link?.value?.href}>
            {item?.fields?.Link?.value?.text}
          </option>
        ))}
      </Form.Select>
    </>
  );
};
