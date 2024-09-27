import { Dispatch, SetStateAction } from 'react';

export interface OptionProps {
  value: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  disabled?: boolean;
  checked?: boolean;
}

export interface ComponentProps {
  type: string;
  label?: string;
  onSubmit?: string;
  options?: Array<OptionProps>;
}

export interface CommonStateProps {
  title: string;
  components: Array<ComponentProps>;
}

export interface convertedCommonStateProps {
  title: string;
  components: Record<string, ComponentProps>;
}

export interface QueryResponseProps {
  isPending?: boolean;
  error?: Error | null;
  data?: CommonStateProps;
}

export type ContextValueProps = Omit<QueryResponseProps, 'data'> & {
  commonPageSchema: convertedCommonStateProps;
} & {
  setCommonPageSchema: Dispatch<SetStateAction<convertedCommonStateProps>>;
};
