import { Box, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

export const StyledContentContainer = styled(Stack)(({ theme }) => ({
	color: theme.palette.background.default,
	height: '56px',
	padding: theme.spacing(0, 1.5),
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
}));

export const StyledContentSection = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	width: '30%',
	height: '100%',
}));