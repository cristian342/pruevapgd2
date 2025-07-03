using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaPgd.API.Models
{
    public class Autor
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre del autor es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre no puede tener más de 100 caracteres.")]
        public string Nombre { get; set; }

        [StringLength(100, ErrorMessage = "La nacionalidad no puede tener más de 100 caracteres.")]
        public string? Nacionalidad { get; set; }

        // Inicializar para evitar null reference exceptions
        public ICollection<Libro> Libros { get; set; } = new List<Libro>();
    }
}
