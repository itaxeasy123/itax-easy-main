'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Upload,
  Download,
  X,
  FileImage,
  AlertCircle,
  Edit3,
  Trash2,
  GripVertical,
  Eye,
  FileText,
  Image as ImageIcon,
  ArrowUpDown,
  CheckCircle2,
  Settings2,
} from 'lucide-react';
import Image from 'next/image';

const MAX_FILES = 50;
const MAX_FILE_SIZE_MB = 20;
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/bmp',
  'image/gif',
];

const qualityOptions = [
  { label: 'High', value: 0.92 },
  { label: 'Medium', value: 0.82 },
  { label: 'Compressed', value: 0.72 },
];

const themeClasses = {
  light: {
    page: 'bg-slate-50 text-slate-900',
    card: 'bg-white border border-slate-200 shadow-sm',
    softCard: 'bg-slate-50 border border-slate-200',
    input:
      'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
    drop: 'border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/40',
    subText: 'text-slate-500',
    primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
    successBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
    ghostBtn:
      'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700',
    dangerBtn: 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100',
    pill: 'bg-blue-50 text-blue-700 border border-blue-100',
    previewBg: 'bg-slate-100',
    overlay: 'bg-slate-900/70',
  },
};

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function sanitizeFilename(name = '') {
  const clean = name
    .trim()
    .replace(/\.pdf$/i, '')
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return clean || '';
}

function getImageOrientation(width, height) {
  return width >= height ? 'landscape' : 'portrait';
}

function moveItem(arr, fromIndex, toIndex) {
  const newArr = [...arr];
  const [moved] = newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, moved);
  return newArr;
}

const JPGToPDFConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const [customFilename, setCustomFilename] = useState('');
  const [compressionQuality, setCompressionQuality] = useState(0.82);
  const [previewPdfUrl, setPreviewPdfUrl] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeImagePreview, setActiveImagePreview] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [pageMode, setPageMode] = useState('auto'); // auto | portrait | landscape
  const [isDraggingArea, setIsDraggingArea] = useState(false);

  const fileInputRef = useRef(null);

  const theme = themeClasses.light;

  const totalSize = useMemo(
    () => selectedFiles.reduce((sum, item) => sum + (item.file?.size || 0), 0),
    [selectedFiles],
  );

  useEffect(() => {
    return () => {
      selectedFiles.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
      if (previewPdfUrl) URL.revokeObjectURL(previewPdfUrl);
    };
  }, [previewPdfUrl, selectedFiles]);

  const validateAndPrepareFiles = (files) => {
    const errors = [];
    const validEntries = [];

    if (!files?.length) return { validEntries, errors };

    const existingSignature = new Set(
      selectedFiles.map(
        (item) =>
          `${item.file.name}_${item.file.size}_${item.file.lastModified}`,
      ),
    );

    for (const file of files) {
      const signature = `${file.name}_${file.size}_${file.lastModified}`;

      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`${file.name} is not a supported image file.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
        continue;
      }

      if (existingSignature.has(signature)) {
        errors.push(`${file.name} is already added.`);
        continue;
      }

      validEntries.push({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        signature,
      });

      existingSignature.add(signature);
    }

    const remainingSlots = MAX_FILES - selectedFiles.length;
    if (validEntries.length > remainingSlots) {
      errors.push(`Only ${MAX_FILES} images are allowed.`);
    }

    return {
      validEntries: validEntries.slice(0, remainingSlots),
      errors,
    };
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const { validEntries, errors } = validateAndPrepareFiles(files);

    if (errors.length) setError(errors[0]);
    else setError('');

    if (validEntries.length) {
      setSelectedFiles((prev) => [...prev, ...validEntries]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingArea(false);

    const files = Array.from(e.dataTransfer.files || []);
    const { validEntries, errors } = validateAndPrepareFiles(files);

    if (errors.length) setError(errors[0]);
    else setError('');

    if (validEntries.length) {
      setSelectedFiles((prev) => [...prev, ...validEntries]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (id) => {
    setSelectedFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((f) => f.id !== id);
    });
    setError('');
  };

  const clearAllFiles = () => {
    selectedFiles.forEach((item) => {
      if (item.preview) URL.revokeObjectURL(item.preview);
    });
    setSelectedFiles([]);
    setCustomFilename('');
    setError('');
    if (previewPdfUrl) {
      URL.revokeObjectURL(previewPdfUrl);
      setPreviewPdfUrl('');
    }
    setPreviewOpen(false);
    setActiveImagePreview(null);
  };

  const loadImage = (file) =>
    new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const img = new window.Image();

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(img);
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error(`Failed to load image: ${file.name}`));
      };

      img.src = objectUrl;
    });

  const loadJsPDF = async () => {
    if (window?.jspdf?.jsPDF) {
      return window.jspdf.jsPDF;
    }

    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-jspdf="true"]');
      if (existing && window?.jspdf?.jsPDF) {
        resolve(window.jspdf.jsPDF);
        return;
      }

      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.async = true;
      script.dataset.jspdf = 'true';

      script.onload = () => {
        if (window?.jspdf?.jsPDF) {
          resolve(window.jspdf.jsPDF);
        } else {
          reject(new Error('jsPDF failed to initialize.'));
        }
      };

      script.onerror = () => reject(new Error('Failed to load jsPDF library.'));

      document.head.appendChild(script);
    });
  };

  const createPdfDocument = async () => {
    if (selectedFiles.length === 0) {
      throw new Error('Please select at least one image file.');
    }

    const jsPDF = await loadJsPDF();

    const firstImg = await loadImage(selectedFiles[0].file);
    const initialOrientation =
      pageMode === 'auto'
        ? getImageOrientation(firstImg.width, firstImg.height)
        : pageMode;

    const pdf = new jsPDF({
      orientation: initialOrientation,
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    for (let i = 0; i < selectedFiles.length; i++) {
      const fileObj = selectedFiles[i];
      const img = i === 0 ? firstImg : await loadImage(fileObj.file);

      const orientation =
        pageMode === 'auto'
          ? getImageOrientation(img.width, img.height)
          : pageMode;

      if (i > 0) {
        pdf.addPage('a4', orientation);
      } else {
        pdf.setPage(1);
      }

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 8;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      if (!ctx) {
        throw new Error('Canvas context is not available.');
      }

      if (
        fileObj.file.type === 'image/png' ||
        fileObj.file.type === 'image/webp' ||
        fileObj.file.type === 'image/gif'
      ) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const imgData = canvas.toDataURL('image/jpeg', compressionQuality);

      const imgRatio = img.width / img.height;
      let finalWidth = maxWidth;
      let finalHeight = finalWidth / imgRatio;

      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight * imgRatio;
      }

      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight, '', 'FAST');
    }

    return pdf;
  };

  const getFinalFilename = () => {
    const clean = sanitizeFilename(customFilename);
    if (clean) return `${clean}.pdf`;

    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    return `images-to-pdf-${stamp}.pdf`;
  };

  const convertToPDF = async () => {
    try {
      setIsConverting(true);
      setError('');

      const pdf = await createPdfDocument();
      pdf.save(getFinalFilename());
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Failed to convert images to PDF.');
    } finally {
      setIsConverting(false);
    }
  };

  const handlePdfPreview = async () => {
    try {
      setIsConverting(true);
      setError('');

      if (previewPdfUrl) {
        URL.revokeObjectURL(previewPdfUrl);
        setPreviewPdfUrl('');
      }

      const pdf = await createPdfDocument();
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      setPreviewPdfUrl(url);
      setPreviewOpen(true);
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Failed to generate PDF preview.');
    } finally {
      setIsConverting(false);
    }
  };

  const onDragStartCard = (id) => {
    setDraggedId(id);
  };

  const onDragEnterCard = (id) => {
    setDragOverId(id);
  };

  const onDropCard = (id) => {
    if (!draggedId || draggedId === id) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const fromIndex = selectedFiles.findIndex((item) => item.id === draggedId);
    const toIndex = selectedFiles.findIndex((item) => item.id === id);

    if (fromIndex === -1 || toIndex === -1) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    setSelectedFiles((prev) => moveItem(prev, fromIndex, toIndex));
    setDraggedId(null);
    setDragOverId(null);
  };

  const stats = useMemo(() => {
    return {
      count: selectedFiles.length,
      totalSize: formatBytes(totalSize),
      firstType: selectedFiles[0]?.file?.type || '-',
    };
  }, [selectedFiles, totalSize]);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${theme.page}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className={`rounded-3xl p-5 sm:p-6 ${theme.card}`}>
            <div className="mb-5">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <FileText className="h-4 w-4" />
                JPG to PDF Converter
              </div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Convert images into clean, professional PDF files
              </h1>

              <p className={`mt-2 max-w-2xl text-sm sm:text-base ${theme.subText}`}>
                Fast upload, image reorder, page auto orientation, PDF preview,
                and compression control — all in one compact page.
              </p>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={() => setIsDraggingArea(true)}
              onDragLeave={() => setIsDraggingArea(false)}
              className={`relative rounded-3xl border-2 border-dashed p-6 sm:p-8 transition-all duration-300 ${
                theme.drop
              } ${isDraggingArea ? 'scale-[1.01] border-blue-500' : ''}`}
            >
              <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <div className="mb-4 rounded-2xl bg-blue-600 p-4 text-white shadow-lg shadow-blue-500/20">
                  <Upload className="h-8 w-8" />
                </div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Drag & drop your images here
                </h2>

                <p className={`mt-2 text-sm sm:text-base ${theme.subText}`}>
                  Supports JPG, PNG, WEBP, BMP, GIF. Max {MAX_FILES} files, up
                  to {MAX_FILE_SIZE_MB}MB each.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${theme.primaryBtn}`}
                  >
                    <Upload className="h-4 w-4" />
                    Choose Images
                  </button>

                  {selectedFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllFiles}
                      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${theme.dangerBtn}`}
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear All
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {!error && selectedFiles.length > 0 && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">
                  Images loaded successfully. Drag cards to reorder pages in the
                  final PDF.
                </p>
              </div>
            )}

            {selectedFiles.length > 0 && (
              <div className="mt-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold sm:text-xl">
                      Selected Images ({selectedFiles.length})
                    </h3>
                    <p className={`text-sm ${theme.subText}`}>
                      Drag to change order. First image becomes page 1.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.pill}`}
                    >
                      {stats.totalSize}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.pill}`}
                    >
                      {stats.count} files
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {selectedFiles.map((fileObj, index) => {
                    const isDragTarget = dragOverId === fileObj.id;
                    return (
                      <div
                        key={fileObj.id}
                        draggable
                        onDragStart={() => onDragStartCard(fileObj.id)}
                        onDragEnter={() => onDragEnterCard(fileObj.id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => onDropCard(fileObj.id)}
                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 ${
                          isDragTarget
                            ? 'border-blue-500 ring-4 ring-blue-200'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="absolute left-2 top-2 z-20 flex items-center gap-2">
                          <span className="rounded-full bg-black/65 px-2 py-1 text-[10px] font-bold text-white">
                            #{index + 1}
                          </span>
                          <span className="rounded-full bg-black/65 p-1 text-white">
                            <GripVertical className="h-3.5 w-3.5" />
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFile(fileObj.id)}
                          className="absolute right-2 top-2 z-20 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveImagePreview(fileObj.preview)}
                          className="absolute bottom-2 right-2 z-20 rounded-full bg-white/90 p-2 text-slate-800 opacity-0 shadow transition group-hover:opacity-100"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <div
                          className={`aspect-[4/3] overflow-hidden ${theme.previewBg}`}
                        >
                          {/* <img
                            src={fileObj.preview}
                            alt={fileObj.file.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          /> */}
                          <Image
                            src={fileObj.preview}
                            alt={fileObj.file.name}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-3">
                          <p
                            className="truncate text-sm font-semibold"
                            title={fileObj.file.name}
                          >
                            {fileObj.file.name}
                          </p>
                          <div
                            className={`mt-1 flex items-center justify-between text-xs ${theme.subText}`}
                          >
                            <span>{formatBytes(fileObj.file.size)}</span>
                            <span className="capitalize">
                              {fileObj.file.type.split('/')[1]}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className={`rounded-3xl p-5 ${theme.card}`}>
              <div className="mb-4 flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                <h3 className="text-lg font-bold">PDF Settings</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Edit3 className="h-4 w-4" />
                    Custom Filename
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customFilename}
                      onChange={(e) => setCustomFilename(e.target.value)}
                      placeholder="Enter filename"
                      maxLength={100}
                      className={`w-full rounded-2xl px-4 py-3 outline-none transition ${theme.input}`}
                    />
                    <span className={`text-sm font-semibold ${theme.subText}`}>
                      .pdf
                    </span>
                  </div>
                  <p className={`mt-2 text-xs ${theme.subText}`}>
                    Leave empty to use automatic timestamp.
                  </p>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <ArrowUpDown className="h-4 w-4" />
                    Page Orientation
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Auto', value: 'auto' },
                      { label: 'Portrait', value: 'portrait' },
                      { label: 'Landscape', value: 'landscape' },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setPageMode(item.value)}
                        className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                          pageMode === item.value
                            ? 'bg-blue-600 text-white'
                            : theme.ghostBtn
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <ImageIcon className="h-4 w-4" />
                    Image Compression
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {qualityOptions.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setCompressionQuality(item.value)}
                        className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                          compressionQuality === item.value
                            ? 'bg-emerald-600 text-white'
                            : theme.ghostBtn
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <p className={`mt-2 text-xs ${theme.subText}`}>
                    Lower compression gives smaller file size, higher
                    compression keeps more image quality.
                  </p>
                </div>
              </div>
            </div>

            <div className={`rounded-3xl p-5 ${theme.card}`}>
              <h3 className="mb-4 text-lg font-bold">Quick Summary</h3>

              <div className="grid gap-3">
                <div className={`rounded-2xl p-4 ${theme.softCard}`}>
                  <p
                    className={`text-xs uppercase tracking-wide ${theme.subText}`}
                  >
                    Total Images
                  </p>
                  <p className="mt-1 text-2xl font-black">{stats.count}</p>
                </div>

                <div className={`rounded-2xl p-4 ${theme.softCard}`}>
                  <p
                    className={`text-xs uppercase tracking-wide ${theme.subText}`}
                  >
                    Total Size
                  </p>
                  <p className="mt-1 text-2xl font-black">{stats.totalSize}</p>
                </div>

                <div className={`rounded-2xl p-4 ${theme.softCard}`}>
                  <p
                    className={`text-xs uppercase tracking-wide ${theme.subText}`}
                  >
                    Mode
                  </p>
                  <p className="mt-1 text-lg font-bold capitalize">
                    {pageMode}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={handlePdfPreview}
                  disabled={isConverting || selectedFiles.length === 0}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold transition ${
                    isConverting || selectedFiles.length === 0
                      ? 'cursor-not-allowed bg-slate-300 text-white'
                      : theme.primaryBtn
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  {isConverting ? 'Generating Preview...' : 'Preview PDF'}
                </button>

                <button
                  type="button"
                  onClick={convertToPDF}
                  disabled={isConverting || selectedFiles.length === 0}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold transition ${
                    isConverting || selectedFiles.length === 0
                      ? 'cursor-not-allowed bg-slate-300 text-white'
                      : theme.successBtn
                  }`}
                >
                  <Download className="h-4 w-4" />
                  {isConverting ? 'Converting...' : 'Download PDF'}
                </button>
              </div>
            </div>

            <div className={`rounded-3xl p-5 ${theme.card}`}>
              <h3 className="mb-3 text-lg font-bold">Tips</h3>
              <ul className={`space-y-2 text-sm ${theme.subText}`}>
                <li>• Drag image cards to change page order.</li>
                <li>
                  • Auto orientation adjusts each page based on image shape.
                </li>
                <li>• Use Compressed mode for smaller PDF size.</li>
                <li>• PNG/GIF background is flattened to white in PDF.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {activeImagePreview && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.overlay}`}
          onClick={() => setActiveImagePreview(null)}
        >
          <div
            className={`relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl ${theme.card}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImagePreview(null)}
              className="absolute right-4 top-4 z-20 rounded-full bg-red-600 p-2 text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[90vh] overflow-auto p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImagePreview}
                alt="Preview"
                className="mx-auto h-auto max-w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {previewOpen && previewPdfUrl && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.overlay}`}
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className={`relative h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl ${theme.card}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <h3 className="text-lg font-bold">PDF Preview</h3>
                <p className={`text-sm ${theme.subText}`}>
                  {getFinalFilename()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={convertToPDF}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ${theme.successBtn}`}
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewOpen(false)}
                  className="rounded-full bg-red-600 p-2 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <iframe
              src={previewPdfUrl}
              title="PDF Preview"
              className="h-[calc(90vh-72px)] w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JPGToPDFConverter;
