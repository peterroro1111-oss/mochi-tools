'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import { incrementFileCount } from '@/app/utils/usage';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function generatePassword(length: number, options: Record<string, boolean>): string {
  let charset = '';
  if (options.uppercase) charset += CHARSETS.uppercase;
  if (options.lowercase) charset += CHARSETS.lowercase;
  if (options.numbers) charset += CHARSETS.numbers;
  if (options.symbols) charset += CHARSETS.symbols;
  if (!charset) charset = CHARSETS.lowercase;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => charset[n % charset.length]).join('');
}

function getStrength(password: string): { level: number; key: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 16) score++;
  if (password.length >= 24) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 1, key: 'weak' };
  if (score <= 3) return { level: 2, key: 'medium' };
  if (score <= 4) return { level: 3, key: 'strong' };
  return { level: 4, key: 'veryStrong' };
}

const STRENGTH_COLORS = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-emerald-500'];

export default function PasswordGeneratorPage() {
  const t = useTranslations('passwordGenerator');
  const locale = useLocale();

  const [length, setLength] = useState(16);
  const [count, setCount] = useState(1);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = useCallback(() => {
    const results = Array.from({ length: count }, () =>
      generatePassword(length, options)
    );
    setPasswords(results);
    incrementFileCount(count);
  }, [length, count, options]);

  const copyPassword = (pw: string, index: number) => {
    navigator.clipboard.writeText(pw);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(passwords.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleOption = (key: string) => {
    const next = { ...options, [key]: !options[key as keyof typeof options] };
    if (!next.uppercase && !next.lowercase && !next.numbers && !next.symbols) return;
    setOptions(next);
  };

  const faqs = locale === 'zh'
    ? [
        { question: '這個密碼產生器安全嗎？', answer: '完全安全！密碼在你的瀏覽器本地生成，使用加密安全的 crypto.getRandomValues() API，不會傳送到任何伺服器。' },
        { question: '建議的密碼長度是多少？', answer: '建議至少 16 個字元，包含大小寫字母、數字和特殊符號，這樣的密碼非常難以被破解。' },
        { question: '可以一次生成多組密碼嗎？', answer: '可以！你可以設定批次數量，一次生成多組密碼，方便為不同帳號設定不同密碼。' },
      ]
    : [
        { question: 'Is this password generator secure?', answer: 'Absolutely! Passwords are generated locally in your browser using the cryptographically secure crypto.getRandomValues() API. Nothing is sent to any server.' },
        { question: 'What is the recommended password length?', answer: 'We recommend at least 16 characters including uppercase, lowercase, numbers, and symbols for a very strong password.' },
        { question: 'Can I generate multiple passwords at once?', answer: 'Yes! You can set the batch count to generate multiple passwords at once, great for setting up different passwords for different accounts.' },
      ];

  const relatedToolsList = locale === 'zh'
    ? [
        { href: '/qrcode', icon: '🔗', name: 'QR Code 產生器', desc: '產生各種 QR Code', gradient: 'from-teal-50 to-emerald-50', border: 'border-teal-200 hover:border-teal-400' },
        { href: '/tools/screen-recorder', icon: '🎥', name: '螢幕錄影', desc: '錄製螢幕畫面', gradient: 'from-red-50 to-orange-50', border: 'border-red-200 hover:border-red-400' },
        { href: '/tools/color', icon: '🎨', name: '顏色轉換', desc: 'HEX/RGB/HSL 互轉', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
        { href: '/pdf/encrypt', icon: '🔒', name: 'PDF 加密', desc: '為 PDF 設定密碼', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
      ]
    : [
        { href: '/qrcode', icon: '🔗', name: 'QR Code Generator', desc: 'Generate various QR codes', gradient: 'from-teal-50 to-emerald-50', border: 'border-teal-200 hover:border-teal-400' },
        { href: '/tools/screen-recorder', icon: '🎥', name: 'Screen Recorder', desc: 'Record your screen', gradient: 'from-red-50 to-orange-50', border: 'border-red-200 hover:border-red-400' },
        { href: '/tools/color', icon: '🎨', name: 'Color Converter', desc: 'HEX/RGB/HSL conversion', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
        { href: '/pdf/encrypt', icon: '🔒', name: 'PDF Encrypt', desc: 'Set PDF password', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
      ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center">🔑</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6 space-y-5">
        {/* Length Slider */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {t('lengthLabel')}: {length}
          </label>
          <input
            type="range"
            min={8}
            max={128}
            step={1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-pink-400"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>8</span>
            <span>128</span>
          </div>
        </div>

        {/* Character Options */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">{t('optionsLabel')}</label>
          <div className="grid grid-cols-2 gap-2">
            {(['uppercase', 'lowercase', 'numbers', 'symbols'] as const).map((key) => (
              <button
                key={key}
                onClick={() => toggleOption(key)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  options[key]
                    ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm'
                    : 'bg-pink-50 text-gray-600 hover:bg-pink-100'
                }`}
              >
                {t(`options.${key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Batch Count */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {t('countLabel')}: {count}
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-pink-400"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-2xl font-bold text-lg hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          🔑 {t('generateBtn')}
        </button>
      </div>

      {/* Results */}
      {passwords.length > 0 && (
        <div className="space-y-3">
          {passwords.map((pw, i) => {
            const strength = getStrength(pw);
            return (
              <div key={i} className="bg-white rounded-2xl border-2 border-pink-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-sm md:text-base text-gray-700 break-all flex-1 mr-3 select-all">
                    {pw}
                  </p>
                  <button
                    onClick={() => copyPassword(pw, i)}
                    className="px-4 py-2 bg-white border-2 border-pink-200 text-pink-500 rounded-xl text-sm font-medium hover:bg-pink-50 transition-all shrink-0"
                  >
                    {copied === i ? t('copied') : t('copyBtn')}
                  </button>
                </div>
                {/* Strength indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          level <= strength.level ? STRENGTH_COLORS[strength.level] : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{t(`strength.${strength.key}`)}</span>
                </div>
              </div>
            );
          })}

          {/* Copy All */}
          {passwords.length > 1 && (
            <button
              onClick={copyAll}
              className="w-full py-2 bg-pink-50 text-pink-500 rounded-xl text-sm font-medium hover:bg-pink-100 transition-all"
            >
              {copied === -1 ? t('copied') : t('copyAllBtn')}
            </button>
          )}
        </div>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
