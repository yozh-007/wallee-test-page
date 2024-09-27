import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { convertFetchedState, fetchPageSchema } from './utilities';
import { useLocalStorageState } from './hooks';
import isEmpty from 'lodash.isempty';
import {
  ContextValueProps,
  convertedCommonStateProps,
  QueryResponseProps,
} from './types.ts';

export const CommonContext = React.createContext<ContextValueProps>({
  commonPageSchema: {
    title: '',
    components: {
      component: {
        type: 'component',
      },
    },
  },
} as unknown as ContextValueProps);

export const CommonContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [commonPageSchema, setCommonPageSchema] =
    useLocalStorageState<convertedCommonStateProps>(
      'pageSchema',
      {} as convertedCommonStateProps,
    );

  const { isPending, error, data }: QueryResponseProps = useQuery({
    queryKey: ['page-schema'],
    queryFn: fetchPageSchema,
  });

  React.useEffect(() => {
    if (!isEmpty(data)) {
      setCommonPageSchema(convertFetchedState(data));
    }
  }, [setCommonPageSchema, data]);

  const contextValue: ContextValueProps = {
    isPending,
    error,
    commonPageSchema,
    setCommonPageSchema,
  };

  return (
    <CommonContext.Provider value={contextValue}>
      {children}
    </CommonContext.Provider>
  );
};
