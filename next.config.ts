import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // Payload CMS will be configured via withPayload
}

export default withPayload(nextConfig)
