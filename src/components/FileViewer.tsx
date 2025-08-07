'use client'

import { useState } from 'react'
import { Download, FileText, Archive, Eye, Copy, Check } from 'lucide-react'

interface FileInfo {
  id: string
  filename: string
  extension?: string
  size: number
  content?: string
  mimeType: string
  downloadUrl: string
}

interface FileViewerProps {
  fileInfo: FileInfo
}

export default function FileViewer({ fileInfo }: FileViewerProps) {
  const [copied, setCopied] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = () => {
    if (fileInfo.extension === 'zip') return <Archive className="w-8 h-8 text-blue-500" />
    if (fileInfo.extension === 'pdf') return <FileText className="w-8 h-8 text-red-500" />
    if (fileInfo.extension === 'html' || fileInfo.extension === 'htm') return <FileText className="w-8 h-8 text-green-500" />
    return <FileText className="w-8 h-8 text-gray-500" />
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderFileContent = () => {
    if (fileInfo.extension === 'html' || fileInfo.extension === 'htm') {
      return (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">HTML Preview</span>
            </div>
            <a
              href={fileInfo.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Open in new tab
            </a>
          </div>
          <div className="h-96 overflow-auto">
            <iframe
              srcDoc={fileInfo.content}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              title="HTML Preview"
            />
          </div>
        </div>
      )
    }

    if (fileInfo.extension === 'pdf') {
      return (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">PDF Preview</span>
            </div>
            <a
              href={fileInfo.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Open PDF
            </a>
          </div>
          <div className="h-96">
            <embed
              src={fileInfo.downloadUrl}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </div>
      )
    }

    if (fileInfo.extension === 'zip') {
      return (
        <div className="bg-white rounded-lg border p-8 text-center">
          <Archive className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">ZIP Archive</h3>
          <p className="text-gray-600 mb-6">
            This is a ZIP archive file. Click the download button below to save it to your device.
          </p>
          <a
            href={fileInfo.downloadUrl}
            download
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download ZIP
          </a>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">File Ready</h3>
        <p className="text-gray-600 mb-6">Your file has been uploaded and is ready to download.</p>
        <a
          href={fileInfo.downloadUrl}
          download
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Download File
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TeenyHost</h1>
            </div>
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Upload New File
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* File Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {getFileIcon()}
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">{fileInfo.filename}</h2>
                <p className="text-gray-600">{formatFileSize(fileInfo.size)}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={copyToClipboard}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </button>
              <a
                href={fileInfo.downloadUrl}
                download
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </div>
          </div>

          {/* File Content */}
          {renderFileContent()}
        </div>

        {/* Share Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Share this file</h3>
          <p className="text-gray-600 mb-4">
            Anyone with this link can view and download your file. The link will remain active indefinitely.
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-gray-900 break-all">
                {typeof window !== 'undefined' ? window.location.href : ''}
              </span>
              <button
                onClick={copyToClipboard}
                className="ml-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
