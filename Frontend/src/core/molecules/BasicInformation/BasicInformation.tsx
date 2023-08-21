import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { useUser } from 'data/user';
import { BasicInformationProps } from './BasicInformation.type';
import Placeholders from 'core/atoms/Placeholders/Placeholder';

const BasicInformation = (props: BasicInformationProps): JSX.Element => {
  const { InformationText } = props?.fields || {};
  const { user, isFetched } = useUser();
  if (isFetched) {
    InformationText.value = InformationText?.value
      ?.replace('{{Permanent_Rank}}', user?.xp?.HighRank || '')
      .replace('{{ID_Number}}', user?.xp?.FileNum || '')
      .replace('{{Renewal_Date}}', 'not found'); //TODO replace later in a separate story. Mentioned in LIF-591 comments
  }
  if (!isFetched) {
    return <Placeholders />;
  }
  return <>{user ? <RichText className="h9" field={InformationText} /> : <div />}</>;
};

export default BasicInformation;
