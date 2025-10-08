-- DROP TABLE IF EXISTS twitter.user CASCADE;
-- DROP TABLE IF EXISTS twitter.post CASCADE;
-- DROP TABLE IF EXISTS twitter.user_like CASCADE;
-- DROP TABLE IF EXISTS twitter.gender CASCADE;

-- CREATE SCHEMA twitter;

CREATE TABLE IF NOT EXISTS twitter.gender (
  id serial,
  name text,
  CONSTRAINT id_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS twitter.user (
  user_name text,
  name text,
  email text,
  password text,
  birth_date timestamp,
  photo_url text,
  gender integer,
  CONSTRAINT fk_gender
    FOREIGN KEY (gender) 
      REFERENCES twitter.gender(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_name_pk PRIMARY KEY (user_name)
);

CREATE TABLE IF NOT EXISTS twitter.post (
  id serial,
  user_name text,
  content text,
  creation_date timestamp,
  photo_url text,
  parent integer,
  CONSTRAINT fk_user
    FOREIGN KEY (user_name) 
      REFERENCES twitter.user(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_parent
    FOREIGN KEY (parent) 
      REFERENCES twitter.post(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT post_id_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS twitter.user_like (
  user_name text,
  post integer,
  CONSTRAINT fk_user
    FOREIGN KEY (user_name) 
      REFERENCES twitter.user(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_post
    FOREIGN KEY (post)
      REFERENCES twitter.post(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_post_pk PRIMARY KEY (user_name, post)
);

INSERT INTO twitter.gender (name)
VALUES ('female'),
		('male'), 
		('other');