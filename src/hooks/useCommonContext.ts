import React from 'react';
import { CommonContext } from '../CommonContext.tsx';

export default function useCommonContext() {
  const context = React.useContext(CommonContext);
  if (context === undefined) {
    throw new Error(
      'ComponentsRenderer and its children should be used within a CommonContextProvider',
    );
  }

  return context;
}
