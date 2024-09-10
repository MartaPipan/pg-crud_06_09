DROP TABLE IF EXISTS things;
CREATE TABLE IF NOT EXISTS things(
    id serial PRIMARY KEY,
    title varchar(256) NOT NULL CHECK(title != ''),
    "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
    "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);
--INSERT INTO things( title) VALUES('new thing 1');
--SELECT* from things;
--UPDATE things SET title='test update' WHERE id=1;RETURNING;
--DELETE FROM things WHERE id=1 RETURNING*;