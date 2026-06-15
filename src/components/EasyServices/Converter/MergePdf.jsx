'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument, degrees } from 'pdf-lib';
import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Layers,
  Scissors,
  RotateCw,
  Minimize2,
  GripVertical,
  Plus,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon, // 🔥 rename here
} from 'lucide-react';
import Image from 'next/image'; // ✅ Next.js Image

/* =========================================================
   CONFIG
========================================================= */

const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
};
const TABS = [
  { id: 'image-to-pdf', label: 'Image to PDF', icon: Image },
  { id: 'merge', label: 'Merge PDF', icon: Layers },
  { id: 'split', label: 'Split PDF', icon: Scissors },
  { id: 'rotate', label: 'Rotate PDF', icon: RotateCw },
  { id: 'reorder', label: 'Reorder Pages', icon: GripVertical },
  { id: 'compress', label: 'Compress PDF', icon: Minimize2 },
];

/* =========================================================
   HELPERS
========================================================= */

const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return '';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const getUniqueId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const parsePageRanges = (input, totalPages) => {
  const selected = new Set();

  if (!input.trim()) {
    throw new Error('Please enter page range. Example: 1-3,5,8-10');
  }

  const parts = input
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part.includes('-')) {
      const [startRaw, endRaw] = part.split('-').map((v) => v.trim());
      const start = Number(startRaw);
      const end = Number(endRaw);

      if (
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start < 1 ||
        end < 1 ||
        start > end ||
        end > totalPages
      ) {
        throw new Error(`Invalid range: ${part}`);
      }

      for (let i = start; i <= end; i++) {
        selected.add(i - 1);
      }
    } else {
      const page = Number(part);
      if (!Number.isInteger(page) || page < 1 || page > totalPages) {
        throw new Error(`Invalid page number: ${part}`);
      }
      selected.add(page - 1);
    }
  }

  return [...selected].sort((a, b) => a - b);
};

const sanitizeFilename = (name, fallback) => {
  const clean = (name || '')
    .trim()
    .replace(/\.pdf$/i, '')
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return `${clean || fallback}.pdf`;
};

const createPdfUrl = (bytes) =>
  URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));

const StatusAlert = ({ type = 'error', text }) => {
  if (!text) return null;

  const isError = type === 'error';

  return (
    <div
      className={`mb-5 rounded-2xl border p-4 flex items-start gap-3 ${
        isError
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
    >
      {isError ? (
        <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
      )}
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

const EmptyState = ({ title, desc }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
    <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    <p className="mt-2 text-sm text-slate-500">{desc}</p>
  </div>
);

const ResultPanel = ({ url, filename, onReset }) => {
  if (!url) return null;

  return (
    <div className="mt-6 rounded-3xl border border-emerald-200 bg-white overflow-hidden shadow-sm">
      <div className="border-b border-emerald-200 bg-emerald-50 px-5 py-4 flex items-start gap-3">
        <CheckCircle2 className="h-6 w-6 text-emerald-600 mt-0.5" />
        <div>
          <h3 className="text-lg font-bold text-slate-800">PDF Ready</h3>
          <p className="text-sm text-slate-600">
            Preview or download your processed PDF.
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-3">
          <a
            href={url}
            download={filename}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <ExternalLink className="h-4 w-4" />
            Open in New Tab
          </a>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <RefreshCw className="h-4 w-4" />
            Start Over
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <iframe
            src={url}
            title="PDF Preview"
            className="h-[500px] w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   UPLOAD AREA
========================================================= */

const UploadArea = ({
  title,
  subtitle,
  onDrop,
  multiple = true,
  buttonText = 'Browse PDF',
}) => {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: ACCEPTED_TYPES,
    multiple,
    noClick: true,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`rounded-3xl border-2 border-dashed p-8 text-center transition-all ${
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/40'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div className="mb-4 rounded-2xl bg-blue-600 p-4 text-white shadow-lg shadow-blue-200">
          <Upload className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <p className="mt-2 max-w-xl text-sm text-slate-500">{subtitle}</p>

        <button
          type="button"
          onClick={open}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          <Upload className="h-4 w-4" />
          {buttonText}
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   MERGE PDF
========================================================= */

const MergePdfTool = ({
  resultUrl,
  setResultUrl,
  resultFilename,
  setResultFilename,
}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragIndex, setDragIndex] = useState(null);

  const clearResult = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl('');
    setResultFilename('');
  }, [resultUrl, setResultFilename, setResultUrl]);

  const onDrop = async (acceptedFiles) => {
    setError('');
    setSuccess('');
    clearResult();

    const prepared = await Promise.all(
      acceptedFiles.map(async (file) => {
        try {
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          return {
            id: getUniqueId(),
            file,
            name: file.name,
            sizeLabel: formatBytes(file.size),
            pageCount: pdf.getPageCount(),
          };
        } catch {
          return null;
        }
      }),
    );

    const valid = prepared.filter(Boolean);

    if (!valid.length) {
      setError('Only valid PDF files are supported.');
      return;
    }

    setFiles((prev) => [...prev, ...valid]);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    clearResult();
    setSuccess('');
  };

  const clearAll = () => {
    setFiles([]);
    setError('');
    setSuccess('');
    clearResult();
  };

  const moveItem = (from, to) => {
    setFiles((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    clearResult();
  };

  const mergePDFs = async () => {
    if (!files.length) {
      setError('Please upload PDF files first.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    clearResult();

    try {
      const mergedDoc = await PDFDocument.create();

      for (const item of files) {
        const bytes = await item.file.arrayBuffer();
        const sourcePdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedDoc.copyPages(
          sourcePdf,
          sourcePdf.getPageIndices(),
        );
        copiedPages.forEach((page) => mergedDoc.addPage(page));
      }

      const mergedBytes = await mergedDoc.save({ useObjectStreams: true });
      const url = createPdfUrl(mergedBytes);

      setResultUrl(url);
      setResultFilename(sanitizeFilename('merged-pdf', 'merged-pdf'));
      setSuccess('PDF files merged successfully.');
    } catch (e) {
      console.error(e);
      setError(
        'Failed to merge PDFs. Some file may be corrupted or protected.',
      );
    } finally {
      setLoading(false);
    }
  };

  const totalPages = useMemo(
    () => files.reduce((sum, item) => sum + item.pageCount, 0),
    [files],
  );

  return (
    <div>
      <StatusAlert type="error" text={error} />
      <StatusAlert type="success" text={success} />

      <UploadArea
        title="Upload PDFs to Merge"
        subtitle="Add multiple PDF files, drag to reorder them, then merge into one combined document."
        onDrop={onDrop}
        multiple={true}
        buttonText="Browse PDFs"
      />

      {files.length > 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Selected Files ({files.length})
              </h3>
              <p className="text-sm text-slate-500">
                Total pages: {totalPages}. Drag cards to change merge order.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setFiles((prev) =>
                    [...prev].sort((a, b) => a.name.localeCompare(b.name)),
                  )
                }
                className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sort A-Z
              </button>
              <button
                onClick={clearAll}
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file, index) => (
              <div
                key={file.id}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragIndex === null || dragIndex === index) return;
                  moveItem(dragIndex, index);
                  setDragIndex(null);
                }}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-300 hover:bg-blue-50/40 transition"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="rounded-xl bg-red-100 p-3">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {file.sizeLabel} • {file.pageCount} pages
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFile(file.id)}
                    className="rounded-full p-2 text-slate-500 hover:bg-white hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                    Order #{index + 1}
                  </span>
                  <GripVertical className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4 flex flex-wrap gap-3">
            <button
              onClick={mergePDFs}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition ${
                loading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Merging...
                </>
              ) : (
                <>
                  <Layers className="h-4 w-4" />
                  Merge PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <ResultPanel
        url={resultUrl}
        filename={resultFilename}
        onReset={clearAll}
      />
    </div>
  );
};

/* =========================================================
   SPLIT PDF
========================================================= */

const SplitPdfTool = ({
  resultUrl,
  setResultUrl,
  resultFilename,
  setResultFilename,
}) => {
  const [fileObj, setFileObj] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [rangeInput, setRangeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearResult = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl('');
    setResultFilename('');
  }, [resultUrl, setResultFilename, setResultUrl]);

  const onDrop = async (acceptedFiles) => {
    setError('');
    setSuccess('');
    clearResult();

    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      setFileObj(file);
      setPageCount(pdf.getPageCount());
      setRangeInput('');
    } catch {
      setError('Invalid PDF file.');
    }
  };

  const handleSplit = async () => {
    if (!fileObj) {
      setError('Please upload a PDF first.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    clearResult();

    try {
      const sourceBytes = await fileObj.arrayBuffer();
      const sourcePdf = await PDFDocument.load(sourceBytes);
      const selectedPages = parsePageRanges(
        rangeInput,
        sourcePdf.getPageCount(),
      );

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(sourcePdf, selectedPages);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const bytes = await newPdf.save({ useObjectStreams: true });
      const url = createPdfUrl(bytes);

      setResultUrl(url);
      setResultFilename(
        sanitizeFilename(
          fileObj.name.replace(/\.pdf$/i, '') + '-split',
          'split-pdf',
        ),
      );
      setSuccess('PDF split successfully.');
    } catch (e) {
      console.error(e);
      setError(e.message || 'Failed to split PDF.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setFileObj(null);
    setPageCount(0);
    setRangeInput('');
    setError('');
    setSuccess('');
    clearResult();
  };

  return (
    <div>
      <StatusAlert type="error" text={error} />
      <StatusAlert type="success" text={success} />

      <UploadArea
        title="Upload PDF to Split"
        subtitle="Select one PDF file, enter page ranges like 1-3,5,8-10, then generate a new PDF with selected pages."
        onDrop={onDrop}
        multiple={false}
        buttonText="Browse PDF"
      />

      {fileObj ? (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start gap-3">
            <div className="rounded-xl bg-red-100 p-3">
              <FileText className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{fileObj.name}</h3>
              <p className="text-sm text-slate-500">
                {formatBytes(fileObj.size)} • {pageCount} pages
              </p>
            </div>
          </div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Page Range
          </label>
          <input
            type="text"
            value={rangeInput}
            onChange={(e) => setRangeInput(e.target.value)}
            placeholder="Example: 1-3,5,8-10"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          <p className="mt-2 text-xs text-slate-500">
            Total pages available: {pageCount}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={handleSplit}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white ${
                loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Splitting...
                </>
              ) : (
                <>
                  <Scissors className="h-4 w-4" />
                  Split PDF
                </>
              )}
            </button>

            <button
              onClick={clearAll}
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No PDF selected for split"
            desc="Upload one PDF and choose the pages you want to extract."
          />
        </div>
      )}

      <ResultPanel
        url={resultUrl}
        filename={resultFilename}
        onReset={clearAll}
      />
    </div>
  );
};

/* =========================================================
   IMAGE TO PDF
========================================================= */

/* =========================================================
   IMAGE TO PDF  (FIXED + MULTIPLE IMAGES SUPPORT)
========================================================= */

const ImageToPdfTool = ({
  resultUrl,
  setResultUrl,
  resultFilename,
  setResultFilename,
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearResult = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl('');
    setResultFilename('');
  }, [resultUrl, setResultUrl, setResultFilename]);

  /* IMAGE DROPZONE */

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    },
    multiple: true,
    noClick: true,
    onDrop: (acceptedFiles) => {
      setError('');
      setSuccess('');
      clearResult();

      const prepared = acceptedFiles.map((file) => ({
        id: getUniqueId(),
        file,
        name: file.name,
        size: formatBytes(file.size),
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...prepared]);
    },
  });

  const removeImage = (id) => {
    setImages((prev) => prev.filter((i) => i.id !== id));
    clearResult();
  };

  /* CONVERT */

  const convertToPDF = async () => {
    if (!images.length) {
      setError('Upload images first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    clearResult();

    try {
      const pdfDoc = await PDFDocument.create();

      for (const img of images) {
        const bytes = await img.file.arrayBuffer();

        let embedded;

        if (img.file.type.includes('png') || img.file.type.includes('webp')) {
          embedded = await pdfDoc.embedPng(bytes);
        } else {
          embedded = await pdfDoc.embedJpg(bytes);
        }

        const page = pdfDoc.addPage([embedded.width, embedded.height]);

        page.drawImage(embedded, {
          x: 0,
          y: 0,
          width: embedded.width,
          height: embedded.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const url = createPdfUrl(pdfBytes);

      setResultUrl(url);
      setResultFilename('images-to-pdf.pdf');
      setSuccess('Images converted to PDF successfully');
    } catch (e) {
      console.error(e);
      setError('Failed to convert images to PDF');
    }

    setLoading(false);
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setError('');
    setSuccess('');
    clearResult();
  };

  return (
    <div>
      <StatusAlert type="error" text={error} />
      <StatusAlert type="success" text={success} />

      {/* Upload Area */}

      <div
        {...getRootProps()}
        className={`rounded-3xl border-2 border-dashed p-8 text-center transition ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/40'
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-2xl bg-blue-600 p-4 text-white">
           <FileText className="h-8 w-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-800">Upload Images</h3>

          <p className="text-sm text-slate-500 mt-2">
            Select multiple JPG / PNG / WebP images and convert them into one
            PDF.
          </p>

          <button
            type="button"
            onClick={open}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Upload className="h-4 w-4" />
            Browse Images
          </button>
        </div>
      </div>

      {/* Image List */}

      {images.length > 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
              >
                {/* <img
                  src={img.preview}
                  className="rounded-xl w-full h-40 object-cover mb-3"
                /> */}
                <Image
                  src={img.preview}
                  alt="preview"
                  width={500}
                  height={160}
                  className="rounded-xl w-full h-40 object-cover"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold truncate">{img.name}</p>

                  <button
                    onClick={() => removeImage(img.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4 flex gap-3 flex-wrap">
            <button
              onClick={convertToPDF}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white ${
                loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Convert to PDF
                </>
              )}
            </button>

            <button
              onClick={clearAll}
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <ResultPanel
        url={resultUrl}
        filename={resultFilename}
        onReset={clearAll}
      />
    </div>
  );
};
/* =========================================================
   ROTATE PDF
========================================================= */

const RotatePdfTool = ({
  resultUrl,
  setResultUrl,
  resultFilename,
  setResultFilename,
}) => {
  const [fileObj, setFileObj] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearResult = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl('');
    setResultFilename('');
  }, [resultUrl, setResultFilename, setResultUrl]);

  const onDrop = async (acceptedFiles) => {
    setError('');
    setSuccess('');
    clearResult();

    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const list = Array.from({ length: pdf.getPageCount() }, (_, i) => ({
        index: i,
        rotation: 0,
      }));
      setFileObj(file);
      setPages(list);
    } catch {
      setError('Invalid PDF file.');
    }
  };

  const rotatePage = (index, delta) => {
    setPages((prev) =>
      prev.map((page) =>
        page.index === index
          ? { ...page, rotation: (page.rotation + delta + 360) % 360 }
          : page,
      ),
    );
    clearResult();
    setSuccess('');
  };

  const applyRotation = async () => {
    if (!fileObj) {
      setError('Please upload a PDF first.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    clearResult();

    try {
      const bytes = await fileObj.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pdfPages = pdf.getPages();

      pages.forEach((pageMeta, idx) => {
        pdfPages[idx].setRotation(degrees(pageMeta.rotation));
      });

      const out = await pdf.save({ useObjectStreams: true });
      const url = createPdfUrl(out);

      setResultUrl(url);
      setResultFilename(
        sanitizeFilename(
          fileObj.name.replace(/\.pdf$/i, '') + '-rotated',
          'rotated-pdf',
        ),
      );
      setSuccess('Page rotation applied successfully.');
    } catch (e) {
      console.error(e);
      setError('Failed to rotate PDF.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setFileObj(null);
    setPages([]);
    setError('');
    setSuccess('');
    clearResult();
  };

  return (
    <div>
      <StatusAlert type="error" text={error} />
      <StatusAlert type="success" text={success} />

      <UploadArea
        title="Upload PDF to Rotate"
        subtitle="Select one PDF, rotate individual pages, then export the updated PDF."
        onDrop={onDrop}
        multiple={false}
        buttonText="Browse PDF"
      />

      {fileObj ? (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-lg font-bold text-slate-800">{fileObj.name}</h3>
            <p className="text-sm text-slate-500">
              {pages.length} pages • Click rotate for each page
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pages.map((page) => (
              <div
                key={page.index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-4 aspect-[3/4] rounded-xl border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center">
                  <FileText className="h-10 w-10 text-red-500 mb-2" />
                  <p className="text-sm font-bold text-slate-700">
                    Page {page.index + 1}
                  </p>
                  <p className="text-xs text-slate-500">
                    {page.rotation}° rotation
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => rotatePage(page.index, -90)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Left
                  </button>
                  <button
                    onClick={() => rotatePage(page.index, 90)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                  >
                    Right
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4 flex flex-wrap gap-3">
            <button
              onClick={applyRotation}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white ${
                loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <RotateCw className="h-4 w-4" />
                  Apply Rotation
                </>
              )}
            </button>

            <button
              onClick={clearAll}
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No PDF selected for rotate"
            desc="Upload one PDF and rotate individual pages as needed."
          />
        </div>
      )}

      <ResultPanel
        url={resultUrl}
        filename={resultFilename}
        onReset={clearAll}
      />
    </div>
  );
};

/* =========================================================
   REORDER PAGES
========================================================= */

const ReorderPdfTool = ({
  resultUrl,
  setResultUrl,
  resultFilename,
  setResultFilename,
}) => {
  const [fileObj, setFileObj] = useState(null);
  const [pages, setPages] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearResult = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl('');
    setResultFilename('');
  }, [resultUrl, setResultFilename, setResultUrl]);

  const onDrop = async (acceptedFiles) => {
    setError('');
    setSuccess('');
    clearResult();

    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const list = Array.from({ length: pdf.getPageCount() }, (_, i) => ({
        originalIndex: i,
        label: `Page ${i + 1}`,
      }));
      setFileObj(file);
      setPages(list);
    } catch {
      setError('Invalid PDF file.');
    }
  };

  const movePage = (from, to) => {
    setPages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    clearResult();
    setSuccess('');
  };

  const applyReorder = async () => {
    if (!fileObj) {
      setError('Please upload a PDF first.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    clearResult();

    try {
      const bytes = await fileObj.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();
      const order = pages.map((p) => p.originalIndex);
      const copiedPages = await newPdf.copyPages(sourcePdf, order);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const out = await newPdf.save({ useObjectStreams: true });
      const url = createPdfUrl(out);

      setResultUrl(url);
      setResultFilename(
        sanitizeFilename(
          fileObj.name.replace(/\.pdf$/i, '') + '-reordered',
          'reordered-pdf',
        ),
      );
      setSuccess('Pages reordered successfully.');
    } catch (e) {
      console.error(e);
      setError('Failed to reorder pages.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setFileObj(null);
    setPages([]);
    setError('');
    setSuccess('');
    clearResult();
  };

  return (
    <div>
      <StatusAlert type="error" text={error} />
      <StatusAlert type="success" text={success} />

      <UploadArea
        title="Upload PDF to Reorder Pages"
        subtitle="Drag page cards to change the order, then export a new reordered PDF."
        onDrop={onDrop}
        multiple={false}
        buttonText="Browse PDF"
      />

      {fileObj ? (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-lg font-bold text-slate-800">{fileObj.name}</h3>
            <p className="text-sm text-slate-500">
              {pages.length} pages • Drag cards to reorder
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pages.map((page, index) => (
              <div
                key={`${page.originalIndex}-${index}`}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragIndex === null || dragIndex === index) return;
                  movePage(dragIndex, index);
                  setDragIndex(null);
                }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-300 hover:bg-blue-50/40 transition"
              >
                <div className="mb-4 aspect-[3/4] rounded-xl border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center">
                  <GripVertical className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="text-sm font-bold text-slate-700">
                    New #{index + 1}
                  </p>
                  <p className="text-xs text-slate-500">{page.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4 flex flex-wrap gap-3">
            <button
              onClick={applyReorder}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white ${
                loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Reordering...
                </>
              ) : (
                <>
                  <GripVertical className="h-4 w-4" />
                  Apply Reorder
                </>
              )}
            </button>

            <button
              onClick={clearAll}
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No PDF selected for reorder"
            desc="Upload one PDF and drag page cards to set a new order."
          />
        </div>
      )}

      <ResultPanel
        url={resultUrl}
        filename={resultFilename}
        onReset={clearAll}
      />
    </div>
  );
};

/* =========================================================
   COMPRESS PDF
========================================================= */

const CompressPdfTool = ({
  resultUrl,
  setResultUrl,
  resultFilename,
  setResultFilename,
}) => {
  const [fileObj, setFileObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [info, setInfo] = useState('');

  const clearResult = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl('');
    setResultFilename('');
  }, [resultUrl, setResultFilename, setResultUrl]);

  const onDrop = async (acceptedFiles) => {
    setError('');
    setSuccess('');
    setInfo('');
    clearResult();

    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      await PDFDocument.load(bytes);
      setFileObj(file);
    } catch {
      setError('Invalid PDF file.');
    }
  };

  const handleCompress = async () => {
    if (!fileObj) {
      setError('Please upload a PDF first.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setInfo('');
    clearResult();

    try {
      const before = fileObj.size;
      const bytes = await fileObj.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const compressedBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
        updateFieldAppearances: false,
      });

      const after = compressedBytes.length;
      const url = createPdfUrl(compressedBytes);

      setResultUrl(url);
      setResultFilename(
        sanitizeFilename(
          fileObj.name.replace(/\.pdf$/i, '') + '-compressed',
          'compressed-pdf',
        ),
      );
      setSuccess('PDF optimized successfully.');
      setInfo(
        `Original: ${formatBytes(before)} • Output: ${formatBytes(after)}`,
      );
    } catch (e) {
      console.error(e);
      setError('Failed to optimize PDF.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setFileObj(null);
    setError('');
    setSuccess('');
    setInfo('');
    clearResult();
  };

  return (
    <div>
      <StatusAlert type="error" text={error} />
      <StatusAlert type="success" text={success} />

      <UploadArea
        title="Upload PDF to Compress"
        subtitle="Client-side PDF optimization. Best for basic cleanup and smaller output where possible."
        onDrop={onDrop}
        multiple={false}
        buttonText="Browse PDF"
      />

      {fileObj ? (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start gap-3">
            <div className="rounded-xl bg-red-100 p-3">
              <FileText className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{fileObj.name}</h3>
              <p className="text-sm text-slate-500">
                {formatBytes(fileObj.size)}
              </p>
            </div>
          </div>

          {info && (
            <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
              {info}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCompress}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white ${
                loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                <>
                  <Minimize2 className="h-2 w-2" />
                  Compress PDF
                </>
              )}
            </button>

            <button
              onClick={clearAll}
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No PDF selected for compress"
            desc="Upload one PDF and generate an optimized version."
          />
        </div>
      )}

      <ResultPanel
        url={resultUrl}
        filename={resultFilename}
        onReset={clearAll}
      />
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdvancedPdfMerger() {
  const [activeTab, setActiveTab] = useState('merge');
  const [resultUrl, setResultUrl] = useState('');
  const [resultFilename, setResultFilename] = useState('');

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const activeMeta = useMemo(
    () => TABS.find((tab) => tab.id === activeTab),
    [activeTab],
  );

  const renderTool = () => {
    const sharedProps = {
      resultUrl,
      setResultUrl,
      resultFilename,
      setResultFilename,
    };

    switch (activeTab) {
      case 'image-to-pdf':
        return <ImageToPdfTool {...sharedProps} />;

      case 'merge':
        return <MergePdfTool {...sharedProps} />;

      case 'split':
        return <SplitPdfTool {...sharedProps} />;

      case 'rotate':
        return <RotatePdfTool {...sharedProps} />;

      case 'reorder':
        return <ReorderPdfTool {...sharedProps} />;

      case 'compress':
        return <CompressPdfTool {...sharedProps} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold tracking-tight text-slate-800 sm:text-xl">
              PDF Merge, Split, Rotate, Reorder &amp; Compress
            </h1>

            <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-blue-700">
              <p className="text-sm font-medium">{activeMeta?.label}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm h-fit">
            <h2 className="mb-4 px-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              PDF Tools
            </h2>

            <div className="space-y-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (resultUrl) URL.revokeObjectURL(resultUrl);
                      setResultUrl('');
                      setResultFilename('');
                      setActiveTab(tab.id);
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            {renderTool()}
          </main>
        </div>
      </div>
    </div>
  );
}
