import React from "react";
import { HelperOutlet } from '../../src/route-helper';

const LazyHome = () => {
  return <div>Home<HelperOutlet/></div>;
};

export default LazyHome;
