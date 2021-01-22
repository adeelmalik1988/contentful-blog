import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'



const BlogPostContentfulTemplate = ({ data, location }) => {
  const post = data.contentfulBlogPost

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  let contentJSON = JSON.parse(post.content.raw)
  //console.log(post.image.id)



  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
        description={post.subtitle}
      />
      {post.image && (
        <Img fluid={post.image.fluid} ></Img>)
      }
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.publicationDate}</p>
        </header>
        {/* <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      */


        }

        {

          documentToReactComponents(contentJSON)
        }

        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug(
    $slug: String!
    $previousPostId: String
    $nextPostId: String ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost ( slug: { eq: $slug } ) {
      title
      subtitle
      author
      publicationDate
      content {
        raw
      }
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
        
      }
    }

    previous: contentfulBlogPost(id: {eq: $previousPostId}){
      slug
      title
    }

    next: contentfulBlogPost(id: {eq: $nextPostId}){
      slug
      title
    }
    
   
  }
`
