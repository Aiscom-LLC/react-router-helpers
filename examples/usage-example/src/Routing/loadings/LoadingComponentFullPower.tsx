import { useEffect } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useLazyError, useLazyStatus, useResolverStatus, RouteHelperStatus, useGuardStatus } from '@symfa/react-router-helpers';

export const LoadingComponentFullPower = () => {
  const guardStatus = useGuardStatus();
  const resolverStatus = useResolverStatus();
  const lazyComponentStatus = useLazyStatus();
  const error = useLazyError();

  useEffect(() => {
    console.log(error);
  },[error]);

  useEffect(() => {
    console.log('Guard has changed ' + RouteHelperStatus[guardStatus]);
    // if (guardStatus === RouteHelperStatus.Failed) {
    //   navigate('/login');
    // }
  }, [guardStatus]);

  useEffect(() => {
    console.log('Resolver has changed ' + RouteHelperStatus[resolverStatus]);
  }, [resolverStatus]);

  useEffect(() => {
    console.log('lazyComponentStatus has changed ' + RouteHelperStatus[lazyComponentStatus]);
  }, [lazyComponentStatus]);


  return <LoadingSpinner />;
};
