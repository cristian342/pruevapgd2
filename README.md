# Aplicación de Ejercicios y Biblioteca

Este proyecto es una aplicación web ASP.NET Core que demuestra varias funcionalidades a través de ejercicios interactivos y una sección de biblioteca.

## Funcionalidades

### Ejercicio 1: Sucesión de Fibonacci
Permite generar la sucesión de Fibonacci hasta un número `n` especificado por el usuario. La secuencia se calcula en el backend y se muestra en la interfaz de usuario.

### Ejercicio 2: Manipulación de Archivos de Texto
Permite crear un archivo de texto en el servidor con un nombre y contenido proporcionados por el usuario. El contenido se guarda con cada palabra en una línea separada. Los archivos se guardan en la carpeta `CreatedFiles` dentro del directorio de la aplicación.

### Sección de Biblioteca
Muestra datos de una biblioteca (Autores, Categorías, Libros) almacenados en una base de datos SQLite. Los datos se cargan desde la API del backend y se presentan en tablas.

## Cómo Ejecutar la Aplicación

Para ejecutar esta aplicación, asegúrate de tener el SDK de .NET 9.0 (o superior) instalado.

1.  **Clonar el Repositorio (si aplica):**
    ```bash
    git clone https://github.com/cristian342/pruevapgd2.git
    cd PruebaTecnicaPgd.API
    ```

2.  **Restaurar Dependencias y Compilar:**
    Abre una terminal en el directorio raíz del proyecto (`PruebaTecnicaPgd.API`) y ejecuta:
    ```bash
    dotnet restore
    dotnet build
    ```

3.  **Ejecutar la Aplicación:**
    Desde la misma terminal, ejecuta:
    ```bash
    dotnet run
    ```
    La aplicación se iniciará y estará disponible en `http://localhost:5186` (o el puerto que se muestre en la consola).

4.  **Acceder a la Interfaz Web:**
    Abre tu navegador web y navega a `http://localhost:5186`.

## Buenas Prácticas de Documentación del Código

El código fuente de este proyecto sigue buenas prácticas de documentación, incluyendo:

*   **Comentarios en Línea:** Se utilizan comentarios para explicar lógica compleja o secciones específicas del código.
*   **Documentación XML:** Los controladores, modelos y métodos importantes están documentados usando comentarios XML, lo que permite generar documentación de la API (visible a través de Swagger/OpenAPI en `/swagger` cuando la aplicación está en modo desarrollo).
*   **Nombres Claros y Descriptivos:** Las variables, funciones, clases y archivos tienen nombres que reflejan su propósito y funcionalidad.

Para una comprensión más profunda del código, se recomienda revisar los archivos en las carpetas `Controllers`, `Models` y `Data`.
