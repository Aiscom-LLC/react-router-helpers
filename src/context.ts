import React from 'react';
import { LazyLoadError, RouteHelperStatus } from './types';

export const RouteContext = React.createContext<{
  routeResolverInfos: any;
  canStartToLoadWorkers: boolean;
  cancelTitleResolvingForParent: (cancellationKey: string) => void;
  isTheFirstParent: boolean;
  guardStatus: RouteHelperStatus;
  resolverStatus: RouteHelperStatus;
  lazyComponentStatus: RouteHelperStatus;
  status: RouteHelperStatus;
  lazyLoadingError?: LazyLoadError;
}>({
  routeResolverInfos: {},
  canStartToLoadWorkers: true,
  cancelTitleResolvingForParent: (_: string) => {},
  isTheFirstParent: true,
  guardStatus: RouteHelperStatus.Initial,
  resolverStatus: RouteHelperStatus.Initial,
  lazyComponentStatus: RouteHelperStatus.Initial,
  status: RouteHelperStatus.Initial,
});

export const OutletContext = React.createContext<{
  wasParentOutletLoaded: boolean;
  wasOutletUsedAlready: boolean;
  setWasUsed: () => void;
  resetOutletState: () => void;
}>({
  wasParentOutletLoaded: false,
  wasOutletUsedAlready: false,
  setWasUsed: () => {},
  resetOutletState: () => {},
});
