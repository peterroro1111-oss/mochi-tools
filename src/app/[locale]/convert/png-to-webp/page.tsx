import ConvertTool from '../ConvertTool';
export default function Page() {
  return <ConvertTool fromFormat="png" toFormat="webp" fromLabel="PNG" toLabel="WebP" mimeType="image/webp" extension="webp" />;
}
