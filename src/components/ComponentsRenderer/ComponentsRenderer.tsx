import React from 'react';

import { CheckboxListPanel } from '../CheckboxListPanel/CheckboxListPanel.tsx';
import { useCommonContext } from '../../CommonContext.tsx';

export function ComponentsRenderer() {
  // @ts-ignore
  const { commonPageSchema } = useCommonContext();

  const pageTitleData = commonPageSchema?.components?.['page-title'];
  const checkboxListPanelData =
    commonPageSchema?.components?.['checkbox-list-panel'];

  return (
    <>
      {pageTitleData && <h2>{pageTitleData.label}</h2>}
      {checkboxListPanelData && <CheckboxListPanel />}
    </>
  );
}
