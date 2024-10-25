'use client'

import { DefaultSeo } from 'next-seo'

export const DefaultSeoConfig: React.FC = () => {
  return (
    <DefaultSeo
      openGraph={{
        type: 'website',
        locale: 'pt_BR',
        url: 'https://www.call.one.com.br/',
        siteName: 'Call One',
      }}
    />
  )
}
