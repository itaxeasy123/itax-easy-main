"use client";
import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
 page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
 },
 section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
 }
});

// Create Document Component
const MyDocument = () => (
 <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
 </Document>
);

export default function PDFPage() {
 const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

 useEffect(() => {
    const generatePdfBlobUrl = async () => {
      const blob = await pdf(<MyDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);
    };

    generatePdfBlobUrl();
 }, []);

 const downloadPDF = async () => {
    const blob = await pdf(<MyDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'document.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 };

 return (
    <div>
      <h1>PDF</h1>
      {pdfBlobUrl && (
        <embed
          src={pdfBlobUrl}
          type="application/pdf"
          width="100%"
          height="600px"
          style={{ marginTop: '20px' }}
        />
      )}
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
 );
}
