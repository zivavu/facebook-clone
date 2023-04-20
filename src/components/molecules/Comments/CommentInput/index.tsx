import { useTheme } from '@mui/material';

import { StyledCommentInput, StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { useState } from 'react';
import { CommentInputProps } from './types';

export default function CommentInput({ ...rootProps }: CommentInputProps) {
  const theme = useTheme();
  const [commentText, setCommentText] = useState<string>('');
  return (
    <StyledRoot {...rootProps}>
      <UserAvatar size={30} sx={{ mr: theme.spacing(0.7) }} />
      <StyledCommentInput
        multiline
        fullWidth
        size='small'
        onChange={(e) => setCommentText(e.target.value)}
        placeholder='Write a comment...'
      >
        {commentText}
      </StyledCommentInput>
    </StyledRoot>
  );
}
