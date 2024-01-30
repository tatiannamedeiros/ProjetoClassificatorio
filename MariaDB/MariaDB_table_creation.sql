ALTER TABLE edited_database_1 RENAME TO carros;

ALTER TABLE edited_database_2 RENAME TO mapa_de_marcas;

ALTER TABLE carros ADD COLUMN marca varchar(10);

SELECT *
FROM carros
INNER JOIN mapa_de_marcas
ON carros.c2 = mapa_de_marcas.c1;