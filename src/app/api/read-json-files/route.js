import { NextResponse } from 'next/server';
import path from 'path';
import readJsonFiles from '@/lib/readJsonFiles';

export async function GET() {
    const jsonDirectory = path.join(process.cwd(), 'src/data/services');
    await readJsonFiles(jsonDirectory, "update");
    
    const data = await readJsonFiles(jsonDirectory, "get");
    return NextResponse.json(data);
}
