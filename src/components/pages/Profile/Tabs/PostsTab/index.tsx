import { Stack, useTheme } from '@mui/material';

import IntroTile from '@/components/molecules/PageTiles/IntroTile';
import PicturesTile from '@/components/molecules/PageTiles/PicturesTile';
import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import PostsFeed from '@/components/organisms/PostsFeed';
import useFetchUsersPosts from '@/hooks/useFetchUsersPosts';
import { PostsTabProps } from './types';

export default function PostsTab({
  userId,
  profileData,
  loggedUser,
  sx,
  ...rootProps
}: PostsTabProps) {
  const { posts, isLoading: arePostsLoading, isError: isPostsError } = useFetchUsersPosts(userId);
  const theme = useTheme();
  return (
    <>
      <Stack direction='row' spacing={2} sx={sx} {...rootProps}>
        {profileData && (
          <Stack
            width='43%'
            spacing={2}
            height='min-content'
            position='sticky'
            top={theme.spacing(9)}>
            <IntroTile user={profileData} />
            <PicturesTile user={profileData} />
            <PicturesTile user={profileData} />
          </Stack>
        )}
        <Stack width='57%' spacing={2}>
          {!!loggedUser && <WriteSomethingTile user={loggedUser} />}
          {!arePostsLoading && !isPostsError && posts && posts.length > 0 ? (
            <PostsFeed posts={posts} isLoading={arePostsLoading} isError={isPostsError}></PostsFeed>
          ) : null}
        </Stack>
      </Stack>
    </>
  );
}
