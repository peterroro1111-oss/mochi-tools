'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';
import { downloadFile } from '@/app/utils/download';
import dynamic from 'next/dynamic';

const LocationMap = dynamic(() => import('@/components/LocationMap'), { ssr: false });

type QRType = 'url' | 'text' | 'email' | 'location' | 'phone' | 'wifi' | 'paypal' | 'bitcoin' | 'event';

const TAB_KEYS: QRType[] = ['url', 'text', 'email', 'location', 'phone', 'wifi', 'paypal', 'bitcoin', 'event'];

function formatDateForVCal(dateStr: string): string {
  if (!dateStr) return '';
  return dateStr.replace(/[-:]/g, '') + '00';
}

export default function QRCodePage() {
  const t = useTranslations('qrcode');
  const [activeTab, setActiveTab] = useState<QRType>('url');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLDivElement>(null);

  // Per-type form state
  const [urlValue, setUrlValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [lat, setLat] = useState(23.5);
  const [lng, setLng] = useState(121.0);
  const [locationTouched, setLocationTouched] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ssid, setSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [paypalUsername, setPaypalUsername] = useState('');
  const [paypalAmount, setPaypalAmount] = useState('');
  const [btcAddress, setBtcAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [btcLabel, setBtcLabel] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');

  const qrValue = useMemo(() => {
    switch (activeTab) {
      case 'url':
        return urlValue;
      case 'text':
        return textValue;
      case 'email': {
        if (!emailTo) return '';
        const params = new URLSearchParams();
        if (emailSubject) params.set('subject', emailSubject);
        if (emailBody) params.set('body', emailBody);
        const qs = params.toString();
        return `mailto:${emailTo}${qs ? '?' + qs : ''}`;
      }
      case 'location':
        return locationTouched ? `geo:${lat.toFixed(6)},${lng.toFixed(6)}` : '';
      case 'phone':
        return phoneNumber ? `tel:${phoneNumber}` : '';
      case 'wifi':
        return ssid ? `WIFI:T:${encryption};S:${ssid};P:${wifiPass};;` : '';
      case 'paypal': {
        if (!paypalUsername) return '';
        return paypalAmount
          ? `https://paypal.me/${paypalUsername}/${paypalAmount}`
          : `https://paypal.me/${paypalUsername}`;
      }
      case 'bitcoin': {
        if (!btcAddress) return '';
        const params = new URLSearchParams();
        if (btcAmount) params.set('amount', btcAmount);
        if (btcLabel) params.set('label', btcLabel);
        const qs = params.toString();
        return `bitcoin:${btcAddress}${qs ? '?' + qs : ''}`;
      }
      case 'event': {
        if (!eventTitle) return '';
        let vcal = 'BEGIN:VCALENDAR\nBEGIN:VEVENT';
        vcal += `\nSUMMARY:${eventTitle}`;
        if (eventLocation) vcal += `\nLOCATION:${eventLocation}`;
        if (eventStart) vcal += `\nDTSTART:${formatDateForVCal(eventStart)}`;
        if (eventEnd) vcal += `\nDTEND:${formatDateForVCal(eventEnd)}`;
        vcal += '\nEND:VEVENT\nEND:VCALENDAR';
        return vcal;
      }
      default:
        return '';
    }
  }, [activeTab, urlValue, textValue, emailTo, emailSubject, emailBody, lat, lng, locationTouched, phoneNumber, ssid, wifiPass, encryption, paypalUsername, paypalAmount, btcAddress, btcAmount, btcLabel, eventTitle, eventLocation, eventStart, eventEnd]);

  const download = useCallback(() => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      downloadFile(blob, 'qrcode.png');
    }, 'image/png');
  }, []);

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none transition-colors text-gray-700";
  const labelClass = "text-sm font-medium text-gray-700 mb-1 block";

  const renderForm = () => {
    switch (activeTab) {
      case 'url':
        return (
          <div>
            <label className={labelClass}>{t('url.label')}</label>
            <input type="url" value={urlValue} onChange={(e) => setUrlValue(e.target.value)} placeholder={t('url.placeholder')} className={inputClass} />
          </div>
        );
      case 'text':
        return (
          <div>
            <label className={labelClass}>{t('text.label')}</label>
            <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder={t('text.placeholder')} rows={4} className={inputClass + ' resize-none'} />
          </div>
        );
      case 'email':
        return (
          <div className="space-y-3">
            <div>
              <label className={labelClass}>{t('email.to')}</label>
              <input type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} placeholder={t('email.toPlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('email.subject')}</label>
              <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder={t('email.subjectPlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('email.body')}</label>
              <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder={t('email.bodyPlaceholder')} rows={3} className={inputClass + ' resize-none'} />
            </div>
          </div>
        );
      case 'location':
        return (
          <LocationMap
            lat={lat}
            lng={lng}
            onPositionChange={(newLat, newLng) => {
              setLat(newLat);
              setLng(newLng);
              setLocationTouched(true);
            }}
            searchPlaceholder={t('location.searchPlaceholder')}
            latLabel={t('location.lat')}
            lngLabel={t('location.lng')}
          />
        );
      case 'phone':
        return (
          <div>
            <label className={labelClass}>{t('phone.label')}</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder={t('phone.placeholder')} className={inputClass} />
          </div>
        );
      case 'wifi':
        return (
          <div className="space-y-3">
            <div>
              <label className={labelClass}>{t('wifi.ssid')}</label>
              <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder={t('wifi.ssidPlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('wifi.password')}</label>
              <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder={t('wifi.passwordPlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('wifi.encryption')}</label>
              <div className="flex gap-2">
                {(['WPA', 'WEP', 'nopass'] as const).map((enc) => (
                  <button
                    key={enc}
                    onClick={() => setEncryption(enc)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
                      encryption === enc
                        ? 'border-pink-400 bg-pink-50 text-pink-600'
                        : 'border-pink-100 text-gray-500 hover:border-pink-200'
                    }`}
                  >
                    {enc === 'nopass' ? t('wifi.none') : enc === 'WPA' ? t('wifi.wpa') : t('wifi.wep')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'paypal':
        return (
          <div className="space-y-3">
            <div>
              <label className={labelClass}>{t('paypal.username')}</label>
              <input type="text" value={paypalUsername} onChange={(e) => setPaypalUsername(e.target.value)} placeholder={t('paypal.usernamePlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('paypal.amount')}</label>
              <input type="text" value={paypalAmount} onChange={(e) => setPaypalAmount(e.target.value)} placeholder={t('paypal.amountPlaceholder')} className={inputClass} />
            </div>
          </div>
        );
      case 'bitcoin':
        return (
          <div className="space-y-3">
            <div>
              <label className={labelClass}>{t('bitcoin.address')}</label>
              <input type="text" value={btcAddress} onChange={(e) => setBtcAddress(e.target.value)} placeholder={t('bitcoin.addressPlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('bitcoin.amount')}</label>
              <input type="text" value={btcAmount} onChange={(e) => setBtcAmount(e.target.value)} placeholder={t('bitcoin.amountPlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('bitcoin.label')}</label>
              <input type="text" value={btcLabel} onChange={(e) => setBtcLabel(e.target.value)} placeholder={t('bitcoin.labelPlaceholder')} className={inputClass} />
            </div>
          </div>
        );
      case 'event':
        return (
          <div className="space-y-3">
            <div>
              <label className={labelClass}>{t('event.titleLabel')}</label>
              <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder={t('event.titlePlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('event.locationLabel')}</label>
              <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder={t('event.locationPlaceholder')} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>{t('event.start')}</label>
                <input type="datetime-local" value={eventStart} onChange={(e) => setEventStart(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t('event.end')}</label>
                <input type="datetime-local" value={eventEnd} onChange={(e) => setEventEnd(e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center">🔗</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {/* Tab bar */}
      <div
        className="flex flex-wrap gap-2 pb-2 mb-6"
      >
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === key
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm'
                : 'bg-pink-50 text-gray-600 hover:bg-pink-100'
            }`}
          >
            {t(`tabs.${key}`)}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6 space-y-4">
        {renderForm()}

        {/* Size slider */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            {t('sizeLabel')}: {size}px
          </label>
          <input
            type="range"
            min={128}
            max={512}
            step={16}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-pink-400"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('fgColorLabel')}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border-2 border-pink-100 cursor-pointer"
              />
              <span className="text-sm text-gray-500">{fgColor}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('bgColorLabel')}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border-2 border-pink-100 cursor-pointer"
              />
              <span className="text-sm text-gray-500">{bgColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl border-2 border-pink-100 p-6 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-4 text-center">{t('preview')}</p>
        <div ref={qrRef} className="flex justify-center">
          {qrValue ? (
            <QRCodeCanvas
              value={qrValue}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level="M"
              includeMargin
              style={{ borderRadius: '12px' }}
            />
          ) : (
            <div
              className="flex items-center justify-center border-2 border-dashed border-pink-200 rounded-xl text-gray-400 text-sm"
              style={{ width: size, height: size }}
            >
              {t('emptyHint')}
            </div>
          )}
        </div>
      </div>

      {/* Download */}
      {qrValue && (
        <div className="flex justify-center">
          <button
            onClick={download}
            className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            {t('downloadBtn')}
          </button>
        </div>
      )}
    </div>
  );
}
