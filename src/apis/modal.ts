export interface RecommendPlaylistResp {
  code: number;
  featureFirst: boolean;
  haveRcmdSongs: boolean;
  recommend: Recommend[];
}

export interface Recommend {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  playcount: number;
  createTime: number;
  creator: Creator;
  trackCount: number;
  userId: number;
  alg: string;
}

export interface Creator {
  birthday: number;
  province: number;
  city: number;
  vipType: number;
  accountStatus: number;
  avatarUrl: string;
  authStatus: number;
  userType: number;
  nickname: string;
  gender: number;
  backgroundUrl: string;
  avatarImgId: number;
  backgroundImgId: number;
  detailDescription: string;
  defaultAvatar: boolean;
  expertTags: null;
  djStatus: number;
  followed: boolean;
  mutual: boolean;
  remarkName: null;
  backgroundImgIdStr: string;
  avatarImgIdStr: string;
  description: string;
  userId: number;
  signature: string;
  authority: number;
}
export interface AccountInfoResp {
  code: number;
  account: Account;
  profile: Profile;
}

export interface Account {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  anonimousUser: boolean;
  paidFee: boolean;
}

export interface Profile {
  userId: number;
  userType: number;
  nickname: string;
  avatarImgId: number;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundUrl: string;
  signature: string;
  createTime: number;
  userName: string;
  accountType: number;
  shortUserName: string;
  birthday: number;
  authority: number;
  gender: number;
  accountStatus: number;
  province: number;
  city: number;
  authStatus: number;
  description: null;
  detailDescription: null;
  defaultAvatar: boolean;
  expertTags: null;
  experts: null;
  djStatus: number;
  locationStatus: number;
  vipType: number;
  followed: boolean;
  mutual: boolean;
  authenticated: boolean;
  lastLoginTime: number;
  lastLoginIP: string;
  remarkName: null;
  viptypeVersion: number;
  authenticationTypes: number;
  avatarDetail: null;
  anchor: boolean;
}
