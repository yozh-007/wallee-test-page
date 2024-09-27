import isEmpty from 'lodash.isempty';

import { useCommonContext } from '../../hooks';
import { prepareComponentsList } from './utilities.ts';
import { Loader } from '../Loader/Loader.tsx';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler.tsx';

export function ComponentsRenderer() {
  const { isPending, error, commonPageSchema } = useCommonContext();

  if (isEmpty(commonPageSchema)) {
    switch (true) {
      case isPending:
        return <Loader />;
      case Boolean(error):
        return <ErrorHandler error={error} />;
      default:
        return null;
    }
  }

  const componentList = prepareComponentsList(commonPageSchema);

  return (
    <>{componentList?.map((Component, index) => <Component key={index} />)}</>
  );
}
