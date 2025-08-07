import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Check file size (25MB limit)
    const maxSize = 25 * 1024 * 1024 // 25MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 25MB.' }, { status: 400 })
    }

    // Check file type
    const allowedTypes = [
      'text/html',
      'application/zip',
      'application/x-zip-compressed',
      'application/pdf'
    ]
    
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.html') && !file.name.endsWith('.htm')) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only HTML, ZIP, and PDF files are allowed.' 
      }, { status: 400 })
    }

    // Generate unique ID and filename
    const fileId = uuidv4()
    const fileExtension = file.name.split('.').pop() || 'bin'
    const fileName = `${fileId}.${fileExtension}`

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    // Generate shareable URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const shareableUrl = `${baseUrl}/view/${fileId}`

    // Return file info
    return NextResponse.json({
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: shareableUrl
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
