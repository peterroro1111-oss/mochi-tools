import VideoConvertTool from '../VideoConvertTool';

export default function Page() {
  return (
    <VideoConvertTool
      fromLabel="MOV"
      toLabel="MP4"
      fromAccept="video/quicktime,.mov"
      outputMime="video/mp4"
      outputExt="mp4"
      ffmpegArgs={['-c:v', 'libx264', '-crf', '23', '-preset', 'fast', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart']}
    />
  );
}
