import React from 'react';
import { produce } from 'immer';

import styles from './CheckboxListPanel.module.scss';
import { CheckboxListSearch } from '../CheckboxListSearch/CheckboxListSearch.tsx';
import { CheckboxList } from '../CheckboxList/CheckboxList.tsx';
import {
  CheckboxListItem,
  CheckboxListItemProps,
} from '../CheckboxListItem/CheckboxListItem.tsx';
import { useCommonContext } from '../../CommonContext.tsx';

export function CheckboxListPanel() {
  // @ts-ignore
  const { commonPageSchema, setCommonPageSchema } = useCommonContext();

  const [localState, setLocalState] = React.useState(commonPageSchema);
  const [filteredState, setFilteredState] = React.useState(localState);
  const [searchValue, setSearchValue] = React.useState('');

  const filterOptionsByString = (searchString: string) => {
    setSearchValue(searchString);
    setFilteredState(
      produce(draft => {
        draft.components['checkbox-list-panel'].options = localState.components[
          'checkbox-list-panel'
        ].options.filter(item =>
          item.title.toLowerCase().includes(searchString.toLowerCase()),
        );
      }),
    );
  };

  const markChecked = (value: string, checked: boolean) => {
    setLocalState(
      produce(draft => {
        const option = draft.components['checkbox-list-panel'].options.find(
          item => item.value === value,
        );
        option.checked = checked;
      }),
    );
  };

  const resetCheckboxListState = () => {
    setSearchValue('');
    setLocalState(
      produce(draft => {
        draft.components['checkbox-list-panel'].options.forEach(
          item => (item.checked = false),
        );
      }),
    );
  };

  React.useEffect(() => {
    setCommonPageSchema(localState);
  }, [localState]);

  React.useEffect(() => {
    filterOptionsByString(searchValue);
  }, [searchValue, localState]);

  return (
    <div className={styles.checkboxListPanel}>
      <div className={styles.checkboxListPanel__element}>
        <CheckboxListSearch
          value={searchValue}
          placeholder="Search for Payment Method"
          onChange={filterOptionsByString}
        />
      </div>
      <div className={styles.checkboxListPanel__element}>
        <CheckboxList>
          {filteredState?.components?.['checkbox-list-panel']?.options?.map(
            (item: CheckboxListItemProps) => {
              return (
                <li key={item.value}>
                  <CheckboxListItem
                    title={item.title}
                    subtitle={item.subtitle}
                    imageUrl={item.imageUrl}
                    value={item.value}
                    checked={item.checked || false}
                    onClick={markChecked}
                  />
                </li>
              );
            },
          )}
        </CheckboxList>
      </div>
      <div className={styles.checkboxListPanel__element}>
        <button type="button" onClick={resetCheckboxListState}>
          Reset
        </button>
      </div>
    </div>
  );
}
