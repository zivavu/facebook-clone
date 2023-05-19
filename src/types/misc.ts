import { ICommentMap } from './comment';
import { ICreatedAt } from './createdAt';
import { IAccountPicture } from './picture';
import { IPost } from './post';
import { IReactionsMap } from './reaction';

export type TPostOrPictureObj = IPost | IAccountPicture;
export type TPostOrPicture = 'post' | 'picture';

export interface IWallElement {
  id: string;
  ownerId: string;
  //It can be user, page, group, etc.
  wallOwnerId: string;
  createdAt: ICreatedAt;
  text?: string;
  reactions: IReactionsMap;
  comments: ICommentMap;
  shareCount: number;
}

export interface IOptionalId {
  id?: string;
}
