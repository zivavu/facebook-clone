import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faComment, faShareSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faBell,
  faBirthdayCake,
  faBriefcase,
  faCaretDown,
  faClapperboard,
  faEllipsis,
  faEnvelope,
  faFileCirclePlus,
  faGlobeAfrica,
  faGraduationCap,
  faHeart,
  faHouse,
  faHouseUser,
  faLocationDot,
  faMagnifyingGlass,
  faMoon,
  faPaperPlane,
  faPenToSquare,
  faPeopleGroup,
  faPhone,
  faPlusCircle,
  faRepeat,
  faRightToBracket,
  faSchool,
  faSun,
  faUser,
  faUserCheck,
  faUserGear,
  faUserPlus,
  faUserTie,
  faUserXmark,
  faUsers,
  faUsersLine,
  faVenusMars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import type { AppProps } from 'next/app';

import { faFacebookMessenger, faGithub } from '@fortawesome/free-brands-svg-icons';

import NavBar from '@/components/organisms/NavBar';
import OpenedChatsPortal from '@/components/organisms/OpenedChatsPortal';
import ThemeModeProvider from '@/design/ThemeModeProvider';
import { store } from '@/redux/store';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Provider } from 'react-redux';
config.autoAddCss = false;

const icons = [
  faShareSquare,
  faHouse,
  faClapperboard,
  faMagnifyingGlass,
  faPeopleGroup,
  faFacebookMessenger,
  faBell,
  faPenToSquare,
  faEllipsis,
  faComment,
  faThumbsUp,
  faCaretDown,
  faMoon,
  faArrowLeft,
  faSun,
  faXmark,
  faAngleRight,
  faAngleLeft,
  faGlobeAfrica,
  faSchool,
  faVenusMars,
  faBirthdayCake,
  faPhone,
  faEnvelope,
  faRepeat,
  faRightToBracket,
  faUserCheck,
  faUserPlus,
  faUserGear,
  faUserXmark,
  faUserTie,
  faUsersLine,
  faHouseUser,
  faUser,
  faUsers,
  faFileCirclePlus,
  faHouse,
  faLocationDot,
  faHeart,
  faGraduationCap,
  faBriefcase,
  faGithub,
  faPaperPlane,
  faPlusCircle,
  faEllipsis,
] as any;
library.add(...icons);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeModeProvider>
            <NavBar />
            <Component {...pageProps} />
            <OpenedChatsPortal />
          </ThemeModeProvider>
        </LocalizationProvider>
      </Provider>
    </>
  );
}
