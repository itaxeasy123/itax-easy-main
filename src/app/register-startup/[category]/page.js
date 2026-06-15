import RegisterStartup from '@/components/pagesComponents/registerStartup/RegisterStartup';

export default function RegisterStartupPage({ params }) {
  return <RegisterStartup params={params} />;
}

export async function generateMetadata({ params }) {
  return {
    title: 'Startup & Company Registration',
    description:
      'Startup & Company Registration, Choose services from many categories like registraion, returns and audit, and get your business up and running with itaxeasy.',
  };
}
