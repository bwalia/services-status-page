const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const fetchDataFromMinio = async (bucketName, objectName) => {
  return new Promise((resolve, reject) => {
    let data = '';
    minioClient.getObject(bucketName, objectName, (err, stream) => {
      if (err) {
        return reject(err);
      }
      stream.on('data', (chunk) => {
        data += chunk;
      });
      stream.on('end', () => {
        resolve(JSON.parse(data));
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  });
};

module.exports = fetchDataFromMinio;
