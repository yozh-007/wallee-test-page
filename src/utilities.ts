import * as React from 'react';
import cloneDeep from 'lodash.clonedeep';

export async function fetchPageSchema() {
  const pageSchemaAPIResult = await new Promise((resolve, reject) => {
    setTimeout(
      () =>
        fetch('/mocks/page-schema.json')
          .then(response => {
            if (response.ok) {
              resolve(response.json());
            } else {
              reject(new Error('Page schema was not received'));
            }
          })
          .catch(error => {
            reject(error);
          }),
      10000,
    );
  });

  return pageSchemaAPIResult;
}

export function useLocalStorageState<Type>(
  key: string,
  defaultValue: Type,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage);
      } catch (error) {
        window.localStorage.removeItem(key);
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

interface ComponentProps {
  type: string;
  label?: string;
  [key: string]: any;
}

interface FetchedStateProps {
  title?: string;
  components?: Array<ComponentProps>;
}

interface convertedFetchedStateProps {
  title?: string;
  components?: Record<string, ComponentProps>;
}

export function convertFetchedState(
  fetchedState: FetchedStateProps,
): convertedFetchedStateProps | null {
  if (!fetchedState) return null;
  let resultState: convertedFetchedStateProps = {};

  for (const element in fetchedState) {
    if (element === 'title') {
      resultState = {
        ...resultState,
        title: fetchedState[element],
      };
    }

    if (element === 'components' && Array.isArray(fetchedState[element])) {
      fetchedState[element].forEach(component => {
        resultState = {
          ...resultState,
          components: {
            ...(resultState.components && cloneDeep(resultState.components)),
            [component.type]: cloneDeep(component),
          },
        };
      });
    }
  }

  return resultState;
}
