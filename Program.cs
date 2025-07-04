using Microsoft.EntityFrameworkCore;
using PruebaTecnicaPgd.API.Data;
using PruebaTecnicaPgd.API.Models;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    ContentRootPath = AppContext.BaseDirectory,
    WebRootPath = "wwwroot"
});

// Agregar servicios al contenedor.
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar DbContext con SQLite
builder.Services.AddDbContext<BibliotecaContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configurar el pipeline de solicitud HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseDefaultFiles(); // Habilitar la entrega de archivos predeterminados (como index.html)
app.UseStaticFiles(); // Habilitar la entrega de archivos estáticos

app.UseRouting(); // Agregar explícitamente el middleware de enrutamiento
app.UseAuthorization(); // Asegurarse de que la autorización esté habilitada si se necesita más adelante

app.MapControllers(); // Mapear controladores para los endpoints de la API

app.MapFallbackToFile("index.html"); // Servir index.html para todas las rutas no coincidentes

// Sembrar la base de datos con datos iniciales
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<BibliotecaContext>();
        context.Database.Migrate(); // Aplicar cualquier migración pendiente
        
        // Sembrar autores
        if (!context.Autores.Any())
        {
            context.Autores.AddRange(
                new Autor { Nombre = "Gabriel García Márquez", Nacionalidad = "Colombiano" },
                new Autor { Nombre = "Mario Vargas Llosa", Nacionalidad = "Peruano" },
                new Autor { Nombre = "Isabel Allende", Nacionalidad = "Chilena" }
            );
            context.SaveChanges();
        }

        // Sembrar categorías
        if (!context.Categorias.Any())
        {
            context.Categorias.AddRange(
                new Categoria { Nombre = "Novela" },
                new Categoria { Nombre = "Realismo Mágico" },
                new Categoria { Nombre = "Ficción Histórica" }
            );
            context.SaveChanges();
        }

        // Sembrar libros
        if (!context.Libros.Any())
        {
            var autorGabo = context.Autores.FirstOrDefault(a => a.Nombre == "Gabriel García Márquez");
            var autorMario = context.Autores.FirstOrDefault(a => a.Nombre == "Mario Vargas Llosa");
            var categoriaNovela = context.Categorias.FirstOrDefault(c => c.Nombre == "Novela");
            var categoriaRealismoMagico = context.Categorias.FirstOrDefault(c => c.Nombre == "Realismo Mágico");

            if (autorGabo != null && categoriaRealismoMagico != null && categoriaNovela != null)
            {
                context.Libros.Add(new Libro { Titulo = "Cien años de soledad", AnioPublicacion = 1967, AutorId = autorGabo.Id, CategoriaId = categoriaRealismoMagico.Id });
            }
            if (autorMario != null && categoriaNovela != null)
            {
                context.Libros.Add(new Libro { Titulo = "La ciudad y los perros", AnioPublicacion = 1963, AutorId = autorMario.Id, CategoriaId = categoriaNovela.Id });
            }
            context.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error al sembrar la base de datos.");
    }
}

app.Run();
