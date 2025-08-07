'use client'

import { useState, useCallback } from 'react'
import { Upload, FileText, Archive, Image, Link2, Copy, Check } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export default function Home() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [copied, setCopied] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        const result = await response.json()
        setUploadedFile(result)
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const copyToClipboard = async () => {
    if (uploadedFile) {
      await navigator.clipboard.writeText(uploadedFile.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes('zip')) return <Archive className="w-8 h-8 text-blue-500" />
    if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />
    if (type.includes('html')) return <FileText className="w-8 h-8 text-green-500" />
    return <Image className="w-8 h-8 text-purple-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TeenyHost</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The simplest way to host & share your files online
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Drag & drop HTML files, ZIP folders, or PDFs to get an instant shareable link
          </p>
        </div>

        {!uploadedFile ? (
          /* Upload Area */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600">Uploading your file...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drag & drop your file here
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Support for HTML, ZIP, PDF files up to 25MB
                  </p>
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      accept=".html,.htm,.zip,.pdf"
                      onChange={handleFileInput}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">File uploaded successfully!</h3>
              <p className="text-gray-600 mb-6">Your file is now live and ready to share</p>
              
              {/* File Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  {getFileIcon(uploadedFile.type)}
                  <div className="ml-4 text-left">
                    <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                </div>
                
                {/* Shareable Link */}
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Link2 className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm font-mono text-gray-900 break-all">
                        {uploadedFile.url}
                      </span>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setUploadedFile(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Upload Another File
              </button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag & Drop</h3>
            <p className="text-gray-600">Simply drag your files into the browser for instant upload</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Links</h3>
            <p className="text-gray-600">Get a shareable URL immediately after upload</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">Support for HTML, ZIP, and PDF file formats</p>
          </div>
        </div>
      </main>
    </div>
  )
}
