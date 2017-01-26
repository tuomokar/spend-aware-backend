
--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------


CREATE TABLE user (
  username TEXT UNIQUE NOT NULL CHECK(username != ''),
  password TEXT NOT NULL CHECK(password != '')
);

INSERT INTO user (username, password) VALUES ('admin1', 'admin1');

CREATE TABLE item (
  name TEXT NOT NULL CHECK(name != ''),
  creator INTEGER NOT NULL CHECK (creator > 0),
  cost REAL NOT NULL CHECK(cost >= 0),
  date BLOB
);

INSERT INTO item (name, creator, cost) VALUES ('Milk', 1, 5.0);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE user;
DROP TABLE item;
