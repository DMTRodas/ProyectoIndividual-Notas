CREATE DATABASE IF NOT EXISTS escuela_db;

USE escuela_db;

CREATE TABLE notas_estudiantes(

id_estudiante BIGINT AUTO_INCREMENT PRIMARY KEY,
nombre_estudiante VARCHAR(255) NOT NULL,
apellido_estudiante VARCHAR (255) NOT NULL,
actividades INT,
primer_parcial INT,
segundo_parcial INT,
examen_final INT,
nota_final INT
);

SELECT * FROM notas_estudiantes;

-- Dump completed on 2024-10-02 18:00:20
