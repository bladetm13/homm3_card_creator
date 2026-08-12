import { fileOpen } from "browser-fs-access";

/**
 * The largest art on any piece is the hero board portrait at 52mm, which is
 * about 1230px at 600 DPI. Anything above this cap is invisible in print but
 * costs memory in every card that shows it, and bloats the saved card file —
 * a 12MP photo is 1.7MB of base64 and 46MB once decoded, against 360KB and
 * 4MB when capped.
 */
const MAX_EDGE = 1200;

export async function selectImageAsBase64(): Promise<string> {
  // Prompt the user to select an image file
  const file = await fileOpen({
    mimeTypes: ["image/*"],
    extensions: [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"],
    multiple: false,
  });

  if (!file) throw new Error("No file was selected");

  // Read the file and convert it to a base64 data URL
  const base64 = await readFileAsDataURL(file);
  return downscale(base64);
}

/**
 * Shrinks an image to the print cap, if it is over it. Images already within
 * the cap are handed back untouched, so nothing is re-encoded — and so PNG
 * transparency, which the JPEG re-encode would flatten, survives whenever it
 * can. Anything that cannot be decoded is passed through as it came in.
 */
async function downscale(dataUrl: string): Promise<string> {
  let image: HTMLImageElement;
  try {
    image = await loadImage(dataUrl);
  } catch {
    return dataUrl;
  }

  const longest = Math.max(image.naturalWidth, image.naturalHeight);
  if (!longest || longest <= MAX_EDGE) return dataUrl;

  const scale = MAX_EDGE / longest;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

  const context = canvas.getContext("2d");
  if (!context) return dataUrl;

  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Transparency is kept as PNG; everything else takes the far smaller JPEG.
  const type = hasTransparency(context, canvas) ? "image/png" : "image/jpeg";
  const shrunk = canvas.toDataURL(type, 0.85);

  // A small source can still re-encode larger than it arrived.
  return shrunk.length < dataUrl.length ? shrunk : dataUrl;
}

function hasTransparency(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
): boolean {
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to decode the image"));
    image.src = src;
  });
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Failed to read file as string");
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
