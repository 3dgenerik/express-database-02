## GENERAL COMMANDS:

### connect to database
\c <my_database>

### close db live
\q

### list all tables
\dt

### list all users
\du

### ADMIN USER
psql -U postgres

### list all users
SELECT rolname FROM pg_roles;

### PONOVO STARTOVATI SERVER
pg_ctl start -D "C:\Program Files\PostgreSQL\16\data"

### LOGOVATI SE KAO NOVI USER I KONEKTOVATI SE SA BAZOM
psql -U novi_user -d database_name


### NOVI USERNAME AND PASSWORD
CREATE USER full_stack_user WITH PASSWORD 'password123';
CREATE DATABASE full_stack_dev;
\c full_stack_dev
GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;

CREATE USER test_user WITH PASSWORD 'shaban333';
CREATE DATABASE test_dev;
\c test_dev
GRANT USAGE ON SCHEMA public TO test_user;
GRANT ALL ON SCHEMA public TO test_user;
GRANT CREATE ON SCHEMA public TO test_user;
psql -U test_user -d test_dev
// sada radi CREATE TABLE (proverio sam, radi 100%) (testiraj u pgAdmin)


## WORKING WITH TABLES IN DATABASE:

### create database
CREATE DATABASE my_database;

### create table
CREATE TABLE plants (id SERIAL PRIMARY KEY, name VARCHAR(100), description TEXT, individuals INTEGER, sighting_date DATE);
CREATE TABLE plants (id SERIAL PRIMARY KEY, region_id REFERENCES regions(id), user_id REFERENCES users(id), salary REAL CHECK(salary > 0));

### izbrisati tabelu 
DROP TABLE table_name

### promeniti naziv kolone
ALTER TABLE plants RENAME COLUMN dexcription TO description;


### dodati kolonu
ALTER TABLE my_table ADD COLUMN new_column integer;

## CRUD:

### CREATE
INSERT INTO plants (name, description, individuals, sighting_date) VALUES ('Dandelion', 'Fuzzy yellow flowers', 5, '2021-01-01')

### READ ALL
SELECT * FROM table_name;
SELECT name FROM table_name;
SELECT name, description FROM table_name;
SELECT * FROM table_name WHERE name = 'name';
SELECT * FROM table_name WHERE id > 3;
SELECT * FROM table_name WHERE name LIKE '%A%;

### UPDATE
UPDATE table_name SET individuals = 8 WHERE id = 1;
UPDATE table_name SET individuals = 8 WHERE name LIKE '%Q%';

### DELETE
DELETE FROM table_name WHERE id=1;
DELETE FROM table_name WHERE name LIKE '%Q%';

### WHERE (filter)

### LIMITS
SELECT * FROM plants LIMIT 5;

### BETWEEN
SELECT * FROM plants WHERE sighting_date BETWEEN '2021-01-01' AND '2021-01-12';

### LIKE
SELECT name, description FROM plants WHERE name LIKE '%lion%';

### IS NULL or IS NOT NULL
SELECT * FROM plants WHERE sighting_date IS NULL;
SELECT name, description FROM plants WHERE individuals IS NOT NULL;

### FOREIGN KEY (povezati foreign key jedne tabele sa primary key druge tabele)
ALTER TABLE plants ADD FOREIGN KEY (region_id) REFERENCES regions(id);

### COUNT(*)
SELECT COUNT(*) FROM plants WHERE sighting BETWEEN '2021-01-01' AND '2024-01-01';
SELECT count(*) FROM plants;
// print 3




# MIGRATE

### install modules
npm i global db-migrate
npm i db-migrate db-migrate-pg
#### create database.json
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds",
    "user": "magical_user",
    "password": "password123"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds_test",
    "user": "magical_user",
    "password": "password123"
  }
}
#### create migration
db-migrate create mythical-worlds-table --sql-file


#### pre ovoga je vazno da svaki user ima ALL PRIVILAGES. To mozes uraditi u pgAdmin (desni klik na public SCHEME od DATABASE)
db-migrate up OR db-migrate-DOWN


CREATE TABLE mythical_weapons (id SERIAL PRIMARY KEY, name VARCHAR(100), type VARCHAR(100), weight INTEGER);
CREATE TABLE books (id SERIAL PRIMARY KEY, title VARCHAR(100), author VARCHAR(100), total_pages INTEGER, summary TEXT);

# ADDITIONAL

### CLEAR DATABASAE AFTER TESTS
db-migrate db:drop test

Primer:
{
    "test": "set ENV=test&& db-migrate --env test up && npm run build && npm run jasmine && db-migrate db:drop test"

}

OBJASNJENJE:
ENV=test - promeni environment in runtime (from dev to test)
db-migrate --env test up - tell db-migrate witch database to use. Following peace of code
from database.json see db-migrate
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds_test",
    "user": "magical_user",
    "password": "password123"
  }

### KILL DATABASE SESSIONS
SELECT pg_terminate_backend (pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'test_dev';






