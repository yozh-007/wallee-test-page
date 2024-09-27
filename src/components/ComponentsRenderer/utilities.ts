import { ReactNode } from 'react';
import isEmpty from 'lodash.isempty';

import PageTitle from '../PageTitle/PageTitle.tsx';
import CheckboxListPanel from '../CheckboxListPanel/CheckboxListPanel.tsx';
import { convertedCommonStateProps } from '../../types.ts';

export const prepareComponentsList = (
  commonPageSchema: convertedCommonStateProps | null,
) => {
  if (isEmpty(commonPageSchema)) {
    return [];
  }

  const componentList: Array<() => ReactNode> = [];

  const componentNamesList: string[] | undefined =
    commonPageSchema.components && Object.keys(commonPageSchema?.components);

  componentNamesList?.forEach(componentName => {
    switch (componentName) {
      case 'page-title':
        componentList.push(PageTitle);
        break;
      case 'checkbox-list-panel':
        componentList.push(CheckboxListPanel);
        break;
      default:
        return null;
    }
  });

  return componentList;
};
