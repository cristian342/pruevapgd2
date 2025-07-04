using Microsoft.EntityFrameworkCore;
using PruebaTecnicaPgd.API.Data;
using PruebaTecnicaPgd.API.Models;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    ContentRootPath = AppContext.BaseDirectory,
    WebRootPath = "wwwroot"
});

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext with SQLite
builder.Services.AddDbContext<BibliotecaContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseDefaultFiles(); // Enable serving of default files (like index.html)
app.UseStaticFiles(); // Enable serving of static files

app.UseRouting(); // Explicitly add routing middleware
app.UseAuthorization(); // Ensure authorization is enabled if needed later

app.MapControllers(); // Map controllers for API endpoints

app.MapFallbackToFile("index.html"); // Serve index.html for all unmatched routes

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<BibliotecaContext>();
        context.Database.Migrate(); // Apply any pending migrations
        
        // Seed Authors
        if (!context.Autores.Any())
        {
            context.Autores.AddRange(
                new Autor { Nombre = "Gabriel García Márquez", Nacionalidad = "Colombiano" },
                new Autor { Nombre = "Mario Vargas Llosa", Nacionalidad = "Peruano" },
                new Autor { Nombre = "Isabel Allende", Nacionalidad = "Chilena" }
            );
            context.SaveChanges();
        }

        // Seed Categories
        if (!context.Categorias.Any())
        {
            context.Categorias.AddRange(
                new Categoria { Nombre = "Novela" },
                new Categoria { Nombre = "Realismo Mágico" },
                new Categoria { Nombre = "Ficción Histórica" }
            );
            context.SaveChanges();
        }

        // Seed Libros
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
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

app.Run();
