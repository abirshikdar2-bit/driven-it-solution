import fs from 'fs';
import path from 'path';
import ClientPage from './ClientPage';

// Read team data on the server for instant SSR
function getInitialTeam() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'team.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read team.json in page.js:', err);
    return [];
  }
}

export default function Home() {
  const initialTeam = getInitialTeam();

  return <ClientPage initialTeam={initialTeam} />;
}
