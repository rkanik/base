import { forwardRef } from 'react';
import { View as RNView, ViewProps } from 'react-native';

export const View = forwardRef<RNView, ViewProps>(function View(props, ref) {
  return <RNView {...props} ref={ref} />;
});
