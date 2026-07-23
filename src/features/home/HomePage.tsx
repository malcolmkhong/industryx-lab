import { EditorialByline } from '@/components/seo/EditorialByline'
import { Hero } from './components/sections/Hero'
import { Stats } from './components/sections/Stats'
import { Desktop } from './components/sections/Desktop'
import { Features } from './components/sections/Features'
import { Install } from './components/sections/Install'
import { Banner } from './components/sections/Banner'
import { Invite } from './components/cta/Invite'
import { MobileCta } from './components/sections/MobileCta'

export function HomePage() {
  return (
    <>
      <main id="main-content" role="main">
        <Hero />
        <div className="content-visibility-auto">
          <Stats />
          <Desktop />
          <Features />
          <Install />
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
            <EditorialByline />
          </div>
          <Banner />
          <Invite />
        </div>
      </main>
      <MobileCta />
    </>
  )
}

export default HomePage
