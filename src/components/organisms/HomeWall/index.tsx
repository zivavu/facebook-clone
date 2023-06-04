import { StyledRoot } from './styles';

import usePostsInfiniteScrolling from '@/common/readData/usePostsInfiniteScrolling';
import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ sx, ...rootProps }: HomeWallProps) {
  const { posts, isError, isLoading, refetchPost } = usePostsInfiniteScrolling({
    type: 'homeWall',
  });

  return (
    <StyledRoot sx={sx} {...rootProps}>
      <WriteSomethingTile mb={2} />
      {posts ? (
        <PostsFeed
          posts={posts}
          isError={isError}
          isLoading={isLoading}
          refetchPost={refetchPost}
        />
      ) : null}
    </StyledRoot>
  );
}
