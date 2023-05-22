import { IWallElement } from './misc';
import { TReactionType } from './reaction';

export interface IAccountPicture extends IWallElement {
  url: string;
}

export interface IInChatPicture {
  reaction?: TReactionType;
}

export interface IPicturesMap {
  account: {
    [key: string]: IAccountPicture;
  };
  background: {
    [key: string]: IAccountPicture;
  };
}
