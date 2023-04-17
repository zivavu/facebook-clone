import { theme } from '@/design/theme';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
	faBell,
	faClapperboard,
	faMagnifyingGlass,
	faPeopleGroup,
	faHouse as fasHouse,
} from '@fortawesome/free-solid-svg-icons';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';

import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; /* eslint-disable import/first */

const icons = [
	fasHouse,
	faClapperboard,
	faMagnifyingGlass,
	faPeopleGroup,
	faFacebookMessenger,
	faBell,
] as any;
library.add(...icons);

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
