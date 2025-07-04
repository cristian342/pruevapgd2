using Microsoft.EntityFrameworkCore;
using PruebaTecnicaPgd.API.Models;

namespace PruebaTecnicaPgd.API.Data
{
    public class BibliotecaContext : DbContext
    {
        public BibliotecaContext(DbContextOptions<BibliotecaContext> options) : base(options)
        {
        }

        public DbSet<Libro> Libros { get; set; }
        public DbSet<Autor> Autores { get; set; }
        public DbSet<Categoria> Categorias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Se utiliza para configurar relaciones complejas o datos iniciales (seeding)
            base.OnModelCreating(modelBuilder);
        }
    }
}
