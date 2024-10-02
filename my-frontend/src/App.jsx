import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importamos los estilos CSS

function App() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [actividades, setActividades] = useState("");
    const [primerParcial, setPrimerParcial] = useState("");
    const [segundoParcial, setSegundoParcial] = useState("");
    const [examenFinal, setExamenFinal] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentEstudianteId, setCurrentEstudianteId] = useState(null);
    const [searchId, setSearchId] = useState(""); 
    const [studentDetails, setStudentDetails] = useState(null); 

    //error en ingreso

    const [errorActividades, setErrorActividades] = useState("");
    const [errorPrimerParcial, setErrorPrimerParcial] = useState("");
    const [errorSegundoParcial, setErrorSegundoParcial] = useState("");
    const [errorExamenFinal, setErrorExamenFinal] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const fetchEstudiantes = () => {
        axios.get('/api/estudiantes')
            .then(response => setEstudiantes(response.data))
            .catch(error => console.error("Error al obtener los estudiantes: ", error));
    };

    const addEstudiante = () => {
        if (errorActividades || errorPrimerParcial || errorSegundoParcial || errorExamenFinal) {
            setErrorMessage("Por favor, corrige los errores antes de enviar.");
            return;
        }
    
        if (!nombre || !apellido || !actividades || !primerParcial || !segundoParcial || !examenFinal) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }
    
        setErrorMessage("");

        const nuevoEstudiante = {
            nombre,
            apellido,
            actividades: parseInt(actividades),
            primerParcial: parseInt(primerParcial),
            segundoParcial: parseInt(segundoParcial),
            examenFinal: parseInt(examenFinal)
        };

        if (editMode) {
            axios.put(`/api/estudiantes/${currentEstudianteId}`, nuevoEstudiante)
                .then(() => {
                    fetchEstudiantes();
                    setEditMode(false);
                    setCurrentEstudianteId(null);
                    clearForm();
                })
                .catch(error => console.error("Error al editar el estudiante: ", error));
        } else {
            axios.post('/api/estudiantes', nuevoEstudiante)
                .then(response => {
                    setEstudiantes([...estudiantes, response.data]);
                    clearForm();
                })
                .catch(error => {
                    console.error("Error al agregar estudiante: ", error.response ? error.response.data : error.message);
                });
        }
    };

    const deleteEstudiante = (id) => {
        axios.delete(`/api/estudiantes/${id}`)
            .then(() => {
                setEstudiantes(estudiantes.filter(est => est.id !== id));
            })
            .catch(error => console.error("Error al eliminar el estudiante: ", error));
    };

    const editEstudiante = (estudiante) => {
        setNombre(estudiante.nombre);
        setApellido(estudiante.apellido);
        setActividades(estudiante.actividades);
        setPrimerParcial(estudiante.primerParcial);
        setSegundoParcial(estudiante.segundoParcial);
        setExamenFinal(estudiante.examenFinal);
        setEditMode(true);
        setCurrentEstudianteId(estudiante.id);
    };

    const updateEstudiante = () => {
        const estudianteActualizado = {
            nombre, 
            apellido,
            actividades: parseInt(actividades),
            primerParcial: parseInt(primerParcial),
            segundoParcial: parseInt(segundoParcial),
            examenFinal: parseInt(examenFinal),
        };

        axios.put(`/api/estudiantes/${currentEstudianteId}`, estudianteActualizado)

        .then(response => {
            fetchEstudiantes(); // Refresca la lista de estudiantes
            clearForm();
            setEditMode(false);
        })
        .catch(error => console.error("Error al actualizar el estudiante: ", error));
    }; 

    const cancelEdit = () => {
        clearForm();
        setEditMode(false);
        setCurrentEstudianteId(null);
    };

    const clearForm = () => {
        setNombre("");
        setApellido("");
        setActividades("");
        setPrimerParcial("");
        setSegundoParcial("");
        setExamenFinal("");
        setSearchId(""); 
        setStudentDetails(null); 
        setErrorMessage("");
    };

    const searchStudent = () => {
        if (!searchId) {
            setErrorMessage("Por favor, ingresa un ID.");
            return;
        }

        axios.get(`/api/estudiantes/${searchId}`)
            .then(response => {
                setStudentDetails(response.data);
                setErrorMessage("");
            })
            .catch(error => {
                setErrorMessage("No se encontró el estudiante.");
                setStudentDetails(null);
            });
    };

    return (
        <div className="container">
            <h1>{editMode ? "Editar Estudiante" : "Agregar Estudiante"}</h1>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Nombre del estudiante"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Apellido del estudiante"
                    value={apellido}
                    onChange={e => setApellido(e.target.value)}
                />
                
                <input
                    type="number"
                    placeholder="Actividades (máximo 35)"
                    value={actividades}
                    onChange={e => {setActividades(e.target.value)
                    const value = parseInt(e.target.value);
                    if (value > 35 || value <0){
                        setErrorActividades("Las actividades deben estar entre 0 y 35 puntos")
                    }else {
                        setActividades(e.target.value);
                        setErrorActividades("");
                    }
                    }}
                    min="0"
                    max="35"
                />
                {errorActividades && <p style={{ color: "red" }}>{errorActividades}</p>}

                <input
                    type="number"
                    placeholder="Primer Parcial (máximo 15)"
                    value={primerParcial}
                    onChange={e => {
                        const value = parseInt(e.target.value);
                        if (value > 15 || value < 0) {
                            setErrorPrimerParcial("El primer parcial debe estar entre 0 y 15 puntos.");
                        } else {
                            setPrimerParcial(e.target.value);
                            setErrorPrimerParcial(""); // Limpiar el mensaje si el valor es válido
                        }
                    }}
                    min="0"
                    max="15"
                />
                {errorPrimerParcial && <p style={{ color: "red" }}>{errorPrimerParcial}</p>}
                
                <input
                    type="number"
                    placeholder="Segundo Parcial (máximo 15)"
                    value={segundoParcial}
                    onChange={e => {
                        const value = parseInt(e.target.value);
                        if (value > 15 || value < 0) {
                            setErrorSegundoParcial("El segundo parcial debe estar entre 0 y 15 puntos.");
                        } else {
                            setSegundoParcial(e.target.value);
                            setErrorSegundoParcial(""); // Limpiar el mensaje si el valor es válido
                        }
                    }}
                    min="0"
                    max="15"
                />
                {errorSegundoParcial && <p style={{ color: "red" }}>{errorSegundoParcial}</p>}
                
                <input
                    type="number"
                    placeholder="Examen Final (máximo 35)"
                    value={examenFinal}
                    onChange={e => {
                        const value = parseInt(e.target.value);
                        if (value > 35 || value < 0) {
                            setErrorExamenFinal("El examen final debe estar entre 0 y 35 puntos.");
                        } else {
                            setExamenFinal(e.target.value);
                            setErrorExamenFinal(""); // Limpiar el mensaje si el valor es válido
                        }
                    }}
                    min="0"
                    max="35"
                />
                {errorExamenFinal && <p style={{ color: "red" }}>{errorExamenFinal}</p>}

                <div className="button-group">
                    <button onClick={editMode ? updateEstudiante : addEstudiante} className="add-button">
                        {editMode ? "Guardar Cambios" : "Agregar Estudiante"}
                    </button>
                    {editMode && (
                        <button onClick={cancelEdit} className="cancel-button">
                            Cancelar
                        </button>
                    )}
                </div>


                {errorMessage && <p>{errorMessage}</p>}
            </div>

            {/* Sección para buscar estudiante por ID */}
            <h1>Buscar Estudiante</h1>
            <div className="search-container">
                <input
                    type="number"
                    placeholder="ID del Estudiante"
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                />      
                <button onClick={searchStudent} className="search-button">Buscar</button>
            </div>

            {studentDetails && (
                <div className="details">
                    <h2>Detalles del Estudiante</h2>
                    <p><strong>ID:</strong> {studentDetails.id}</p>
                    <p><strong>Nombre:</strong> {studentDetails.nombre}</p>
                    <p><strong>Apellido:</strong> {studentDetails.apellido}</p>
                    <p><strong>Actividades:</strong> {studentDetails.actividades}</p>
                    <p><strong>Primer Parcial:</strong> {studentDetails.primerParcial}</p>
                    <p><strong>Segundo Parcial:</strong> {studentDetails.segundoParcial}</p>
                    <p><strong>Examen Final:</strong> {studentDetails.examenFinal}</p>
                    <p><strong>Nota Final:</strong> {studentDetails.notaFinal}</p>
                </div>
            )}

            <h1>Lista de Estudiantes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Actividades</th>
                        <th>Parcial 1</th>
                        <th>Parcial 2</th>
                        <th>Examen Final</th>
                        <th>Nota Final</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map(est => (
                        <tr key={est.id}>
                            <td>{est.id}</td>
                            <td>{est.apellido}</td>
                            <td>{est.nombre}</td>
                            <td>{est.actividades}</td>
                            <td>{est.primerParcial}</td>
                            <td>{est.segundoParcial}</td>
                            <td>{est.examenFinal}</td>
                            <td>{est.notaFinal}</td>
                            <td>
                                <button onClick={() => editEstudiante(est)} className="edit-button">Editar</button>
                                <button onClick={() => deleteEstudiante(est.id)} className="delete-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default App;
