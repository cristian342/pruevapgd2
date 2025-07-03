using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaPgd.API.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre de la categoría es obligatorio.")]
        [StringLength(50, ErrorMessage = "El nombre de la categoría no puede tener más de 50 caracteres.")]
        public string Nombre { get; set; }

        // Inicialización segura
        public ICollection<Libro> Libros { get; set; } = new List<Libro>();
    }
}

