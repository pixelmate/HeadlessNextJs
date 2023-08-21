import { useState } from 'react';
import { useI18n } from 'next-localization';
import GroupTile from 'core/atoms/GroupTile';
import style from './AutoshipUpdate.module.scss';
import useLocalStorage from 'hooks/useLocalStorage';
import AutoshipModal from './AutoshipModal';
import { AutoshipProps } from './Autoship.type';

const AutoshipUpdate = (props: AutoshipProps) => {
  const { AutoshipCheckedText } = props?.fields || {};
  const { t } = useI18n();
  const [autoshipUser] = useLocalStorage<AutoshipUser>('USER');
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <GroupTile
        heading={t('Autoship_Title')}
        btnLabel={t('Autoship_ChangeLabel')}
        handleBtn={handleModal}
      >
        <div className={`${style.autoship} mb-5`}>
          <span className={style.autoship_span}>
            {autoshipUser?.xp?.IsAutoShip
              ? t('Autoship_AutoshipDisplayText', {
                  Frequency: autoshipUser?.xp?.autoshipFrequency,
                })
              : t('Autoship_AutoshipNotSelectedDisplayText')}
          </span>
        </div>
      </GroupTile>
      <AutoshipModal
        showModal={showModal}
        handleClose={handleModal}
        label={AutoshipCheckedText?.value as string}
      />
    </>
  );
};

export default AutoshipUpdate;
