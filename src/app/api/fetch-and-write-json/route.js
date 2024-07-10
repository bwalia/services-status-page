import { NextResponse } from 'next/server';
import path from 'path';
import fetchDataFromMinio from '@/lib/minioClient';
import writeJsonFile from '@/lib/writeJsonFiles';

export async function POST(req) {
  try {
    const { bucketName } = await req.json();
    console.log({bucketName});
    const jsonDirectory = path.join(process.cwd(), 'src/data/services');

    const data = await fetchDataFromMinio(bucketName);
    console.log({data});
    // writeJsonFile(jsonDirectory, fileName, data);

    return NextResponse.json({ message: 'File written successfully' });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
