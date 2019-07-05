-- SELECT 
--     post_id
--     author_id,
--     title,
--     content,
--     post_imgurl,
--     imgurl,
--     username
-- FROM posts
-- join users on posts.author_id = users.user_id
SELECT 
  *
FROM posts
join users on posts.author_id = users.user_id
