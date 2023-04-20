import { Stack, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { IComment } from '@/types/comment';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { CommentsProps } from './types';

export default function Comments({ comments, user, ...rootProps }: CommentsProps) {
  const uniqueUsersComments: IComment[] = [];
  comments?.forEach((comment) => {
    if (!uniqueUsersComments.find((c) => c.owner.profileId === comment.owner.profileId)) {
      uniqueUsersComments.push(comment);
    }
  });
  const exampleCommentsLength =
    uniqueUsersComments[0]?.commentText?.length +
    (uniqueUsersComments[1]?.commentText?.length || 0);
  const commentsCutIndex = exampleCommentsLength > 300 ? 1 : 2;

  return (
    <StyledRoot {...rootProps}>
      {!!comments && (
        <Stack>
          {uniqueUsersComments.slice(0, commentsCutIndex).map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Stack>
      )}
      <CommentInput user={user} />
    </StyledRoot>
  );
}
