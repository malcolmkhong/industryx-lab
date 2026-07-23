import Image from 'next/image'

export function Banner() {
  return (
    <section className="relative h-[300px] overflow-hidden sm:h-[440px]">
      <Image
        src="/moon-banner.webp"
        alt=""
        role="presentation"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[center_68%]"
        fill
        sizes="100vw"
      />
      {/* fade only the top and bottom edges into the page background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,transparent_20%,transparent_78%,hsl(var(--background))_100%)]" aria-hidden="true" />
    </section>
  )
}
