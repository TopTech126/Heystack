
const HYGRAPH_ENDPOINT = 'https://ap-south-1.cdn.hygraph.com/content/clpog232e6b6z01uj11pdgbd7/master';  // Replace with your endpoint
const fetchOneBlog = async (slug) => {
  const GET_SINGLE_POST_QUERY = `
        query GET_SINGLE_POST($slug: String!) {
          post(where: { slug: $slug }) {
            title
            summary
            id
            createdAt
            coverImage {
              url(transformation: { image: { resize: { height: 768, width: 1366 } } })
            }
            content {
              json
            }
            author {
              id
              linkedIn
              twitter
              name
              photo {
                url
              }
            }
            date
          }
        }
      `;
  try {
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: GET_SINGLE_POST_QUERY,
        variables: {
          slug: slug
        }
      })
    });
    const { data } = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
const fetchPosts = async () => {
  const GET_ALL_POST_QUERY = `
      query GET_ALL_POST {
        postsConnection(orderBy: createdAt_DESC) {
          edges {
            cursor
            node {
              title
              slug
              coverImage {
                url
              }
              summary
              author {
                name
                id
                twitter
                linkedIn
                photo {
                  url
                }
              }
              date
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;



  const GET_TAGS_QUERY = `
        query GET_TAGS {
          categories {
            name
            slug
          }
        }
      `;

  const GET_POST_FOR_TAG_QUERY = `
        query GetCategoryPost($slug: String!) {
          postsConnection(where: { categories_some: { slug: $slug } }) {
            edges {
              cursor
              node {
                author {
                  bio
                  name
                  id
                  photo {
                    url
                  }
                }
                createdAt
                slug
                title
                summary
                coverImage {
                  url
                }
                categories {
                  name
                  slug
                }
                date
              }
            }
          }
        }
      `;
  try {
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: GET_ALL_POST_QUERY
      })
    });
    const { data } = await response.json();

    if (data && data.postsConnection) {
      console.log('Posts:', data.postsConnection.edges);
      return data.postsConnection.edges;
    } else {
      console.error('Failed to fetch posts:', data);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};