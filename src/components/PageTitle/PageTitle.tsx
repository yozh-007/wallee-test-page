import { useCommonContext } from '../../hooks';

export default function PageTitle() {
  const { commonPageSchema } = useCommonContext();

  const pageTitleData = commonPageSchema?.components['page-title'];

  return <h2>{pageTitleData?.label}</h2>;
}
