import { notFound } from 'next/navigation'
import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import FileViewer from '@/components/FileViewer'

interface PageProps {
  params: {
    id: string
  }
}

async function getFileInfo(id: string) {
  try {
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    const files = await readdir(uploadsDir)
    
    // Find file with matching ID
    const matchingFile = files.find(file => file.startsWith(id))
    
    if (!matchingFile) {
      return null
    }

    const filePath = join(uploadsDir, matchingFile)
    const fileStats = await stat(filePath)
    const fileExtension = matchingFile.split('.').pop()?.toLowerCase()

    let content = null
    let mimeType = 'application/octet-stream'

    // Read file content for display
    if (fileExtension === 'html' || fileExtension === 'htm') {
      content = await readFile(filePath, 'utf-8')
      mimeType = 'text/html'
    } else if (fileExtension === 'pdf') {
      mimeType = 'application/pdf'
    } else if (fileExtension === 'zip') {
      mimeType = 'application/zip'
    }

    return {
      id,
      filename: matchingFile,
      extension: fileExtension,
      size: fileStats.size,
      content,
      mimeType,
      downloadUrl: `/uploads/${matchingFile}`
    }
  } catch (error) {
    console.error('Error getting file info:', error)
    return null
  }
}

export default async function ViewFile({ params }: PageProps) {
  const fileInfo = await getFileInfo(params.id)

  if (!fileInfo) {
    notFound()
  }

  return <FileViewer fileInfo={fileInfo} />
}
