import { IPost } from '@/types/post';
import { BoxProps, SxProps, Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ReactionsPopoverProps {
  sx?: SxProps<Theme>;
  post: IPost;
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
}
