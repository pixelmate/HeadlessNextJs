import { GiftOrderProps } from 'core/molecules/GiftOrder/GiftOrder.type';
import { useGiftOrder } from 'hooks/checkout/useGiftOrder';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import { Stack } from 'react-bootstrap';
import Panel from 'core/atoms/Panel';
import { useI18n } from 'next-localization';
import { MAX_GIFT_ORDER_MESSAGE_LENGTH } from 'constants/giftOrder';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const GiftOrderAdd = (props: DeepPartial<GiftOrderProps>) => {
  const { setGiftOrderMessage, setIsGiftOrder, value, messageLettersLeft } = useGiftOrder();
  const { isGiftOrder, giftOrderMessage } = value || {};
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const showTextArea = isGiftOrder || sitecoreContext?.pageEditing;
  return (
    <>
      <label className="mx-3 mt-md-2">
        <Stack direction="horizontal" gap={2} className="align-items-stretch">
          <FormCheckInput
            type="checkbox"
            checked={isGiftOrder}
            onChange={(e) => setIsGiftOrder(e.target.checked)}
          />
          <span>{t('GiftOrder_IsAGiftCheckbox')}</span>
        </Stack>
      </label>
      <div hidden={!showTextArea}>
        <Panel panelTitle={props?.fields?.Title?.value as string} panelType="secondary">
          <textarea
            className="form-control"
            onChange={(e) => setGiftOrderMessage(e.target.value)}
            value={giftOrderMessage}
            maxLength={MAX_GIFT_ORDER_MESSAGE_LENGTH}
            rows={4}
            cols={40}
            style={{ resize: 'none' }}
          />
          <div>{t('GiftOrder_CharacterLimit', { Characters_Left: messageLettersLeft })}</div>
        </Panel>
      </div>
    </>
  );
};
export default GiftOrderAdd;
