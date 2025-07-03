using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace PruebaTecnicaPgd.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        [HttpPost("create")]
        public async Task<IActionResult> CreateFile([FromBody] FileCreationRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FileName))
            {
                return BadRequest("El nombre del archivo no puede estar vacío.");
            }

            if (string.IsNullOrWhiteSpace(request.Content))
            {
                return BadRequest("El contenido del archivo no puede estar vacío.");
            }

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "CreatedFiles", request.FileName);

            try
            {
                // Ensure the directory exists
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                await System.IO.File.WriteAllTextAsync(filePath, request.Content);
                return Ok($"Operación realizada con éxito. Archivo guardado en: {filePath}");
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Error al crear el archivo: {ex.Message}");
            }
        }
    }

    public class FileCreationRequest
    {
        public string FileName { get; set; }
        public string Content { get; set; }
    }
}
