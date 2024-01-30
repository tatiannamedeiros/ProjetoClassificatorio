SELECT carros.c1, carros.c3, carros.c4, carros.c5, mapa_de_marcas.c2
FROM carros
INNER JOIN mapa_de_marcas
ON carros.c2 = mapa_de_marcas.c1;

