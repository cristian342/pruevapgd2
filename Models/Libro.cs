using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaTecnicaPgd.API.Models
{
    public class Libro
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El título del libro es obligatorio.")]
        [StringLength(200, ErrorMessage = "El título no puede tener más de 200 caracteres.")]
        public string Titulo { get; set; }

        [Range(0, 9999, ErrorMessage = "El año de publicación debe ser un número válido.")]
        public int AnioPublicacion { get; set; }

        // Clave foránea para la entidad Autor
        [Required(ErrorMessage = "El autor es obligatorio.")]
        public int AutorId { get; set; }

        // Clave foránea para la entidad Categoría
        [Required(ErrorMessage = "La categoría es obligatoria.")]
        public int CategoriaId { get; set; }

        // Propiedades de navegación para acceder a las entidades relacionadas
        [ForeignKey(nameof(AutorId))]
        public Autor Autor { get; set; } = null!; // null-forgiving para indicar que siempre tendrá un valor

        [ForeignKey(nameof(CategoriaId))]
        public Categoria Categoria { get; set; } = null!;
    }
}
