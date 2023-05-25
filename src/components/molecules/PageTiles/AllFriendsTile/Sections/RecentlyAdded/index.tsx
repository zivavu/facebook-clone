import { Stack } from '@mui/material';

import useGetUsersPublicFriends from '@/hooks/useFetchUsersPublicFriends';
import { IPublicFriend } from '@/types/firend';
import SingleFriend from '../../SingleFriend';
import { StyledFriendsSectionStack } from '../../styles';
import { SectionProps } from '../../types';

export default function RecentlyAddedSection({ profileId, limit, sx, ...rootProps }: SectionProps) {
  const publicFriends = useGetUsersPublicFriends(profileId);
  const currentDate = new Date();
  const months = 1;
  const recentLimit = 60 * 60 * 24 * 30 * months;
  const friends = Object.entries(publicFriends || {})
    .sort(([idA, timestampA], [idB, timestampB]) => timestampB.seconds - timestampA.seconds)
    .slice(0, limit)
    .map(([id, timestamp]) => {
      return {
        id,
        timestamp,
      } as IPublicFriend;
    })
    .filter((friend) => {
      const friendDate = new Date(friend.timestamp.seconds * 1000 + recentLimit * 1000);
      return currentDate.getTime() < friendDate.getTime();
    });

  return (
    <StyledFriendsSectionStack sx={sx} {...rootProps}>
      {friends.map((friend) => (
        <Stack key={friend.id} width='48%' my={1.5}>
          <SingleFriend friendId={friend.id} />
        </Stack>
      ))}
    </StyledFriendsSectionStack>
  );
}
