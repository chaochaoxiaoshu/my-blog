export interface HeroImage {
  childImageSharp: {
    getsbyImageData: {
      width: number
      height: number
      layout: string
      backgroundColor: string
      images: {
        fallback: {
          sizes: string
          src: string
          srcSet: string
        }
        sources: Array<{
          sizes: string
          srcSet: string
          type: string
        }>
      }
    }
  }
}
