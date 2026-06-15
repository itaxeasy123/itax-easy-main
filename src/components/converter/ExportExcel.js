"use client";
import ExcelJS from "exceljs";

export const ExportExcel = (props) => {
    const {data,fileName,style,rowHeights,columnWidths,customColumnWidths,customRowHeights,} = props;
    const generateExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1");
        // Add column headings
        worksheet.addRow([...data.headings]);

        // Set default column widths
        if (columnWidths) {
            Object.entries(columnWidths).forEach(([column, width]) => {
                worksheet.getColumn(column).width = width;
            });
        }

        // Merge default and custom column widths
        if (customColumnWidths) {
            Object.entries(customColumnWidths).forEach(([column, width]) => {
                worksheet.getColumn(column).width = width;
            });
        }
        data.body.forEach((row, rowIndex) => {
            worksheet.addRow([row.title, row.data]);
        })
        // Set default row heights
        if (rowHeights) {
            Object.entries(rowHeights).forEach(([rowIndex, height]) => {
                worksheet.getRow(parseInt(rowIndex) + 1).height = height;
            });
        }

        // Merge default and custom row heights
        if (customRowHeights) {
            Object.entries(customRowHeights).forEach(([rowIndex, height]) => {
                worksheet.getRow(parseInt(rowIndex) + 1).height = height;
            });
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName + ".xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <button onClick={generateExcel} style={style}>
            Export Excel
        </button>
    );
};
