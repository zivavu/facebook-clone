import TextAccountDetail from '../AccountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function JobTitle({
  userData,
  iconSize,
  showPlaceholder,
  sx,
  ...rootProps
}: CategoryProps) {
  const { jobTitle } = userData.about;
  const accountDetail: ITextAccountDetail = {
    label: 'Job title',
    value: jobTitle || null,
    icon: 'user-tie',
    placeholder: 'Title not specified',
  };
  return (
    <TextAccountDetail
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      iconSize={iconSize}
      sx={sx}
      {...rootProps}
    />
  );
}