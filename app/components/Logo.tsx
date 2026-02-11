import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textClassName?: string;
}

export function Logo({ className = '', size = 'md', showText = true, textClassName }: LogoProps) {
  const sizes = {
    sm: { width: 60, text: 'text-xl', gap: 'gap-2' },
    md: { width: 80, text: 'text-2xl', gap: 'gap-3' },
    lg: { width: 120, text: 'text-5xl', gap: 'gap-4' },
  };

  const defaultTextColor = 'text-zinc-900 dark:text-stone-50';

  return (
    <div className={`flex items-center ${sizes[size].gap} ${className}`}>
      <Image
        src="/truga-green.svg"
        alt="Truga Logo"
        width={sizes[size].width}
        height={0}
        priority
        style={{ height: 'auto' }}
      />
      {showText && (
        <span className={`${sizes[size].text} font-bold tracking-tight pb-1 ${textClassName || defaultTextColor}`}>
          Upbox
        </span>
      )}
    </div>
  );
}

export function LogoMark({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/truga-green.svg"
      alt="Truga Logo"
      width={size}
      height={0}
      priority
      style={{ height: 'auto' }}
      className={className}
    />
  );
}
