# TeenyHost - Simple File Hosting

A simple file hosting service that allows users to upload HTML, ZIP, and PDF files and get instant shareable links. Built as a clone of tiiny.host using Next.js and TypeScript.

## Features

- **Drag & Drop Upload**: Simply drag files into the browser for instant upload
- **Multiple File Types**: Support for HTML, ZIP, and PDF files (up to 25MB)
- **Instant Links**: Get a shareable URL immediately after upload
- **File Preview**: View HTML files and PDFs directly in the browser
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **No Registration Required**: Upload and share files without creating an account

## Tech Stack

- **Frontend**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **File Handling**: Native Node.js fs module
- **UUID Generation**: uuid library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd teenyhost
```

2. Install dependencies:
```bash
npm install
```

3. Create uploads directory:
```bash
mkdir -p public/uploads
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload a File**: 
   - Drag and drop an HTML, ZIP, or PDF file onto the upload area
   - Or click "Choose File" to select a file from your device

2. **Get Shareable Link**: 
   - After upload, you'll receive an instant shareable link
   - Copy the link to share with others

3. **View Files**:
   - HTML files are displayed with a live preview
   - PDF files are embedded for viewing
   - ZIP files can be downloaded

## API Endpoints

### POST /api/upload
Upload a file and get a shareable link.

**Request**: Multipart form data with file
**Response**: 
```json
{
  "id": "unique-file-id",
  "name": "original-filename.ext",
  "type": "file/mime-type",
  "size": 12345,
  "url": "https://your-domain.com/view/unique-file-id"
}
```

## File Structure

```
src/
├── app/
│   ├── api/upload/route.ts    # File upload API
│   ├── view/[id]/page.tsx     # File viewing page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main upload page
│   └── globals.css            # Global styles
└── components/
    └── FileViewer.tsx         # File display component
```

## Environment Variables

Create a `.env.local` file for production:

```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Deployment

The app can be deployed to any platform that supports Next.js:

- **Vercel**: Zero-config deployment
- **Netlify**: Static export with edge functions
- **Railway**: Container deployment
- **DigitalOcean**: App platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Inspired by [tiiny.host](https://tiiny.host)
- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons by [Lucide](https://lucide.dev)
