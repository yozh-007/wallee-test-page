import React from 'react';
import { produce } from 'immer';
import cn from 'classnames';

import styles from './CheckboxListPanel.module.scss';
import { CheckboxListSearch } from '../CheckboxListSearch/CheckboxListSearch.tsx';
import { CheckboxList } from '../CheckboxList/CheckboxList.tsx';
import { CheckboxListItem } from '../CheckboxListItem/CheckboxListItem.tsx';
import { useCommonContext } from '../../hooks';
import isEmpty from 'lodash.isempty';
import { convertedCommonStateProps, OptionProps } from '../../types.ts';

export default function CheckboxListPanel() {
  const { commonPageSchema, setCommonPageSchema } = useCommonContext();

  const [localState, setLocalState] =
    React.useState<convertedCommonStateProps>(commonPageSchema);
  const [filteredState, setFilteredState] =
    React.useState<convertedCommonStateProps>(localState);
  const [searchValue, setSearchValue] = React.useState('');

  const filterOptionsByString = React.useCallback(
    (searchString: string) => {
      setSearchValue(searchString);
      setFilteredState(
        // we can also add some kind of fuzzy search here
        // like this: https://github.com/ritz078/react-fuzzy-search
        produce(draft => {
          const localStateOptions = localState?.components[
            'checkbox-list-panel'
          ].options as Array<OptionProps>;
          draft.components['checkbox-list-panel'].options =
            localStateOptions.filter(item =>
              item.title.toLowerCase().includes(searchString.toLowerCase()),
            ) as Array<OptionProps>;
        }),
      );
    },
    [localState?.components],
  );

  React.useEffect(() => {
    setCommonPageSchema(localState);
  }, [localState, setCommonPageSchema]);

  React.useEffect(() => {
    filterOptionsByString(searchValue);
  }, [searchValue, localState, filterOptionsByString]);

  const checkboxListOptions = filteredState?.components['checkbox-list-panel']
    ?.options as Array<OptionProps>;

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
          {isEmpty(checkboxListOptions) ? (
            <li>
              <p>Nothing found here...</p>
            </li>
          ) : (
            <>
              {checkboxListOptions?.map(option => {
                return (
                  <li key={option.value}>
                    <CheckboxListItem
                      title={option.title}
                      subtitle={option.subtitle}
                      imageUrl={option.imageUrl}
                      value={option.value}
                      checked={option.checked || false}
                      onClick={markChecked}
                      disabled={option.disabled}
                    />
                  </li>
                );
              })}
            </>
          )}
        </CheckboxList>
      </div>
      <div
        className={cn(
          styles.checkboxListPanel__element,
          styles.checkboxListPanel__element_justifyElements,
        )}
      >
        <button
          type="button"
          className="textButton"
          onClick={resetCheckboxListState}
        >
          Reset
        </button>
        <button type="button" onClick={submitSelectedItems}>
          Submit
        </button>
      </div>
    </div>
  );

  function markChecked(value: string, checked: boolean) {
    setLocalState(
      produce(draft => {
        const options = draft.components?.['checkbox-list-panel']
          ?.options as Array<OptionProps>;
        const option = options.find(item => item.value === value);
        if (option) option.checked = checked;
      }),
    );
  }

  function resetCheckboxListState() {
    setSearchValue('');
    setLocalState(
      produce(draft => {
        const options = draft.components['checkbox-list-panel']
          ?.options as Array<OptionProps>;
        options.forEach(item => (item.checked = false));
      }),
    );
  }

  function submitSelectedItems() {
    const submitCommand =
      filteredState?.components['checkbox-list-panel']?.onSubmit;
    const markedCheckboxList = checkboxListOptions.filter(
      option => option.checked,
    );

    console.log(
      `'${submitCommand}' checked options list: `,
      markedCheckboxList,
    );
  }
}
