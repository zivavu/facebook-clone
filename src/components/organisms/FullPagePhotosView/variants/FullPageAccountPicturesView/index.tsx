import { useUserPicturesByIdQuery } from '@/redux/services/userDataAPI';
import { useEffect, useState } from 'react';
import ElementInfo from '../../ElementInfo';
import FullPagePhotosWrapper from '../../FullPagePhotosWrapper';
import PhotosCarousel from '../../PhotosCarousel';
import { FullPageAccountPicturesViewProps } from './types';

export default function FullPageAccountPicturesView({
  sx,
  initialPhoto,
  ownerId,
  setOpen,
  ...rootProps
}: FullPageAccountPicturesViewProps) {
  const { data: picturesMap, refetch: refetchPictures } = useUserPicturesByIdQuery(ownerId);

  const pictures = picturesMap
    ? Object.values(picturesMap.account)
        .filter((picture) => !!picture.createdAt)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    : [];

  const initialPhotoIndex: number = pictures.findIndex((picture) => picture.id === initialPhoto.id);

  useEffect(() => {
    if (initialPhotoIndex === -1) return setOpen(false);
    setCurrentPictureIndex(initialPhotoIndex);
  }, [picturesMap]);

  const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(initialPhotoIndex);
  const currentPicture = pictures[currentPictureIndex];

  if (!pictures || !currentPicture) return null;
  return (
    <FullPagePhotosWrapper setOpen={setOpen} sx={sx} {...rootProps}>
      <PhotosCarousel
        pictures={pictures.map((picture) => picture.image)}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
        setOpen={setOpen}
      />
      <ElementInfo
        type='accountPicture'
        element={currentPicture}
        refetchElement={refetchPictures}
      />
    </FullPagePhotosWrapper>
  );
}
