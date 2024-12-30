const TagListMap = {
    "paragraph": "p",
    "block-quote": "blockquote",
    "heading-one": "h1",
    "heading-two": "h2",
    "heading-three": "h3",
    "heading-four": "h4",
    "link": "a",
    "image": "img",
    "bulleted-list": "ul"
}

const Slug = function () {
    const HeadingList = [];
    const url = window.location.href;
    const urlObj = new URL(url);
    const blogOne = $("#blog-one");
    const rightBar = $("#right-bar");
    let blogHTML = "";
    let html = "";
    const slug = urlObj.searchParams.get("id");
    const scrollAction = () => {
        const scrollbar = document.getElementsByClassName('scrollbar')[0];
        const parent = document.getElementsByClassName("progress-dynamic-bar")[0];
        window.onscroll = function (e) {
            scrollbar.style.width = parseInt(parent.clientWidth) * parseInt(this.pageYOffset) / parseInt(document.documentElement.scrollHeight - window.innerHeight) +
                "px";
        }
    }
    const render = (element) => {
        if (element.type) {
            html = html + TagGenerator(element);
        }
        if (element.children) {
            element.children.forEach(e => {
                render(e);
            })
        }
        else {
            let text = element.text;
            if (element.bold) {
                text = `<b>${text}</b>`
            }
            if (element.underline) {
                text = `<u>${text}</u>`
            }
            html = html + text;
        };
        if (element.type) {
            html = html + EndTage(element);
        }

    }
    const TagGenerator = (e) => {
        console.log(e.type)
        switch (e.type) {
            case "paragraph":
                return "<p>"
            case "heading-one":
                HeadingList.push({ title: e.children[0].text, id: e.children[0].text.replace(/ /g, "-") });
                return `<h1 id=${e.children[0].text.replace(/ /g, "-")}>`;
            case "heading-two":
                HeadingList.push({ title: e.children[0].text, id: e.children[0].text.replace(/ /g, "-") })
                return `<h2 id=${e.children[0].text.replace(/ /g, "-")}>`;
            case "heading-three":
                HeadingList.push({ title: e.children[0].text, id: e.children[0].text.replace(/ /g, "-") })
                return `<h3 id=${e.children[0].text.replace(/ /g, "-")}>`;
            case "heading-four":
                HeadingList.push({ title: e.children[0].text, id: e.children[0].text.replace(/ /g, "-") })
                return `<h4 id=${e.children[0].text.replace(/ /g, "-")}>`;
            case "heading-five":
                HeadingList.push({ title: e.children[0].text, id: e.children[0].text.replace(/ /g, "-") })
                return `<h5 id=${e.children[0].text.replace(/ /g, "-")}>`;
            case "heading-six":
                HeadingList.push({ title: e.children[0].text, id: e.children[0].text.replace(/ /g, "-") })
                return `<h6 id=${e.children[0].text.replace(/ /g, "-")}>`;
            case "image":
                return `<img src=${e.src} style="border-radius: .75rem;margin-top: 2em;margin-bottom: 1.7777778em;" width="100%">`;
            case "block-quote":
                return "<blockquote>";
            case "numbered-list":
                return "<ol>";
            case "bulleted-list":
                return "<ul>";
            case "list-item":
                return "<li>";
            case "list-item-child":
                return "";
            case "link":
                return `<a href=${e.href} target=${e.openInNewTab ? "_blank" : ""}>`;
            case "iframe":
                return `<iframe src=${e.url} frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style="width:"100%", height: 300px;">`;
            case "code-block":
                return "<pre><code>";
            case "video":
                return `<video src=${e.src} title=${e.title} width="100%" controls>`;
            case "table":
                return "<table>"
            case "table_head":
                return "<thead>"
            case "table_row":
                return "<tr>";
            case "table_header_cell":
                return "<th>";
            case "table_cell":
                return "<td>"
            case "table_body":
                return "<tbody>"
            default:
                break;
        }
    }
    const EndTage = (e) => {
        switch (e.type) {
            case "paragraph":
                return "</p>"
            case "heading-one":
                return "</h1>";
            case "heading-two":
                return "</h2>";
            case "heading-three":
                return "</h3>";
            case "heading-four":
                return "</h4>";
            case "heading-five":
                return "</h5>";
            case "heading-six":
                return "</h6>";
            case "image":
                return `</img>`;
            case "block-quote":
                return "</blockquote>";
            case "numbered-list":
                return "</ol>";
            case "bulleted-list":
                return "</ul>";
            case "list-item":
                return "</li>";
            case "list-item-child":
                return "";
            case "link":
                return "</a>";
            case "iframe":
                return "</iframe>";
            case "code-block":
                return "</code></pre>";
            case "video":
                return `</video>`
            case "table":
                return "</table>"
            case "table_head":
                return "</thead>"
            case "table_row":
                return "</tr>";
            case "table_header_cell":
                return "</th>";
            case "table_cell":
                return "</td>";
            case "table_body":
                return "</tbody>"
            default:
                break;
        }
    }
    const handleSlug = async () => {
        const blog = await fetchOneBlog(slug);
        let posts = [];
        let categoriesHTML = "";
        posts = await fetchPosts();
        console.log(blog);
        if (blog) {
            blogHTML = `
                <div class="brand-m"
                    style="min-width: 250px; background: linear-gradient(45deg, #4f31df, #00c6ff);padding-top: 1.75rem; padding-bottom: 1.75rem;padding-left: 1.25rem;padding-right: 1.25rem;border-radius: .75rem; color: white;">
                    <div style="display:flex; flex-direction: row; align-items: center;">
                        <button
                            style="border-width: 1px;border-radius: .5rem;cursor: pointer;margin-right: .5rem;background-color: transparent;background-image: none;border-color: rgb(255 255 255); border-style:solid; color:white; padding:4px 16px; font-size:16px">${blog.post.author.name}</button>
                        <div>
                            ${blog.post.date}
                        </div>
                    </div>
                    <h1
                        style="font-size: 1.5rem; font-weight: 700;adding-top: 1.25rem; padding-bottom: 1.25rem;padding-left: .5rem;padding-right: .5rem;line-height: 2rem; color:white">
                         ${blog.post.title}</h1>
                    <img src=${blog.post.coverImage.url}
                        width="100%" style="border-radius: 0.75rem; object-fit: cover; height:27rem ">
                </div>
                `;
            blogHTML = blogHTML + `
                <div style="z-index: 2; position: sticky; top: 5px;margin-top: 6rem; display:  flex; flex-direction: column; gap:8px;"
                    class="progress-dynamic-bar">
                    <div style="background: linear-gradient(90deg, #4f31df, #00c6ff);height:0.7rem; width: 0px; z-index:10!important; border-radius:5px"
                        class="scrollbar">

                    </div>
                    <div
                        style="background: linear-gradient(90deg, #4f31df, #00c6ff); border-radius: .375rem; color: white; padding: 0.5rem; text-align: center;font-weight: 600;">
                        ${blog.post.title}
                    </div>
                </div>
                <h1>${blog.post.summary}</h1>
                `

            blog.post.content.json.children.forEach(element => {
                render(element);
            });
            blogHTML = blogHTML + html;
            blogOne.html(blogHTML);
            let rightBarHTML = `
            <div
          style="margin-top: 5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1); border-radius: .5rem; padding: 16px;">
          <div style="display: flex; flex-direction: column; gap: 12px">
            <div style="display: flex; flex-direction: row; gap: 8px; align-items: center;">
              <img src=${blog.post.author.photo.url} height="80px" width="80px"
                style="border-radius: 100%;">
              <div style="font-size: 1.125rem;line-height: 1.75rem;font-weight: 600; color: black;">
                ${blog.post.author.name}
              </div>
            </div>
            <div style="color: rgb(103 103 103); font-size: .875rem;line-height: 1.25rem;">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem ut deleniti fuga sit ad nemo?
            </div>
            <div>
              <a href=${blog.post.author.linkedIn}><svg class="" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill="black"
                    d="M21.372 1H2.623C1.726 1 1 1.709 1 2.586V21.41c0 .877.726 1.59 1.624 1.59h18.747C22.27 23 23 22.287 23 21.415V2.585C23 1.71 22.27 1 21.372 1ZM7.527 19.747H4.26V9.246h3.266v10.501ZM5.894 7.815a1.892 1.892 0 1 1-.007-3.783 1.892 1.892 0 0 1 .007 3.783Zm13.853 11.932h-3.261v-5.104c0-1.216-.021-2.785-1.697-2.785-1.698 0-1.955 1.328-1.955 2.699v5.19H9.577V9.246h3.128v1.435h.043c.434-.825 1.5-1.697 3.085-1.697 3.304 0 3.914 2.174 3.914 5.001v5.762Z">
                  </path>
                </svg></a>
            </div>
          </div>
        </div>`;
        rightBarHTML = rightBarHTML + `
                    <div style="position: sticky; top: 40px;margin-top: 80vh; min-width: 250px" id="table-content">
          <div
            style="margin-top: 5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1); border-radius: .5rem; padding: 16px;">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="color: black;font-weight: 600;font-size: 1.25em;line-height: 1.6;">
                Table of Content
              </div>
              <div style="">
                <ol style="list-style: none;margin: 0;padding: 0;list-style-type: decimal;padding-left: 1rem;">
                  ${
                    HeadingList.map((e) => {
                    return `<li style="list-style-type: disc;padding-left: .375em;"><a
                      style="text-decoration-line: none;font-weight: 500; color:#111827"
                      href=#${e.id}>${e.title}</a></li>`;
                    }).join("")
                }
                </ol>
              </div>
            </div>
          </div>
          <div
            style="margin-top: 5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1); border-radius: .5rem; padding: 16px;">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="font-size: 1.125rem;line-height: 1.75rem;font-weight: 700; color: black;">
                Hye-stack2
              </div>
              <div style="font-size: .875rem;line-height: 1.25rem;">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, dicta?
              </div>
              <div>
                <div class="input-pink-in-button">
                  <input type="text" placeholder="Email Address" name="" />
                  <button>FOLLOW</button>
                </div>
                <div style="
                color: rgb(55 65 81);
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                font-size: 11px;
              ">
                  By signing up you agree to our
                  <a style="
                  color: rgb(102 0 145);
                  font-weight: 600;
                  cursor: pointer;
                  font-size: 11px;
                  text-decoration: none;
                " href="https://hey-stack.com/terms-conditions" target="_blank">Terms of Use</a>
                  and
                  <a href="https://hey-stack.com/privacy-policy" style="
                  color: rgb(102 0 145);
                  font-weight: 600;
                  cursor: pointer;
                  font-size: 11px;
                  text-decoration: none;
                " target="_blank">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
        rightBar.html(rightBarHTML);
                posts.forEach(post => {
            if(post.node.slug !== slug)
                categoriesHTML = categoriesHTML + `<div
                style="display: flex; flex-direction: column; gap: 20px; cursor: pointer; width: 30%; min-width: 250px;">
                <div
                    style="display: flex;flex-direction: column; gap:2rem; flex-wrap: wrap; justify-content: space-between;">
                    <div style="border-radius: .375rem;overflow: hidden;">
                        <a href="./slug.html?id=${post.node.slug}">
                            <img src=${post.node.coverImage.url}
                                style="transition-duration: .5s; object-fit: cover; width:100%; height:12rem"
                                alt="featuredImage" onmouseover="this.style.transform='scale(1.2)'"
                                onmouseout="this.style.transform='scale(1)'">
                        </a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap:30px; height: 25vh; ">
                        <div style="font-size: 20px; line-height: 1.75rem;  font-weight: 600;">
                            <a href="./slug.html?id=${post.node.slug}" style="text-decoration:none; color:black">
                                ${post.node.title}
                            </a>
                        </div>
                        <div style=" color: rgb(103 103 103);font-size: .875rem; line-height: 1.25rem;">
                        ${post.node.summary}
                        </div>
                    </div>
                    <div style="display: flex; flex-direction:column; gap: 20px;">
                        <div style=" display: flex; flex-direction: row; justify-content: space-between;">
                            <div
                                style="display: flex; flex: 1 1 0%; flex-direction:row; align-items: center; border-radius: 999px; gap: 10px;">
                                <div>
                                    <img src=${post.node.author.photo.url} width="40px"
                                        height="40px" alt="author" style="border-radius: 999px;">
                                </div>
                                <div style="font-weight: 600px; font-size: 16px">
                                    ${post.node.author.name}
                                </div>
                            </div>
                            <div
                                style="display:flex;flex: 1 1 0%;align-items: center; flex-direction: row; justify-content: end;">
                                ${post.node.date}
                            </div>
                        </div>
                        <div>
                            <a class="my-4 px-4 py-1"
                                style="background-color:rgb(241 245 249); border-radius: 100px; color: black; text-decoration: none;"
                                href="/tag/${post.node.categories[0].slug}">${post.node.categories[0].name}</a>
                        </div>
                    </div>
                </div>
            </div>`;
            });
        $("#post-categories").html(categoriesHTML);

            console.log(HeadingList);
            scrollAction();
        }
    }
    return {
        init: function () {
            handleSlug();
        }
    }
}()
$(document).ready(function () {
    Slug.init();
})