import { StyledRoot } from './styles';

import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import { useFetchPostsQuery } from '@/features/postsAPI';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ ...rootProps }: HomeWallProps) {
  const { data: posts } = useFetchPostsQuery({});
  const { data: user } = useFetchLoggedUserQuery({});

  return (
    <StyledRoot {...rootProps}>
      {user?.id && <WriteSomethingTile user={user} mb={2} />}
      {posts ? <PostsFeed posts={posts} /> : null}
    </StyledRoot>
  );
}
