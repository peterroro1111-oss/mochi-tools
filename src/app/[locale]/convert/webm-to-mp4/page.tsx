import VideoConvertTool from '../VideoConvertTool';

export default function Page() {
  return (
    <VideoConvertTool
      fromLabel="WebM"
      toLabel="MP4"
      fromAccept="video/webm,.webm"
      outputMime="video/mp4"
      outputExt="mp4"
      ffmpegArgs={['-c:v', 'libx264', '-crf', '23', '-preset', 'fast', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart']}
    />
  );
}
