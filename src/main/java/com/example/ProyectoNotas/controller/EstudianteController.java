package com.example.ProyectoNotas.controller;

import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.ProyectoNotas.exception.ResourceNotFoundException;
import com.example.ProyectoNotas.model.Estudiante;
import com.example.ProyectoNotas.repository.EstudianteRepository;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    // Obtener todos los estudiantes
    @GetMapping
    public List<Estudiante> getAllEstudiantes() {
        return estudianteRepository.findAll();
    }

    // Crear nuevo estudiante
    @PostMapping
    public Estudiante createEstudiante(@RequestBody Estudiante nuevoEstudiante) {
        return estudianteRepository.save(nuevoEstudiante);
    }

   // Método para actualizar un estudiante por ID
   @PutMapping("/{id}")
   public ResponseEntity<Estudiante> actualizarEstudiante(@PathVariable Long id, @RequestBody Estudiante estudianteDetalles) {
       Optional<Estudiante> estudiante = estudianteRepository.findById(id);
       if (estudiante.isPresent()) {
           Estudiante estudianteExistente = estudiante.get();
           estudianteExistente.setNombre(estudianteDetalles.getNombre());
           estudianteExistente.setApellido(estudianteDetalles.getApellido());
           estudianteExistente.setActividades(estudianteDetalles.getActividades());
           estudianteExistente.setPrimerParcial(estudianteDetalles.getPrimerParcial());
           estudianteExistente.setSegundoParcial(estudianteDetalles.getSegundoParcial());
           estudianteExistente.setExamenFinal(estudianteDetalles.getExamenFinal());
           estudianteExistente.actualizarNotaFinal(); // Aquí ya puedes llamar al método
           Estudiante estudianteActualizado = estudianteRepository.save(estudianteExistente);
           return ResponseEntity.ok(estudianteActualizado);
       } else {
           return ResponseEntity.notFound().build();
       }
   }


    // Eliminar estudiante
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEstudiante(@PathVariable Long id) {
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado con id: " + id));

        estudianteRepository.delete(estudiante);
        return ResponseEntity.ok().build();
    }

    // Buscar estudiantes por ID
    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> obtenerEstudiantePorId(@PathVariable Long id) {
    Optional<Estudiante> estudiante = estudianteRepository.findById(id);
    if (estudiante.isPresent()) {
        return ResponseEntity.ok(estudiante.get());
    } else {
        return ResponseEntity.notFound().build();
    }
}

}

