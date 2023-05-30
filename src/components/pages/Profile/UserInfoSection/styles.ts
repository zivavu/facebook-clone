import { Box, ButtonBase, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  position: 'relative',
}));

export const StyledProfilePictureButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  minHeight: '174px',
  minWidth: '174px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: `4px solid ${theme.palette.background.paper}`,
  backgroundColor: theme.palette.background.paper,
  transform: 'translateY(-20%)',
}));

export const StyledBasicInfoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: theme.spacing(2),
  paddingRight: `${theme.spacing(0)} !important`,
}));
