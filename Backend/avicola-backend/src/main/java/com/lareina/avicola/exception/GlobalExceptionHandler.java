package com.lareina.avicola.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
// Intercepta excepciones y devuelve respuestas HTTP consistentes.
public class GlobalExceptionHandler {

    // Recurso no encontrado → 404
    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<Map<String, Object>> manejarNoEncontrado(RecursoNoEncontradoException ex) {
        return construirRespuesta(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // Argumento inválido (lógica de negocio) → 400
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> manejarArgumentoInvalido(IllegalArgumentException ex) {
        return construirRespuesta(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // Errores de validación (@Valid) → 400 con detalle por campo
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> manejarValidacion(MethodArgumentNotValidException ex) {
        // Convierte errores de validación en formato campo -> mensaje.
        Map<String, String> erroresCampos = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String campo = ((FieldError) error).getField();
            String mensaje = error.getDefaultMessage();
            erroresCampos.put(campo, mensaje);
        });

        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("timestamp", LocalDateTime.now().toString());
        cuerpo.put("status", HttpStatus.BAD_REQUEST.value());
        cuerpo.put("error", "Error de validación");
        cuerpo.put("campos", erroresCampos);

        return ResponseEntity.badRequest().body(cuerpo);
    }

    // Cualquier otro error → 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> manejarGeneral(Exception ex) {
        return construirRespuesta(HttpStatus.INTERNAL_SERVER_ERROR,
                "Error interno del servidor: " + ex.getMessage());
    }

    private ResponseEntity<Map<String, Object>> construirRespuesta(HttpStatus status, String mensaje) {
        // Respuesta estándar para facilitar manejo desde frontend.
        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("timestamp", LocalDateTime.now().toString());
        cuerpo.put("status", status.value());
        cuerpo.put("error", status.getReasonPhrase());
        cuerpo.put("mensaje", mensaje);
        return ResponseEntity.status(status).body(cuerpo);
    }
}
