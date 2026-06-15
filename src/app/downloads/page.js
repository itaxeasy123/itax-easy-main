import DownloadIndex from '@/components/downloads/DownloadIndex';

const DownloadPage = () => {
  return <DownloadIndex />;
};

export default DownloadPage;

export async function generateMetadata() {
  return {
    title: 'Downloads',
  };
}
