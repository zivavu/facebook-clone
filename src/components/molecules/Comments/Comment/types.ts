import { IComment } from '@/types/comment';
import { TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface CommentProps extends BoxProps {
  comment: IComment;
  element: IPost | IAccountPicture;
  elementType: TElementType;
}
