import cloneDeep from 'lodash.clonedeep';
import { CommonStateProps, convertedCommonStateProps } from '../types.ts';
import isEmpty from 'lodash.isempty';

export default function convertFetchedState(
  fetchedState: CommonStateProps,
): convertedCommonStateProps {
  let resultState = {
    title: '',
    components: {},
  };

  for (const element in fetchedState) {
    if (element === 'title') {
      resultState = {
        ...resultState,
        title: fetchedState[element],
      };
    }

    if (
      element === 'components' &&
      Array.isArray(fetchedState[element]) &&
      !isEmpty(fetchedState[element])
    ) {
      fetchedState[element]?.forEach(component => {
        resultState = {
          ...resultState,
          components: {
            ...(resultState?.components && cloneDeep(resultState.components)),
            [component.type]: cloneDeep(component),
          },
        };
      });
    }
  }

  return resultState;
}
