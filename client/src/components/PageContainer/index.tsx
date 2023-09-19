import SEO, { SEOProps } from '../SEO'

type ContainerProps = {
  children: React.ReactNode
  seoProps?: SEOProps
}
const PageContainer = ({ children, seoProps }: ContainerProps) => {
  return (
    <>
      {seoProps && <SEO {...seoProps} />}
      <main className="wrapper py-5">{children}</main>
    </>
  )
}
export default PageContainer
