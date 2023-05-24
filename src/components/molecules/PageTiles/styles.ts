import { Box, Typography, styled } from '@mui/material';

export const StyledPageTile = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
}));

export const StyledPageTileHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 650,
  fontSize: theme.typography.h6.fontSize,
  lineHeight: theme.typography.h6.fontSize,
  padding: theme.spacing(0.5, 0),
}));
