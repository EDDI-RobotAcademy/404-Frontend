export default function BrandLogo({ className = 'h-8 w-auto', alt = 'CHECKMATE' }) {
  return (
    <img
      src="/logo-checkmate.png"
      alt={alt}
      className={`object-contain object-left ${className}`}
      draggable={false}
    />
  )
}
