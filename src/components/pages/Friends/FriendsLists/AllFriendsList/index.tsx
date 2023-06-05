import getAcceptedFriends from '@/common/friendsManage/getAcceptedFriends';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import FriendListItem from '../components/FriendListItem';
import ListHeadingSection from '../components/ListHeadingSection';
import { StyledFriendsList, StyledRoot } from '../styles';
import { FriendSidebarListProps } from '../types';

export default function AllFriendsSidebarList({
  setCurrentTab,
  setShownProfile,
  sx,
  ...rootProps
}: FriendSidebarListProps) {
  const { data: loggedUser } = useLoggedUserQuery({});
  if (!loggedUser) return null;
  const allFriends = getAcceptedFriends(loggedUser);
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ListHeadingSection heading='All Friends' setCurrentTab={setCurrentTab} />
      <StyledFriendsList>
        {allFriends.map((user) => (
          <FriendListItem
            key={user.id}
            setShownProfile={setShownProfile}
            userId={user.id}
            mode='friends'
          />
        ))}
      </StyledFriendsList>
    </StyledRoot>
  );
}
