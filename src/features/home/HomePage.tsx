import { EditorialByline } from '@/components/seo/EditorialByline'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Desktop } from './components/Desktop'
import { Features } from './components/Features'
import { Install } from './components/Install'
import { Banner } from './components/Banner'
import { Invite } from './components/Invite'
import { MobileCta } from './components/MobileCta'

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
          <div className="mx-auto max-w-6xl px-6 py-8">
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
