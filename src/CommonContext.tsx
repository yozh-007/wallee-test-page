import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  convertFetchedState,
  fetchPageSchema,
  useLocalStorageState,
} from './utilities.ts';
import isEmpty from 'lodash.isempty';

const CommonContext = React.createContext({});

export const CommonContextProvider = ({ children }) => {
  const [commonPageSchema, setCommonPageSchema] = useLocalStorageState(
    'pageSchema',
    {},
  );

  const { isPending, error, data } = useQuery({
    queryKey: ['page-schema'],
    queryFn: fetchPageSchema,
  });

  React.useEffect(() => {
    if (!isEmpty(data)) setCommonPageSchema(convertFetchedState(data));
  }, [data]);

  return (
    <CommonContext.Provider
      value={{
        isPending,
        error,
        commonPageSchema,
        setCommonPageSchema,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export const useCommonContext = () => {
  const context = React.useContext(CommonContext);
  if (context === undefined) {
    throw new Error(
      'ComponentsRenderer and its children should be used within a CommonContextProvider',
    );
  }

  return context;
};
