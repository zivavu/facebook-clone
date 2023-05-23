import { ListItemButton, Stack, Typography, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  flexDirection: 'row',
  width: '100%',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  '&.Mui-selected .MuiTypography-root': {
    color: theme.palette.primary.main,
  },
}));

export const SectionRoot = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2, 2),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 550,
  fontSize: theme.typography.subtitle1.fontSize,
  lineHeight: theme.typography.subtitle1.lineHeight,
  paddingBottom: theme.spacing(1),
}));
