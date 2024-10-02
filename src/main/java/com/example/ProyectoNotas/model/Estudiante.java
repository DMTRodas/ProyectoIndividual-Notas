package com.example.ProyectoNotas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notas_estudiantes")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estudiante")
    private Long id;

    @Column(name = "nombre_estudiante")
    private String nombre;

    @Column(name = "apellido_estudiante")
    private String apellido;

    private int actividades;
    private int primerParcial;
    private int segundoParcial;
    private int examenFinal;

    @Column(name = "nota_final")
    private double notaFinal;  // Cambiado a double para evitar pérdida de precisión

    // Máximos permitidos para cada parámetro
    private static final int MAX_ACTIVIDADES = 35;
    private static final int MAX_PRIMER_PARCIAL = 15;
    private static final int MAX_SEGUNDO_PARCIAL = 15;
    private static final int MAX_EXAMEN_FINAL = 35;

    // Getters
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public int getActividades() {
        return actividades;
    }

    public int getPrimerParcial() {
        return primerParcial;
    }

    public int getSegundoParcial() {
        return segundoParcial;
    }

    public int getExamenFinal() {
        return examenFinal;
    }

    public double getNotaFinal() {  
        return notaFinal;
    }

    // Setters con validaciones
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setActividades(int actividades) {
        if (actividades <= MAX_ACTIVIDADES) {
            this.actividades = actividades;
        } else {
            throw new IllegalArgumentException("La puntuación de actividades no puede exceder " + MAX_ACTIVIDADES + " puntos.");
        }
        actualizarNotaFinal();
    }

    public void setPrimerParcial(int primerParcial) {
        if (primerParcial <= MAX_PRIMER_PARCIAL) {
            this.primerParcial = primerParcial;
        } else {
            throw new IllegalArgumentException("La puntuación del primer parcial no puede exceder " + MAX_PRIMER_PARCIAL + " puntos.");
        }
        actualizarNotaFinal();
    }

    public void setSegundoParcial(int segundoParcial) {
        if (segundoParcial <= MAX_SEGUNDO_PARCIAL) {
            this.segundoParcial = segundoParcial;
        } else {
            throw new IllegalArgumentException("La puntuación del segundo parcial no puede exceder " + MAX_SEGUNDO_PARCIAL + " puntos.");
        }
        actualizarNotaFinal();
    }

    public void setExamenFinal(int examenFinal) {
        if (examenFinal <= MAX_EXAMEN_FINAL) {
            this.examenFinal = examenFinal;
        } else {
            throw new IllegalArgumentException("La puntuación del examen final no puede exceder " + MAX_EXAMEN_FINAL + " puntos.");
        }
        actualizarNotaFinal();
    }

    public void actualizarNotaFinal() {
        System.out.println("Actividades: " + actividades + 
                           ", Primer Parcial: " + primerParcial + 
                           ", Segundo Parcial: " + segundoParcial + 
                           ", Examen Final: " + examenFinal);
        this.notaFinal = calcularNotaFinal();  // Método para calcular la nota final
    }

    private int calcularNotaFinal() {
        // Sumar directamente los puntos obtenidos en actividades, primer parcial, segundo parcial y examen final
        return actividades + primerParcial + segundoParcial + examenFinal;
    }
}
