-- =============================================
--  Datos de prueba - La Reina del Huevo
-- =============================================

-- Galpones
INSERT INTO galpon (numero_galpon, numero_aves) VALUES (1, 4200);
INSERT INTO galpon (numero_galpon, numero_aves) VALUES (2, 5100);
INSERT INTO galpon (numero_galpon, numero_aves) VALUES (3, 3800);
INSERT INTO galpon (numero_galpon, numero_aves) VALUES (4, 4600);
INSERT INTO galpon (numero_galpon, numero_aves) VALUES (5, 5140);

-- Aves
INSERT INTO aves (raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
VALUES ('Lohmann', '2023-06-01', '2023-06-15', 'Proveedor local', 4200, 1);

INSERT INTO aves (raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
VALUES ('Hy-Line', '2023-05-10', '2023-05-25', 'Importado', 5100, 2);

INSERT INTO aves (raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
VALUES ('Shaver', '2023-07-20', '2023-08-01', 'Proveedor local', 3800, 3);

-- Huevos
INSERT INTO huevos (fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon)
VALUES (CURRENT_DATE, 58.5, 4, 3612, 1);

INSERT INTO huevos (fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon)
VALUES (CURRENT_DATE, 61.2, 5, 4488, 2);

INSERT INTO huevos (fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon)
VALUES (CURRENT_DATE, 55.8, 3, 2940, 3);

-- Alimentos
INSERT INTO alimentos (marca_alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon)
VALUES ('ProLay Feed Pro', 'Postura', CURRENT_DATE, 420, 1);

INSERT INTO alimentos (marca_alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon)
VALUES ('NutriAve Plus', 'Postura', CURRENT_DATE, 510, 2);

INSERT INTO alimentos (marca_alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon)
VALUES ('ProLay Feed Pro', 'Postura', CURRENT_DATE, 244, 3);

-- Mortalidad
INSERT INTO mortalidad (estado_salud, fecha_muerte, causa_muerte, numero_aves, id_galpon)
VALUES ('Muerta', CURRENT_DATE, 'Calor excesivo', 8, 3);

INSERT INTO mortalidad (estado_salud, fecha_muerte, causa_muerte, numero_aves, id_galpon)
VALUES ('Muerta', CURRENT_DATE, 'Enfermedad respiratoria', 3, 1);

-- Condiciones ambientales
INSERT INTO condiciones_ambientales (fecha, temperatura, humedad, ventilacion, iluminacion, id_galpon)
VALUES (CURRENT_DATE, 24.5, 65.0, 'Buena', '16h', 1);

INSERT INTO condiciones_ambientales (fecha, temperatura, humedad, ventilacion, iluminacion, id_galpon)
VALUES (CURRENT_DATE, 32.4, 78.0, 'Deficiente', '14h', 3);

-- Usuarios (password admin = 123456)
INSERT INTO usuarios (nombre, email, password, rol)
VALUES ('Jorge Avila', 'admin@avicola.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOHi4xGq5fLwHjMATkUMlzUxr87hcPLZy', 'admin');
