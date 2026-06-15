import NavbarServer from '@/components/partials/topNavbar/NavbarServer';

export default function SiteLayout({ children }) {
  return (
    <>
      <NavbarServer />
      {children}
    </>
  );
}
