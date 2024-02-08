import { uploadFileToServer } from "./fileManagementFunctions";
import { useEffect, useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";

export async function sendRaster(
  bytes: Uint8Array,
  loggedInUser: string,
  type: string
) {
  //   const {
  //     setAnatomySectionImage,
  //     setSpacingSectionImage,
  //     setPropertySectionImage,
  //     setVariantsSectionImage,
  //   } = useContext(BuilderContext) || {};
  //
  //   const blob = new Blob([bytes], { type: "image/svg+xml" });
  //   const file = new File([blob], `${type}.svg`, { type: "image/svg+xml" });
  //
  //   const url = await uploadFileToServer(file, loggedInUser);
  //
  //   setImageState(
  //     type,
  //     setAnatomySectionImage,
  //     url,
  //     setSpacingSectionImage,
  //     setPropertySectionImage,
  //     setVariantsSectionImage
  //   );
  //   return url;
}

function setImageState(
  type: string,
  setAnatomySectionImage: any,
  url: string | undefined,
  setSpacingSectionImage: any,
  setPropertySectionImage: any,
  setVariantsSectionImage: any
) {
  if (type === "anatomy") setAnatomySectionImage(url);
  if (type === "spacing") setSpacingSectionImage(url);
  if (type === "property") setPropertySectionImage(url);
  if (type === "variants") setVariantsSectionImage(url);
}
