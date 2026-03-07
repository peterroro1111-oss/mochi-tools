import ConvertTool from '../ConvertTool';
export default function Page() {
  return <ConvertTool fromFormat="png" toFormat="jpg" fromLabel="PNG" toLabel="JPG" mimeType="image/jpeg" extension="jpg" />;
}
