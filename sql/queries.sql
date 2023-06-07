-- CREATE USER
------------------------------------------------------------------------------------------
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'LbhFQjEs9dMs3K5mpm6rxtEEJEJsF4';
CREATE USER 'readonly'@'localhost' IDENTIFIED BY 'MBdE8PdFKMGArRcgdzPfy4azkcDQj5';

-- GRANT PRIVILEGES
------------------------------------------------------------------------------------------
GRANT ALL PRIVILEGES ON RLDfbdrB5G3xXFxe8HzeiS69BKxbjR.* TO 'admin'@'localhost';
GRANT SELECT ON RLDfbdrB5G3xXFxe8HzeiS69BKxbjR.* TO 'readonly'@'localhost';

-- CREATE VIEWS
------------------------------------------------------------------------------------------
CREATE VIEW users_chats AS
SELECT c.user_id AS user_id, m.content, p.name AS persona_name
FROM message m
JOIN conversation c ON m.conversation_id = c.id
JOIN persona p ON c.persona_id = p.id
WHERE m.isHuman = true;

CREATE VIEW users_conversations AS
SELECT u.id, u.email, p.name AS persona_name
FROM user u
JOIN conversation c ON u.id = c.user_id
JOIN persona p ON c.persona_id = p.id;

-- SELECT QUERIES (JOIN / GROUP BY / HAVING)
------------------------------------------------------------------------------------------
SELECT c.user_id AS user_id, m.content, p.name AS persona_name
FROM message m
JOIN conversation c ON m.conversation_id = c.id
JOIN persona p ON c.persona_id = p.id;

SELECT p.name AS persona_name, COUNT(*) AS message_count
FROM persona p
JOIN conversation c ON p.id = c.persona_id
JOIN message m ON c.id = m.conversation_id
GROUP BY p.name
ORDER BY message_count DESC;

SELECT p.name AS persona_name, COUNT(*) AS message_count
FROM persona p
JOIN conversation c ON p.id = c.persona_id
JOIN message m ON c.id = m.conversation_id
GROUP BY p.name
HAVING COUNT(*) < 10
ORDER BY message_count DESC;

-- CORRELATED SUBQUERY
------------------------------------------------------------------------------------------
SELECT c.id AS conversation_id, (SELECT COUNT(*) FROM message WHERE conversation_id = c.id) AS message_count
FROM conversation c
JOIN message m ON m.conversation_id = c.id
GROUP BY c.id;

SELECT c.id AS conversation_id, m.content AS human_message
FROM conversation c
JOIN (SELECT * FROM message WHERE isHuman = 1) m ON m.conversation_id = c.id;

-- SELECT QUERIES (CASE / IF)
------------------------------------------------------------------------------------------
SELECT id, content, IF(isHuman = 1, 'Human', 'Bot') AS sender
FROM message;

SELECT id, content, CASE WHEN isHuman = 1 THEN 'Human' ELSE 'Bot' END AS sender
FROM message;