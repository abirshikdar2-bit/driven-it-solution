import ClientPage from './ClientPage';
import { getTeam, getProjects, getServices, getProducts, getReviews, getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [team, projects, services, products, reviews, settings] = await Promise.all([
    getTeam(),
    getProjects(),
    getServices(),
    getProducts(),
    getReviews(),
    getSettings()
  ]);

  return (
    <ClientPage
      initialTeam={team}
      initialProjects={projects}
      initialServices={services}
      initialProducts={products}
      initialReviews={reviews}
      initialSettings={settings}
    />
  );
}
