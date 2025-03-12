Las tecnologías usadas son PHP, Symfony y MySQL en la parte de backend, y ReactJS en la parte de frontend. 
Backend:
1.Preparar un importador para leer el fichero “books.json” y almacenar su información en una estructura de base de datos.
2. Cada uno de los libros podrá tener asignadas de 0 a X imágenes.
3. Preparar una serie de webservices REST que devuelvan la siguiente información en formato JSON:
○ Todos los libros.
○ Todos los libros publicados antes del año X.
○ Todos los libros de la categoría X.
○ La información de un libro concreto, pasando como parámetro un ISBN, y que devolverá también las imágenes del libro.
4. Preparar dos servicios web que permitan:
○ Añadir un libro.
○ Eliminar un libro.
Frontend:
1. Mostrar del modo más visual posible una parrilla de libros.
2. Al pulsar sobre uno de los libros, se mostrará de forma dinámica más información sobre él.
3. Formulario para insertar un libro.
4. Eliminar un libro. Al completarse la acción, la parrilla se actualiza de forma lo más transparente posible al usuario.
Todas estas acciones se realicen con la idea de Single Page Application.
