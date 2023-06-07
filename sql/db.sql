-- CREATE TABLES
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  oa_token VARCHAR(255) NOT NULL
);

CREATE TABLE universe (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE persona (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  universe_id INT NOT NULL,
  FOREIGN KEY (universe_id) REFERENCES universe(id),
  description VARCHAR(255)
);

CREATE TABLE conversation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  persona_id INT NOT NULL,
  FOREIGN KEY (persona_id) REFERENCES persona(id),
  UNIQUE (user_id, persona_id)
);

CREATE TABLE message (
  id INT AUTO_INCREMENT PRIMARY KEY,
  isHuman BOOLEAN NOT NULL,
  content VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  conversation_id INT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversation(id)
);