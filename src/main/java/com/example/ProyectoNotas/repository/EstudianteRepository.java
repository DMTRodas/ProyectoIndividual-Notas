package com.example.ProyectoNotas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ProyectoNotas.model.Estudiante;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    List<Estudiante> findByNombreContainingIgnoreCase(String nombre);
}


/*package com.example.ProyectoNotas.repository;

import java.util.List; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ProyectoNotas.model.Estudiante;

@Repository

public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    List<Estudiante> findByNombreContainingIgnoreCase(String nombre);
}*/
