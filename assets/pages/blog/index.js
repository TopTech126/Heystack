const Blog = function () {
    let posts = [];
    const latest_post = $("#latest-post");
    const post_categories = $("#post-categories");
    const handleBlog = async () => {
        posts = await fetchPosts();
        if (posts) {
            const latestOne = posts[0];
            const latestHTML = `<div style=" flex: 1 1 0%; ;border-radius: .375rem;overflow: hidden;min-width: 400px;cursor: pointer;">
                    <a href="./slug.html?id=${latestOne.node.slug}">
                        <img src=${latestOne.node.coverImage.url}
                            style="transition-duration: .5s; object-fit: cover; width:100%; height:20rem"
                            alt="featuredImage" onmouseover="this.style.transform='scale(1.2)'"
                            onmouseout="this.style.transform='scale(1)'">
                    </a>
                </div>
                <div
                    style="flex: 1 1 0%; display: flex; flex-direction: column; gap:30px; justify-content: center;min-width: 400px">
                    <div style="font-size: 1.875rem; line-height: 2.25rem; font-weight: 600;">
                        <a href="./slug.html?id=${latestOne.node.slug}" style="text-decoration:none;color:black">${latestOne.node.title}</a>
                    </div>
                    <div style=" color: rgb(103 103 103);font-size: .875rem; line-height: 1.25rem;">
                       ${latestOne.node.summary}
                    </div>
                    <div style=" display: flex; flex-direction: row; justify-content: space-between;">
                        <div
                            style="display: flex; flex: 1 1 0%; flex-direction:row; align-items: center; border-radius: 999px; gap: 10px;">
                            <div>
                                <img src=${latestOne.node.author.photo.url} width="40px" height="40px"
                                    alt="author" style="border-radius: 999px;">
                            </div>
                            <div style="font-weight: 600px; font-size: 16px">
                                ${latestOne.node.author.name}
                            </div>
                        </div>
                        <div
                            style="display:flex;flex: 1 1 0%;align-items: center; flex-direction: row; justify-content: end;">
                            ${latestOne.node.date}
                        </div>
                        <div>
                        </div>
                    </div>
                </div>`;
            latest_post.html(latestHTML);
            categoriesHTML = "";
            posts.forEach(post => {
                categoriesHTML = categoriesHTML + `<div
                style="display: flex; flex-direction: column; gap: 20px; cursor: pointer; width: 30%; min-width: 350px;">
                <div
                    style="display: flex;flex-direction: column; gap:2rem; flex-wrap: wrap; justify-content: space-between;">
                    <div style="border-radius: .375rem;overflow: hidden;">
                        <a href="./slug.html?id=${post.node.slug}">
                            <img src=${post.node.coverImage.url}
                                style="transition-duration: .5s; object-fit: cover; width:100%; height:20vh"
                                alt="featuredImage" onmouseover="this.style.transform='scale(1.2)'"
                                onmouseout="this.style.transform='scale(1)'">
                        </a>
                    </div>
                    <div style="display: flex; flex-direction: column; gap:30px; height: 25vh; ">
                        <div style="font-size: 1.875rem; line-height: 2.25rem;  font-weight: 600;">
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
            post_categories.html(categoriesHTML);
        }


    }
    return {
        init: function () {
            handleBlog();
        }
    };
}();
$(document).ready(function () {
    Blog.init();
})