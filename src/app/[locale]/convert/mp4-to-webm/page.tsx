import VideoConvertTool from '../VideoConvertTool';

export default function Page() {
  return (
    <VideoConvertTool
      fromLabel="MP4"
      toLabel="WebM"
      fromAccept="video/mp4,.mp4"
      outputMime="video/webm"
      outputExt="webm"
      ffmpegArgs={['-c:v', 'libvpx', '-b:v', '1M', '-c:a', 'libvorbis']}
    />
  );
}
