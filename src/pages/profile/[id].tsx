import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import * as Pages from '@/components/pages';
import Page from '@/templates/Page';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const router = useRouter();
  const idParam = router.query.id as string;
  const user = useGetUserBasicInfo(idParam);
  const pageTitle =
    user?.firstName && user.lastName && `${user?.firstName} ${user?.lastName} | Clonedbook`;

  return (
    <Page title={pageTitle} description={`Profile page of ${user?.firstName} ${user?.lastName}`}>
      <Pages.Profile userId={idParam} />
    </Page>
  );
}
