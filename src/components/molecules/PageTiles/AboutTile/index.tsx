import { List, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import HorizontalContentDevider from '@/components/atoms/ContentDeviders/HorizontalContentDevider';
import VerticalContentDevider from '@/components/atoms/ContentDeviders/VerticalContentDevider';
import { useState } from 'react';
import FamilyAndRelationshipsSection from '../AboutTile/Sections/FamilyAndRelationshipsSection';
import OverviewSection from '../AboutTile/Sections/OverviewSection';
import PlacesLived from '../AboutTile/Sections/PlacesLived';
import WorkAndEducationSection from '../AboutTile/Sections/WorkAndEducationSection';
import { StyledFullSizePageTile, StyledPageTileHeader } from '../styles';
import ContactAndBasicInfo from './Sections/ContactsAndBasicInfoSection';
import { StyledListItemButton } from './styles';
import { AboutTileProps, TAboutTileSections } from './types';

export default function AboutTile({ profileData, sx, ...rootProps }: AboutTileProps) {
  const theme = useTheme();
  const [currentSection, setCurrentSection] = useState<TAboutTileSections>('overview');
  const aboutSections: TAboutTileSections[] = [
    'overview',
    'contact and basic info',
    'work and education',
    'family and relationships',
    'places lived',
  ];

  const mainDirection = useMediaQuery(theme.breakpoints.down('md')) ? 'column' : 'row';
  return (
    <StyledFullSizePageTile sx={{ padding: 0, ...sx }} {...rootProps} direction={mainDirection}>
      <Stack width={mainDirection === 'row' ? `max(25%, 250px)` : '100%'} position='relative'>
        <StyledPageTileHeader ml={theme.spacing(2)} mt={theme.spacing(1.5)}>
          About
        </StyledPageTileHeader>
        <List sx={{ paddingX: 1 }}>
          {aboutSections.map((name) => (
            <StyledListItemButton
              key={name}
              selected={name === currentSection}
              onClick={() => setCurrentSection(name)}>
              <Typography
                variant='subtitle2'
                color={theme.palette.text.secondary}
                fontWeight={500}
                textTransform='capitalize'>
                {name}
              </Typography>
            </StyledListItemButton>
          ))}
        </List>
        {mainDirection === 'row' ? (
          <VerticalContentDevider right={0} />
        ) : (
          <HorizontalContentDevider bottom={0} />
        )}
      </Stack>
      <Stack>
        {currentSection === 'overview' && <OverviewSection profileData={profileData} />}
        {currentSection === 'contact and basic info' && (
          <ContactAndBasicInfo profileData={profileData} />
        )}
        {currentSection === 'work and education' && (
          <WorkAndEducationSection profileData={profileData} />
        )}
        {currentSection === 'family and relationships' && (
          <FamilyAndRelationshipsSection profileData={profileData} />
        )}
        {currentSection === 'places lived' && <PlacesLived profileData={profileData} />}
      </Stack>
    </StyledFullSizePageTile>
  );
}
