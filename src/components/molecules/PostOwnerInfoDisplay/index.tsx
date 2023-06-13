import { IconButton, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { deleteUsersElement } from '@/common/firebase/elements/deleteUsersElement';
import getShortDate from '@/common/misc/dateManagment/getShortDate';
import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useRef, useState } from 'react';
import ElementManageMenu from '../ElementManageMenu';
import { PostOwnerInfoDisplayProps } from './types';

export default function PostOwnerInfoDisplay({
  element,
  elementType,
  refetchElement,
  owner,
  handleOpenEditMode,
  sx,
  ...rootProps
}: PostOwnerInfoDisplayProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const postManageAnchorEl = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleElementDelete() {
    if (!loggedUser || loggedUser.id !== element.ownerId) return;
    await deleteUsersElement({
      elementId: element.id,
      elementType: elementType,
      loggedUser,
    });
    await refetchElement();
    setIsMenuOpen(false);
  }

  const createdAt = element.createdAt;
  if (!owner) return null;
  return (
    <>
      <ElementManageMenu
        ownerId={owner.id}
        anchorEl={postManageAnchorEl.current}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        handleOpenEditMode={() => {
          handleOpenEditMode();
          setIsMenuOpen(false);
        }}
        handleElementDelete={handleElementDelete}
      />
      <StyledRoot sx={sx} {...rootProps}>
        <Stack direction='row' spacing={1} width='100%' pr={1}>
          <UserAvatar userId={owner.id} />
          <Stack justifyContent='center'>
            <UserLink
              userId={owner.id}
              usePopper
              fontWeight={500}
              variant='subtitle2'
              lineHeight='1rem'
            />
            <Typography variant='body2' color={theme.palette.text.secondary}>
              {getShortDate(createdAt.seconds, 'week')}
            </Typography>
          </Stack>
          {loggedUser?.id === element.ownerId && (
            <IconButton
              onClick={() => setIsMenuOpen(true)}
              ref={postManageAnchorEl}
              sx={{
                width: '30px',
                height: '30px',
                marginLeft: 'auto !important',
              }}>
              <Icon icon='ellipsis' fontSize={18} color={theme.palette.text.secondary} />
            </IconButton>
          )}
        </Stack>
      </StyledRoot>
    </>
  );
}
