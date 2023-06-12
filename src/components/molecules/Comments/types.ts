import { ICommentMap } from '@/types/comment';
import { TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface CommentsProps extends BoxProps {
  comments: ICommentMap | undefined;
  elementType: TElementType;
  element: IPost | IAccountPicture;
  refetchElement: () => void;
  commentInputRef: React.RefObject<HTMLTextAreaElement | null>;
  maxComments?: number | 'all';
  onlyUniqueUsers?: boolean;
  displayMode?: TDisplayMode;
}
export type TDisplayMode = 'post' | 'picture' | 'feed';
