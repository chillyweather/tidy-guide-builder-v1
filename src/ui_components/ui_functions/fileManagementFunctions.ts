//@ts-nocheck
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import envConfig from "../../envConfig";
import { generateUniqueId } from "./generateUniqueId";

export async function uploadFileToServer(file: File, loggedInUser: string) {
  if (loggedInUser) {
    const currentUserName = loggedInUser!.split("@")[0];
    const uid = generateUniqueId();
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileNameWithoutExtension = file.name
      .split(".")
      .slice(0, -1)
      .join(".");

    const s3Client = new S3Client({
      endpoint: "https://nyc3.digitaloceanspaces.com",
      forcePathStyle: false,
      region: "us-east-1",
      credentials: {
        accessKeyId: "DO00D77GXR7EE6JEHJQ7",
        secretAccessKey: envConfig.DO_SECRET,
      },
    });

    const params = {
      Bucket: "tidy-guide-resources",
      Key: `images/${fileNameWithoutExtension}_${currentUserName}_${uid}.${fileExtension}`,
      Body: file,
      ACL: "public-read",
      Metadata: {
        image: `${file.name}`,
      },
    };

    const uploadObject = async () => {
      try {
        const data = await s3Client.send(new PutObjectCommand(params));
        if (data) {
          console.log("data :>> ", data);
          const url = `https://tidy-guide-resources.nyc3.digitaloceanspaces.com/images/${fileNameWithoutExtension}_${currentUserName}_${uid}.${fileExtension}`;
          return url;
        }
      } catch (err) {
        console.log("Error", err);
      }
    };

    const data = uploadObject();
    return data;
  }
}
