import VideoConvertTool from '../VideoConvertTool';

export default function Page() {
  return (
    <VideoConvertTool
      fromLabel="MP4"
      toLabel="GIF"
      fromAccept="video/mp4,.mp4"
      outputMime="image/gif"
      outputExt="gif"
      ffmpegArgs={['-vf', 'fps=10,scale=480:-1:flags=lanczos', '-loop', '0']}
    />
  );
}
