import React from 'react';
import { RouteObject } from 'react-router-dom';

export type Guard = () => () => Promise<boolean> | boolean;
export type InnerGuard = () => Promise<boolean> | boolean;

export type Resolver = () => () => Promise<any> | Promise<void> | any | void;
export type InnerResolver = () => Promise<any> | Promise<void> | any | void;

export type TitleResolver = () => (status: TitleResolverStatus) => Promise<string> | string;
export type InnerTitleResolver = (status: TitleResolverStatus) => Promise<string> | string;

export type OnStatusChange = (status: RouteHelperStatus) => void;

export interface OnlyHelperFields {
  guards?: Guard[];
  resolvers?: Record<string, Resolver>;
  // title?: string;
  // titleResolver?: TitleResolver;
  lazyElement?: JSX.Element;
  loadingComponent?: React.ReactNode;
}

export type HelperRouteObject = RouteObject & OnlyHelperFields & {
  children?: HelperRouteObject[];
}

export type HelperRouteObjectProps = Omit<HelperRouteObject, 'path'>;

export enum RouteHelperStatus {
  Initial,
  Loading,
  Loaded,
  Failed,
}

export enum LazyLoadingInnerStatus {
  Initial,
  ManualTriggeredLoading,
  RealTriggeredLoading,
  Loaded,
  Failed
}

export interface HelperManager {
  resolvers: Record<string, InnerResolver>;
  guards: InnerGuard[];
  title?: string;
  loadingTitle?: string;
  titleResolver: InnerTitleResolver | null;
}


export enum TitleResolverStatus {
  BeforeRouteStartLoading,

  RouteStartLoading,
  RouteLoaded,
  RouteFailed,

  RouteUpdate
}

export interface LazyLoadError {
  error: { message: string; stack: string; };
  errorInfo: { componentStack: string; };
}
