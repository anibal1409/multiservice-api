import { resolve } from 'path';

// Folders
export const CustomAssetsPathFolder = resolve('public');
export const DefaultAssetsFolder = resolve(__dirname, 'public');

// Image names
export const ImgName = 'image-org.jpg';
export const DefaultImgOrgName = 'default-org.jpg';

// Direct images paths
export const CustomImgOrgPath = resolve(CustomAssetsPathFolder, ImgName);
export const DefaultImgOrgPath = resolve(
  DefaultAssetsFolder,
  DefaultImgOrgName,
);
