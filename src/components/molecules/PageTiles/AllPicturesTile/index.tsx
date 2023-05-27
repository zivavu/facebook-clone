import LoadingPlaceholder from '@/components/atoms/LoadingPlaceholder';
import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/FullPageAccountPicturesView';
import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import { IAccountPicture } from '@/types/picture';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { StyledFullSizePageTile, StyledPageTileHeader } from '../styles';
import PictureButton from './PictureButton';
import { AllPicturesTileProps } from './types';

export default function AllPicturesTile({ profileData, sx, ...rootProps }: AllPicturesTileProps) {
  const theme = useTheme();
  const { isError, isLoading, picturesMap } = useFetchUsersPictures(profileData.id);
  const pictures = picturesMap
    ? Object.values(picturesMap.account).sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    : [];

  const [isFullViewOpen, setIsFullViewOpen] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<IAccountPicture>(pictures[0]);
  const handleOpenFullView = (picture: IAccountPicture) => {
    setCurrentPhoto(picture);
    setIsFullViewOpen(true);
  };

  if (isError) return null;
  return (
    <>
      {isFullViewOpen && (
        <FullPageAccountPicturesView
          initialPhoto={currentPhoto}
          setOpen={setIsFullViewOpen}
          ownerId={profileData.id}
        />
      )}
      <StyledFullSizePageTile
        sx={sx}
        {...rootProps}
        position='relative'
        overflow='hidden'
        minHeight='200px'>
        <StyledPageTileHeader mb={3}>Photos</StyledPageTileHeader>
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <Stack direction='row' flexWrap='wrap' justifyContent='flex-start'>
            {pictures.map((picture) => (
              <Box
                key={picture.id}
                sx={{
                  maxWidth: '20%',
                  flex: `1 0 20%`,
                  border: `4px solid ${theme.palette.secondary.light}`,
                }}>
                <PictureButton
                  key={picture.id}
                  picture={picture}
                  onClick={() => handleOpenFullView(picture)}
                />
              </Box>
            ))}
            {!pictures[0] && (
              <Typography
                variant='h3'
                fontWeight={600}
                color={theme.palette.text.secondary}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                No photos to show
              </Typography>
            )}
          </Stack>
        )}
      </StyledFullSizePageTile>
    </>
  );
}