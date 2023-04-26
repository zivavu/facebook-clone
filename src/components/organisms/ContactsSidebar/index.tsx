import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchUserQuery } from '@/features/userAPI';
import { Box, IconButton, List, ListItemButton, Typography, useTheme } from '@mui/material';
import { StyledHeadingContainer, StyledRoot } from './styles';
import { ContactsSidebarProps } from './types';

export default function ContactsSidebar({ ...rootProps }: ContactsSidebarProps) {
  const { data: userData, isFetching, isLoading } = useFetchUserQuery({});
  const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Box>
        <StyledHeadingContainer>
          <Typography variant='body1' fontWeight={400}>
            Contacts
          </Typography>
          <Box
            sx={{
              width: '20%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <IconButton size='small'>
              <Icon icon='magnifying-glass' size='sm' />
            </IconButton>
            <IconButton size='small'>
              <Icon icon='ellipsis' />
            </IconButton>
          </Box>
        </StyledHeadingContainer>
        <List sx={{ pt: theme.spacing(0) }}>
          {userData?.friends?.slice(0, 30).map((friend) => {
            return (
              <ListItemButton key={friend.basicInfo.profileId} sx={{ pl: theme.spacing(1) }}>
                <UserAvatar
                  sx={{ mr: theme.spacing(1.5), width: 36, height: 36 }}
                  src={friend.basicInfo.profilePicture || ''}
                />
                <Typography variant='body2'>
                  {friend.basicInfo.firstName} {friend.basicInfo.lastName}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </StyledRoot>
  );
}
