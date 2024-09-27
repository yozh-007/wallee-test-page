interface ComponentProps {
  type: string;
  label?: string;
  [key: string]: any;
}

export interface CommonStateProps {
  title?: string;
  components?: Array<ComponentProps>;
}
