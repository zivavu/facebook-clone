import useFetchSinglePostData from '@/common/firebase/readData/useFetchPostData';
import { useState } from 'react';
import ElementInfo from '../../ElementInfo';
import FullPagePhotosWrapper from '../../FullPagePhotosWrapper';
import PhotosCarousel from '../../PhotosCarousel';
import { FullPagePostPicturesViewProps } from './types';

export default function FullPagePostPicturesView({
  sx,
  initialPhoto,
  postId,
  setOpen,
  ...rootProps
}: FullPagePostPicturesViewProps) {
  const { postData: post, refetchPost } = useFetchSinglePostData(postId);

  const [currentPictureIndex, setCurrentPictureIndex] = useState(
    post?.pictures?.indexOf(initialPhoto) || 0,
  );

  if (!post || !post.pictures) return null;
  return (
    <FullPagePhotosWrapper setOpen={setOpen} sx={sx} {...rootProps}>
      <PhotosCarousel
        picturesUrls={post.pictures}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
        setOpen={setOpen}
      />
      <ElementInfo type='post' refetchElement={refetchPost} element={post} />
    </FullPagePhotosWrapper>
  );
}
