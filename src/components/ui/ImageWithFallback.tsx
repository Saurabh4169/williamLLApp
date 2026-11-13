import React, { useState } from 'react';
import { APP_IMAGES } from '../../data/images';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageKey?: string;
  fallbackSrc?: string;
  aspectRatio?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  imageKey,
  src,
  alt,
  fallbackSrc,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  loading = 'lazy',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const asset = imageKey ? APP_IMAGES[imageKey] : undefined;
  const imageSrc = hasError ? (fallbackSrc || APP_IMAGES.heroChicagoSkyline.src) : (asset?.src || src || APP_IMAGES.heroChicagoSkyline.src);
  const imageAlt = alt || asset?.alt || 'Williams & Williams LLC Chicago Zoning';
  const blurColor = asset?.blurColor || '#1F2A44';

  return (
    <div
      className={`relative overflow-hidden bg-[${blurColor}] ${aspectRatio} ${className}`}
      style={{ backgroundColor: blurColor }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        loading={loading}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200/20 via-white/10 to-slate-200/20"
          style={{ backdropFilter: 'blur(8px)' }}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;

