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
    const url = window.location.href;
    const urlObj = new URL(url);
    const blogOne = $("#blog-one");
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
            // html = html + "<div>" + render(element.children) + "</div>";
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
                return "<h1>";
            case "heading-two":
                return "<h2>";
            case "heading-three":
                return "<h3>";
            case "heading-four":
                return "<h4>";
            case "heading-five":
                return "<h5>";
            case "heading-six":
                return "<h6>";
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
                return `<iframe src=${e.url} frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style="width: 500px; height: 300px;">`;
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
        console.log(blog);
        if (blog) {
            blogHTML = `
                <div class="brand-m"
                    style="min-width: 300px; background: linear-gradient(45deg, #4f31df, #00c6ff);padding-top: 1.75rem; padding-bottom: 1.75rem;padding-left: 1.25rem;padding-right: 1.25rem;border-radius: .75rem; color: white;">
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
                        width="100%" style="border-radius: 0.75rem; object-fit: cover; height:30rem ">
                </div>
                `;
            blogHTML = blogHTML + `
                <div style="z-index: 20; position: sticky; top: 0;margin-top: 6rem; display:  flex; flex-direction: column; gap:8px"
                    class="progress-dynamic-bar">
                    <div style="background: linear-gradient(90deg, #4f31df, #00c6ff);height:0.7rem; width: 0px; "
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
            blogHTML = blogHTML + html
            blogOne.html(blogHTML);
            console.log(html);

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