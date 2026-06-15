import SectionRenderer from "./SectionRenderer";


export default function PageRenderer({ page }) {
  return (
    <>
      {page.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} />
      ))}
    </>
  );
}
