import { Post } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface PostsFeedProps extends BoxProps {
  posts: Post[];
}
