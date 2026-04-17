-- =====================================================
--  Datos de prueba que se cargan al iniciar el backend
-- =====================================================

-- Galpones
INSERT INTO galpon (numero, numero_aves, raza, estado) VALUES (1, 4200, 'Lohmann',  'activo');
INSERT INTO galpon (numero, numero_aves, raza, estado) VALUES (2, 5100, 'Hy-Line',  'activo');
INSERT INTO galpon (numero, numero_aves, raza, estado) VALUES (3, 3800, 'Shaver',   'alerta');
INSERT INTO galpon (numero, numero_aves, raza, estado) VALUES (4, 4600, 'Lohmann',  'activo');
INSERT INTO galpon (numero, numero_aves, raza, estado) VALUES (5, 5140, 'Hy-Line',  'activo');

-- Aves (lotes)
INSERT INTO aves (raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
VALUES ('Lohmann', '2023-06-01', '2023-06-15', 'Proveedor local', 4200, 1);

INSERT INTO aves (raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
VALUES ('Hy-Line', '2023-05-10', '2023-05-25', 'Importado', 5100, 2);

INSERT INTO aves (raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
VALUES ('Shaver', '2023-07-20', '2023-08-01', 'Proveedor local', 3800, 3);

INSERT INTO aves (raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
VALUES ('Lohmann', '2023-06-01', '2023-06-15', 'Proveedor local', 4600, 4);

INSERT INTO aves (raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
VALUES ('Hy-Line', '2023-05-10', '2023-05-25', 'Importado', 5140, 5);

-- Huevos (producción de hoy)
INSERT INTO huevos (fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon) VALUES (CURDATE(), 58.5, 4, 3612, 1);
INSERT INTO huevos (fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon) VALUES (CURDATE(), 61.2, 5, 4488, 2);
INSERT INTO huevos (fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon) VALUES (CURDATE(), 55.8, 3, 2940, 3);
INSERT INTO huevos (fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon) VALUES (CURDATE(), 60.0, 4, 3910, 4);
INSERT INTO huevos (fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon) VALUES (CURDATE(), 62.3, 5, 4520, 5);

-- Alimentos
INSERT INTO alimentos (marca_alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon) VALUES ('ProLay Feed Pro', 'Postura (18+ semanas)', CURDATE(), 420, 1);
INSERT INTO alimentos (marca_alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon) VALUES ('NutriAve Plus',   'Postura (18+ semanas)', CURDATE(), 510, 2);
INSERT INTO alimentos (marca_alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon) VALUES ('ProLay Feed Pro', 'Postura (18+ semanas)', CURDATE(), 244, 3);
INSERT INTO alimentos (marca_alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon) VALUES ('NutriAve Plus',   'Postura (18+ semanas)', CURDATE(), 460, 4);
INSERT INTO alimentos (marca_alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon) VALUES ('ProLay Feed Pro', 'Postura (18+ semanas)', CURDATE(), 514, 5);

-- Mortalidad
INSERT INTO mortalidad (estado_salud, fecha_muerte, causa_muerte, numero_aves, id_galpon) VALUES ('Muerta', CURDATE(), 'Calor excesivo', 8, 3);
INSERT INTO mortalidad (estado_salud, fecha_muerte, causa_muerte, numero_aves, id_galpon) VALUES ('Muerta', CURDATE(), 'Enfermedad respiratoria', 3, 1);

-- Condiciones ambientales
INSERT INTO condiciones (fecha, temperatura, humedad, ventilacion, iluminacion, id_galpon) VALUES (CURDATE(), 24.5, 65.0, 'Buena',      '16h', 1);
INSERT INTO condiciones (fecha, temperatura, humedad, ventilacion, iluminacion, id_galpon) VALUES (CURDATE(), 23.8, 63.0, 'Buena',      '16h', 2);
INSERT INTO condiciones (fecha, temperatura, humedad, ventilacion, iluminacion, id_galpon) VALUES (CURDATE(), 32.4, 78.0, 'Deficiente', '14h', 3);
INSERT INTO condiciones (fecha, temperatura, humedad, ventilacion, iluminacion, id_galpon) VALUES (CURDATE(), 25.1, 66.0, 'Buena',      '16h', 4);
INSERT INTO condiciones (fecha, temperatura, humedad, ventilacion, iluminacion, id_galpon) VALUES (CURDATE(), 24.9, 64.5, 'Buena',      '16h', 5);

-- Usuario admin (contraseña: 123456 encriptada con BCrypt)
INSERT INTO usuarios (nombre, email, password, rol)
VALUES ('Jorge Avila', 'admin@avicola.com',
        '$2a$10$7EqJtq98hPqEX7fNZaFWoOHi4xGq5fLwHjMATkUMlzUxr87hcPLZy',
        'admin');
