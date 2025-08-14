import { cn } from '@/utils/cn';
import { createContext, forwardRef, PropsWithChildren, useContext } from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

type TTextContext = {
  style?: TextStyle;
  className?: string;
};

const Context = createContext<TTextContext>(null!);
const Provider = (props: PropsWithChildren<TTextContext>) => {
  const { style, className, children } = props;
  return (
    <Context.Provider
      value={{
        style,
        className,
      }}>
      {children}
    </Context.Provider>
  );
};

const Component = forwardRef<RNText, TextProps>(function Text(props, ref) {
  const context = useContext(Context);
  const { style, className, ...rest } = props;
  return (
    <RNText
      ref={ref}
      style={[context?.style, style]}
      className={cn(context?.className, className)}
      {...rest}
    />
  );
});

export const Text = Object.assign(Component, {
  Provider,
});
