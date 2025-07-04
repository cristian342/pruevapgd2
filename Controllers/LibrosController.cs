using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaPgd.API.Data;
using PruebaTecnicaPgd.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaTecnicaPgd.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibrosController : ControllerBase
    {
        private readonly BibliotecaContext _context;

        public LibrosController(BibliotecaContext context)
        {
            _context = context;
        }

        // GET: api/Libros (Obtener todos los libros con filtros opcionales)
        // GET: api/Libros?autor=nombre&categoria=nombre&anioDesde=2000&anioHasta=2020
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Libro>>> GetLibros(
            [FromQuery] string? autor = null,
            [FromQuery] string? categoria = null,
            [FromQuery] int? anioDesde = null,
            [FromQuery] int? anioHasta = null)
        {
            IQueryable<Libro> query = _context.Libros
                .Include(l => l.Autor)
                .Include(l => l.Categoria);

            if (!string.IsNullOrEmpty(autor))
            {
                query = query.Where(l => l.Autor != null && l.Autor.Nombre.Contains(autor));
            }

            if (!string.IsNullOrEmpty(categoria))
            {
                query = query.Where(l => l.Categoria != null && l.Categoria.Nombre.Contains(categoria));
            }

            if (anioDesde.HasValue)
            {
                query = query.Where(l => l.AnioPublicacion >= anioDesde.Value);
            }

            if (anioHasta.HasValue)
            {
                query = query.Where(l => l.AnioPublicacion <= anioHasta.Value);
            }

            return await query.ToListAsync();
        }

        // GET: api/Libros/5 (Obtener un libro por ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Libro>> GetLibro(int id)
        {
            var libro = await _context.Libros
                .Include(l => l.Autor)
                .Include(l => l.Categoria)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (libro == null)
            {
                return NotFound();
            }

            return libro;
        }

        // POST: api/Libros (Crear un nuevo libro)
        [HttpPost]
        public async Task<ActionResult<Libro>> PostLibro(Libro libro)
        {
            // Validar que el AutorId y CategoriaId existan en la base de datos
            var autorExists = await _context.Autores.AnyAsync(a => a.Id == libro.AutorId);
            var categoriaExists = await _context.Categorias.AnyAsync(c => c.Id == libro.CategoriaId);

            if (!autorExists)
            {
                return BadRequest("El AutorId especificado no existe.");
            }
            if (!categoriaExists)
            {
                return BadRequest("La CategoriaId especificada no existe.");
            }

            // Validación para evitar duplicados por título y autor del libro
            if (await _context.Libros.AnyAsync(l => l.Titulo == libro.Titulo && l.AutorId == libro.AutorId))
            {
                return Conflict("Ya existe un libro con este título y autor.");
            }

            _context.Libros.Add(libro);
            await _context.SaveChangesAsync();

            // Cargar las propiedades de navegación (Autor y Categoria) para la respuesta
            await _context.Entry(libro).Reference(l => l.Autor).LoadAsync();
            await _context.Entry(libro).Reference(l => l.Categoria).LoadAsync();

            return CreatedAtAction("GetLibro", new { id = libro.Id }, libro);
        }

        // PUT: api/Libros/5 (Actualizar un libro existente)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibro(int id, Libro libro)
        {
            if (id != libro.Id)
            {
                return BadRequest();
            }

            // Validar que el AutorId y CategoriaId existan en la base de datos
            var autorExists = await _context.Autores.AnyAsync(a => a.Id == libro.AutorId);
            var categoriaExists = await _context.Categorias.AnyAsync(c => c.Id == libro.CategoriaId);

            if (!autorExists)
            {
                return BadRequest("El AutorId especificado no existe.");
            }
            if (!categoriaExists)
            {
                return BadRequest("La CategoriaId especificada no existe.");
            }

            _context.Entry(libro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Libros/5 (Eliminar un libro)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibro(int id)
        {
            var libro = await _context.Libros.FindAsync(id);
            if (libro == null)
            {
                return NotFound();
            }

            _context.Libros.Remove(libro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LibroExists(int id)
        {
            return _context.Libros.Any(e => e.Id == id);
        }
    }
}
