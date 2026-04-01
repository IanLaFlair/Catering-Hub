import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const MIME: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;

    // Prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
        return new NextResponse('Not found', { status: 404 });
    }

    const ext = filename.split('.').pop()?.toLowerCase() ?? '';
    const contentType = MIME[ext];
    if (!contentType) {
        return new NextResponse('Not found', { status: 404 });
    }

    try {
        const filePath = join(process.cwd(), 'public', 'uploads', filename);
        const data = await readFile(filePath);
        return new NextResponse(data, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch {
        return new NextResponse('Not found', { status: 404 });
    }
}
