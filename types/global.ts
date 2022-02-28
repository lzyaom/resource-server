export enum OrdinaryStatus {
  fail = 0,
  available = 1
}

export enum PublishStatus {
  draft = 0,
  published = 1
}

export enum EncryptStatus {
  private = 0,
  public = 1
}

export enum LogStatus {
  whiteList = 0,
  blackList = 1
}

export enum ReplyStatus {
  noReply = 0,
  replied = 1
}

export enum ProjectStatus {
  stop = 0,
  run = 1
}

export enum ScheduleStatus {
  start = 0,
  processing = 1,
  end = 2,
}

export type anyValueObject = {
  [k: string]: any
}

export type PageType = {
  page: number;
  size: number
}

export enum ResponseCode {
  SUCCESS = 0,
  ERROR = 1,
  UNAUTH = 2,
  NOTNULL = 3,
  FAIL = 4,
  EXISTED = 5,
  NOTFOUND = 6,

}

export type Query<T, K extends keyof T> = Partial<Pick<T, K>>

export interface Article{
  title: string;
  classify: 'blog' | 'note' | 'daily';
  tags: string[];
  img: string;
  publishTime: Date;
  createTime: Date;
  status: PublishStatus;
  encrypt: EncryptStatus;
  psw: string;
  viewNum: number;
  commentNum: number;
  likeNum: number;
  content: string
}

export interface Logs {
  ip: string;
  userAgent: string;
  url: string;
  requestTime: Date;
  requestStatus: 200 | 401 | 402 | 404 | 500;
  status: LogStatus
}

export interface Message {
  title: string;
  content: string;
  publishTime: Date;
  replyStatus: ReplyStatus;
  replyTime: Date;
  status: OrdinaryStatus;
}

export interface Project {
  name: string;
  img: string;
  description: string;
  createTime: Date;
  runningTime: number;
  status: ProjectStatus
}

export interface Resource {
  name: string;
  img: string;
  link: string;
  classify: string;
  summary: string;
  encrypt: EncryptStatus;
  psw: string;
  status: OrdinaryStatus;
}

export interface Schedule {
  name: string;
  summary: string;
  spend: Date[];
  status: ScheduleStatus;

}

export interface Dictionary {
  name: string;
  type: string;
  children: Dictionary[];
  status: OrdinaryStatus;
}

export interface User {
  account: string;
  psw: string;
  nickName: string;
  avatar: string;
  email: string;
  status: OrdinaryStatus;
  fristLogin: boolean;
  lastLoginTime: number;
  createTime: Date;
}