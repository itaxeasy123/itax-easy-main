
'use client';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPdf = (id, name) => {

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  autoTable(doc, {
    html: id
  });

  doc.save(`${name}.pdf`);
};

function ExportPDF({ id, name }) {

  return (
    <button
      type="button"
      onClick={() => exportPdf(id, name)}
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    >
      Download PDF
    </button>
  );
}

export default ExportPDF;