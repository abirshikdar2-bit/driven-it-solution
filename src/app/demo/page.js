import DemoClientPage from './DemoClientPage';
import { getTeam, getProjects, getServices, getProducts, getReviews, getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Demo Preview | Driven IT Solution - Bespoke Engineering & AI',
  description: 'Exclusive 100% original, copyright-free demo front-end for Driven IT Solution. High-velocity web engineering, Meta AI growth funnels, and proprietary SaaS platforms.',
};

export default async function DemoPage() {
  const [team, projects, services, products, reviews, settings] = await Promise.all([
    getTeam(),
    getProjects(),
    getServices(),
    getProducts(),
    getReviews(),
    getSettings()
  ]);

  return (
    <DemoClientPage
      initialTeam={team}
      initialProjects={projects}
      initialServices={services}
      initialProducts={products}
      initialReviews={reviews}
      initialSettings={settings}
    />
  );
}
