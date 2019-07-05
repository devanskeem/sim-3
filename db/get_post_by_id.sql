SELECT 
    post_id
    author_id,
    title,
    content,
    post_imgurl,
    imgurl,
    username,
FROM posts
join users on posts.author_id = users.user_id
where post_id = ${post_id}