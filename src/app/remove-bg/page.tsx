import Link from 'next/link';

export default function RemoveBgPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🎨</div>
      <h1 className="text-3xl font-bold mb-2">AI 去背</h1>
      <p className="text-gray-400 mb-8">此功能開發中，敬請期待！</p>
      <Link href="/" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all">
        ← 回首頁
      </Link>
    </div>
  );
}
