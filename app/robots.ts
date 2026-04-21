import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sitemap.xml'],
      disallow: ['/.next/', '/api/'],
    },
    sitemap: 'https://black-horse.online/sitemap.xml',
  }
}
