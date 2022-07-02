-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS github_users;

CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  avatar TEXT
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post TEXT
);

INSERT INTO github_users (username, email, avatar) VALUES ('test user', 'email@test.com', '');

INSERT INTO posts (post) VALUES ('test');