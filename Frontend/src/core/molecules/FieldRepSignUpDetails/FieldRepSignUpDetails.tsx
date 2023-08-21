import { RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { FieldRepSignUpDetailsProps } from './FieldRepSignUpDetails.type';
import { useI18n } from 'next-localization';
import style from './FieldRepSignUpDetails.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserByXpPropertyAndRealname } from 'hooks/useUserBy/useUserBy';
import { ROUTES } from 'utils/routes';
import Placeholders from 'core/atoms/Placeholders';
import classNames from 'classnames';
import { DEFAULT_IS_FULLWIDTH, IS_FULLWIDTH } from 'constants/alignment';
import { omit } from 'lodash';
import { REALNAME } from 'constants/query-key';

const FieldRepSignUpDetails = (props: FieldRepSignUpDetailsProps): JSX.Element => {
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const router = useRouter();
  const { isLoading, sponsor, routerIsReady } = useUserByXpPropertyAndRealname('FileNum');

  const isEditing = sitecoreContext && sitecoreContext?.pageEditing;
  const { fields, params } = props;
  const IsFullWidth = params?.IsFullWidth || DEFAULT_IS_FULLWIDTH;

  useEffect(() => {
    if (!isLoading && routerIsReady && !sponsor) {
      router.push(ROUTES.GENERAL_PROSPECT);
    }

    if (!isLoading && routerIsReady && sponsor && Object.keys(sponsor)?.length > 0) {
      redirectWithoutRealname();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, routerIsReady, sponsor]);

  const redirectWithoutRealname = () => {
    const { pathname } = router;
    router.replace({ pathname, query: omit(router.query, [REALNAME]) }, undefined);
  };

  if (!sponsor && !isEditing) {
    return <Placeholders />;
  }

  return (
    <div
      className={classNames(`mt-4 ${style.field_rep_sign_up_details_wrapper}`, {
        'container p-0': IsFullWidth !== IS_FULLWIDTH,
      })}
    >
      <h1>{fields.Title?.value}</h1>
      <div className={style.sponsor_info}>
        <p>
          {t('FieldRep_SignUp_SponsorInfo', {
            sponsorName:
              sponsor?.FirstName || sponsor?.LastName
                ? `${sponsor?.FirstName || ''} ${sponsor?.LastName || ''}`
                : sponsor?.Username,
          })}
        </p>
      </div>
      <RichText className={`${style.description}`} field={fields.Description} />
    </div>
  );
};
export default FieldRepSignUpDetails;
