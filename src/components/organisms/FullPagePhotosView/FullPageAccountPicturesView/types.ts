import { IAccountPicture } from '@/types/picture';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPageAccountPicturesViewProps extends BoxProps {
  initialPhoto: number | IAccountPicture;
  ownerId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
