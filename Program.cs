using Microsoft.EntityFrameworkCore;
using PruebaTecnicaPgd.API.Data;
using PruebaTecnicaPgd.API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
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
app.UseAuthorization(); // Ensure authorization is enabled if needed later

app.MapControllers(); // Map controllers for API endpoints

app.Run();
