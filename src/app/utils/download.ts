export function downloadFile(blob: Blob, filename: string) {
  // Only use Web Share API on mobile devices
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile && navigator.share && navigator.canShare) {
    const file = new File([blob], filename, { type: blob.type });
    if (navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file] }).catch(() => {
        fallbackDownload(blob, filename);
      });
      return;
    }
  }
  fallbackDownload(blob, filename);
}

function fallbackDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(url, "_blank");
    } else {
      URL.revokeObjectURL(url);
    }
  }, 100);
}
