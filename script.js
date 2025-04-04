fetch("blogs/posts.json")
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById("posts");
    posts.forEach(post => {
      const el = document.createElement("article");
      el.innerHTML = `
        <h3>${post.title}</h3>
        <p><em>${post.date}</em></p>
        <p>${post.excerpt}</p>
        <a href="post.html?slug=${post.slug}">Read more</a>
      `;
      container.appendChild(el);
    });
  });