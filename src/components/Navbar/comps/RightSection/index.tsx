import { Avatar } from '@mui/material';

import { StyledRoot, StyledToggleButton } from './styles';

import Icon from '@/components/Icon/Icon';
import { useState } from 'react';
import { Portal, RightSectionProps } from './types';

export default function RightSection({ sx, classes, ...rootProps }: RightSectionProps) {
	const [currentPortal, setCurrentPortal] = useState<Portal>('none');
	const handleSetPortal = (event: React.MouseEvent<HTMLElement>, portal: Portal) => {
		const newPortal = portal === currentPortal ? 'none' : portal;
		setCurrentPortal(newPortal);
	};
	return (
		<StyledRoot sx={sx} className={classes?.root} {...rootProps}>
			<StyledToggleButton
				value='chats'
				selected={currentPortal === 'chats'}
				onClick={(e) => {
					handleSetPortal(e, 'chats');
				}}
			>
				<Icon icon={['fab', 'facebook-messenger']}></Icon>
			</StyledToggleButton>
			<StyledToggleButton
				value='notifications'
				selected={currentPortal === 'notifications'}
				onClick={(e) => {
					handleSetPortal(e, 'notifications');
				}}
			>
				<Icon icon='bell'></Icon>
			</StyledToggleButton>
			<StyledToggleButton
				value='account'
				selected={currentPortal === 'account'}
				onClick={(e) => {
					handleSetPortal(e, 'account');
				}}
			>
				<Avatar src='https://i.pravatar.cc/300' alt='Avatar' />
			</StyledToggleButton>
		</StyledRoot>
	);
}
