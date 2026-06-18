import { getV3Content } from '../../lib/notion_v3';
import V3ClientPage from '../../components/v3/V3ClientPage';

export default async function V3MainPage() {
  // 調用全新的 Fetch 版本，完全無視 SDK 報錯
  const data = await getV3Content();

  return (
    <V3ClientPage skills={data || []} />
  );
}