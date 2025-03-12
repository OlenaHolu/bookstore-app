# 📚 Bookstore App

Este proyecto es una aplicación web para la gestión de libros, desarrollada con **Symfony, MySQL y ReactJS**.

## 🚀 Tecnologías utilizadas
- **Backend:** PHP, Symfony, MySQL  
- **Frontend:** ReactJS (Single Page Application - SPA)  

---

## 🛠️ Funcionalidades

### 🔷 Backend (Symfony + MySQL)
1. **Importador de libros:**
   - Lee el fichero `books.json` y almacena su información en la base de datos.

2. **Gestión de imágenes:**
   - Cada libro puede tener de 0 a X imágenes asociadas.

3. **Webservices REST que devuelven información en JSON:**
   - 📚 Obtener todos los libros.
   - 📅 Obtener libros publicados antes del año **X**.
   - 🎭 Obtener libros de la categoría **X**.
   - 🔍 Obtener información de un libro concreto por **ISBN**, incluyendo sus imágenes.

4. **Servicios web para manipulación de datos:**
   - ➕ Añadir un libro.
   - ❌ Eliminar un libro.

---

### 🔷 Frontend (ReactJS)
1. 📖 **Mostrar una parrilla visual de libros**.
2. 🔍 **Al hacer clic en un libro, mostrar más detalles dinámicamente**.
3. 📝 **Formulario para insertar un libro**.
4. 🗑️ **Eliminar un libro y actualizar la vista automáticamente**.

---

## ⚡ Arquitectura
El proyecto sigue el principio de **Single Page Application (SPA)** para mejorar la experiencia de usuario.

- 🔹 **Frontend (ReactJS)** → Consume los servicios del backend mediante API REST.
- 🔹 **Backend (Symfony)** → Proporciona endpoints RESTful y gestiona la base de datos con MySQL.

---

## 🚀 Cómo ejecutar el proyecto

### 🔹 Clonar el repositorio
```bash
git clone https://github.com/usuario/bookstore-app.git
cd bookstore-appp
