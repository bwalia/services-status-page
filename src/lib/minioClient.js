const Minio = require('minio');
import path from 'path';
const fs = require('fs');

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const fetchDataFromMinio = async (bucketName) => {
  // return new Promise((resolve, reject) => {
  //   let data = '';
  //   minioClient.listObjectsV2(bucketName, '', true, '', (err, stream) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     stream.on('data', (chunk) => {
  //       data += chunk;
  //     });
  //     stream.on('end', () => {
  //       resolve(JSON.parse(data));
  //     });
  //     stream.on('error', (err) => {
  //       reject(err);
  //     });
  //   });
  // })



    const dataDir = path.join(process.cwd(), 'src/data/services');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    const objects = [];
    const stream = minioClient.listObjectsV2(bucketName, '', true);
    stream.on('data', (obj) => objects.push(obj));
    stream.on('end', async () => {
      for (const object of objects) {
        const objectName = object.name;
        const filePath = path.join(dataDir, objectName);

        const objectStream = await new Promise((resolve, reject) => {
          minioClient.getObject(bucketName, objectName, (err, stream) => {
            if (err) {
              return reject(err);
            }
            resolve(stream);
          });
        });

        const writeStream = fs.createWriteStream(filePath);
        objectStream.pipe(writeStream);

        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });
      }
    // })
  });
};

module.exports = fetchDataFromMinio;
