import ClientPage from './ClientPage';
import {
  getTeam,
  getProjects,
  getServices,
  getProducts,
  getReviews,
  getSettings
} from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [
    initialTeam,
    initialProjects,
    initialServices,
    initialProducts,
    initialReviews,
    initialSettings
  ] = await Promise.all([
    getTeam(),
    getProjects(),
    getServices(),
    getProducts(),
    getReviews(),
    getSettings()
  ]);

  return (
    <ClientPage
      initialTeam={initialTeam}
      initialProjects={initialProjects}
      initialServices={initialServices}
      initialProducts={initialProducts}
      initialReviews={initialReviews}
      initialSettings={initialSettings}
    />
  );
}
