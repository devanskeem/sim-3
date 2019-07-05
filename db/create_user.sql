insert into users (username, password, imgurl)
values (${username}, ${password}, ${imgurl})
returning user_id, username, imgurl