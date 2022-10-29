require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

//UPLOAD TO AWS S3
function uploadFile(file) {
    const fileContent = fs.readFileSync(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileContent,
        Key: file.originalFilename,
        ContentType: file.headers['content-type'],
    };
    return s3.upload(uploadParams).promise(); // this will upload file to S3
}

//DELETE FROM AWS S3
function deleteFile(fileKey) {
    return s3.deleteObject({
        Bucket: bucketName,
        Key: fileKey
    },
        function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log('successssss');           // successful response
        });
}

module.exports = { uploadFile, deleteFile };