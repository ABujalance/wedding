import { redirect } from 'next/navigation';
import { PageLayout } from '../PageLayout';
import { SaveTheDateContainer } from './components/SaveTheDateContainer';

export default function SaveTheDate() {
  redirect(`/`);
  return (
    <div>
      <PageLayout>
        <SaveTheDateContainer />
      </PageLayout>
    </div>
  );
}
