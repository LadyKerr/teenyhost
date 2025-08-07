<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# TeenyHost - File Hosting Service

This is a Next.js application that provides simple file hosting similar to tiiny.host. The application allows users to upload HTML, ZIP, and PDF files and get shareable links.

## Architecture
- **Frontend**: Next.js 13+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes for file upload and management
- **Storage**: Local file system storage in `/public/uploads`
- **UI**: Modern, responsive design with drag-and-drop functionality

## Key Features
- Drag and drop file upload
- Support for HTML, ZIP, and PDF files
- Instant shareable links
- File preview for HTML and PDF
- Download functionality for all file types
- Responsive design

## File Structure
- `/src/app/page.tsx` - Main upload interface
- `/src/app/api/upload/route.ts` - File upload API endpoint
- `/src/app/view/[id]/page.tsx` - File viewing page
- `/src/components/FileViewer.tsx` - File display component

## Development Guidelines
- Use TypeScript for all new code
- Follow Next.js 13+ App Router patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Ensure files are properly validated before upload
- Maintain responsive design principles
