window.onload = function () {
    loadBlogs();
};

function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';

    blogs.forEach((blog, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="showBlogContent(${index})">${blog.title}</a> 
                        <span class="viewCount">Views: ${blog.viewCount || 0}</span>
                        <button onclick="deleteBlog(${index})">Delete</button>
                        <button onclick="showUpdateForm(${index})">Update</button>`;
        blogList.appendChild(li);
    });
}

function showBlogContent(index) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs[index];
    document.getElementById('blogTitle').innerText = blog.title;
    document.getElementById('blogContent').innerText = blog.content;

    blog.viewCount = (blog.viewCount || 0) + 1;
    blogs[index] = blog;
    localStorage.setItem('blogs', JSON.stringify(blogs));

    loadBlogs();
}

function showCreateForm() {
    document.getElementById('createForm').style.display = 'block';
}

function createBlog() {
    const newTitle = document.getElementById('newTitle').value;
    const newContent = document.getElementById('newContent').value;

    if (newTitle && newContent) {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const newBlog = {
            title: newTitle,
            content: newContent,
            viewCount: 0
        };
        blogs.push(newBlog);
        localStorage.setItem('blogs', JSON.stringify(blogs));

        loadBlogs();
        document.getElementById('createForm').style.display = 'none';
    }
}

function showUpdateForm(index) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs[index];

    document.getElementById('updateForm').style.display = 'block';
    document.getElementById('updateTitle').value = blog.title;
    document.getElementById('updateContent').value = blog.content;
    document.getElementById('updateForm').setAttribute('data-index', index);
}

function updateBlog() {
    const index = document.getElementById('updateForm').getAttribute('data-index');
    const updateTitle = document.getElementById('updateTitle').value;
    const updateContent = document.getElementById('updateContent').value;

    if (updateTitle && updateContent) {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs[index] = {
            title: updateTitle,
            content: updateContent,
            viewCount: blogs[index].viewCount || 0
        };
        localStorage.setItem('blogs', JSON.stringify(blogs));

        document.getElementById('blogTitle').innerText = updateTitle;
        document.getElementById('blogContent').innerText = updateContent;

        loadBlogs();
        document.getElementById('updateForm').style.display = 'none';
    }
}

function deleteBlog(index) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(blogs));

    loadBlogs();
}
