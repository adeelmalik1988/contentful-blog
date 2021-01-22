import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"



const Post = styled.div`
display: flex;
`

const PostImage = styled.div`
flex: 25%;
margin-right: 1rem;
`

const PostText = styled.div`
flex: 75%;
`



const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulBlogPost.edges
  console.log(posts)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.node.title || post.node.slug

          return (
            <Post key={post.node.slug}>
              <PostImage>

                {post.node.image && (
                  <Img fluid={post.node.image.fluid} />)

                }
              </PostImage>

              <PostText>

              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.node.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.node.publicationDate}</small>
                </header>
                <section>
                  <p
                    itemProp="description">
                    {post.node.subtitle}
                  </p>
                </section>
              </article>
              </PostText>
            </Post>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost{
      edges{
        node{
          title
          subtitle
          author
          slug
          publicationDate
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
