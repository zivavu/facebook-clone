import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { useFetchUsersBasicInfoQuery } from '@/features/usersBasicInfoAPI';
import { IFriendWithBasicInfo } from '@/types/firend';
import { Box, IconButton, List, ListItemButton, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { StyledHeadingContainer, StyledRoot } from './styles';
import { ContactsSidebarProps } from './types';

export default function ContactsSidebar({ sx, ...rootProps }: ContactsSidebarProps) {
  const { data: userData } = useFetchLoggedUserQuery({});
  const { data: allUsersData } = useFetchUsersBasicInfoQuery({});
  const [friends, setFriends] = useState<IFriendWithBasicInfo[] | []>([]);

  useEffect(() => {
    if (userData && allUsersData) {
      const friendsWithBasicInfo = Object.values(userData.friends.accepted).map((friend) => {
        const friendData = allUsersData[friend.friendId];
        return { basicInfo: friendData, ...friend } as IFriendWithBasicInfo;
      });
      setFriends(friendsWithBasicInfo);
    }
  }, [userData, allUsersData]);

  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <StyledHeadingContainer>
        <Typography variant='subtitle1' fontWeight={400}>
          Contacts
        </Typography>
        <Box
          sx={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <IconButton size='small'>
            <Icon icon='magnifying-glass' size='sm' />
          </IconButton>
          <IconButton size='small'>
            <Icon icon='ellipsis' />
          </IconButton>
        </Box>
      </StyledHeadingContainer>
      <List sx={{ pt: theme.spacing(0) }}>
        {friends.slice(0, 30).map((friend) => {
          return (
            <ListItemButton
              component={Link}
              href={`/profile/${friend.friendId}`}
              key={friend.friendId}
              sx={{ pl: theme.spacing(1) }}>
              <UserAvatar
                userId={friend.friendId}
                useLink={false}
                sx={{ mr: theme.spacing(1.5), width: 36, height: 36 }}
              />
              <Typography variant='body1'>
                {friend.basicInfo.firstName} {friend.basicInfo.lastName}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </StyledRoot>
  );
}
