import { Box, InputAdornment, List, TextField, Typography, useTheme } from '@mui/material';

import getChatNewestMessage from '@/common/chatsManage/getChatLastMessage';
import Icon from '@/components/atoms/Icon/Icon';
import ScrollableStack from '@/components/atoms/scrollables/ScrollableStack';
import { useGetUserChatsQuery } from '@/redux/services/loggedUserAPI';
import ListUserButton from './ListUserButton';
import { StyledContentWrapper, StyledRoot } from './styles';
import { ChatsListPopperProps } from './types';

export default function ChatsListPopper({
  sx,
  handleClose,
  open,
  anchorEl,
  ...rootProps
}: ChatsListPopperProps) {
  const theme = useTheme();
  const { data: loggedUserChats } = useGetUserChatsQuery({});
  const sortedChats =
    loggedUserChats &&
    [...loggedUserChats].sort(
      (a, b) =>
        getChatNewestMessage(b).createdAt.seconds - getChatNewestMessage(a).createdAt.seconds,
    );

  return (
    <StyledRoot sx={sx} {...rootProps} open={open} anchorEl={anchorEl}>
      <StyledContentWrapper>
        <ScrollableStack padding={1}>
          <Box p={0.5}>
            <Typography variant='h3' fontWeight={700}>
              Chats
            </Typography>
            <TextField
              variant='outlined'
              size='small'
              fullWidth
              placeholder='Search Contacts'
              InputProps={{
                sx: {
                  fontSize: '1rem',
                  borderRadius: '50px',
                  height: '35px',
                  mt: theme.spacing(1.5),
                  color: theme.palette.text.secondary,
                  fontWeight: 350,
                  backgroundColor: theme.palette.secondary.main,
                },
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon icon='search' fontSize={16} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <List>
            {sortedChats?.map((chat) => (
              <ListUserButton key={chat.id} chat={chat} handlePopperClose={handleClose} />
            ))}
          </List>
        </ScrollableStack>
      </StyledContentWrapper>
    </StyledRoot>
  );
}