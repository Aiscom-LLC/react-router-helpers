import React from "react";
import { HelperOutlet } from '../route-helper';

const LazyChild1 = () => {
  return <div>Child<HelperOutlet/></div>;
};

export default LazyChild1;
