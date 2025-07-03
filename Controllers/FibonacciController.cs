using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace PruebaTecnicaPgd.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FibonacciController : ControllerBase
    {
        [HttpGet("generate/{n}")]
        public IActionResult GenerateFibonacciSequence(int n)
        {
            if (n < 0)
            {
                return BadRequest("El número debe ser no negativo.");
            }
            List<int> fibonacciSequence = GenerateFibonacci(n);
            return Ok(string.Join(", ", fibonacciSequence));
        }

        private List<int> GenerateFibonacci(int n)
        {
            List<int> fib = new List<int>();
            if (n <= 0) return fib;

            int a = 0;
            int b = 1;

            fib.Add(a);
            if (n > 1)
            {
                fib.Add(b);
            }

            for (int i = 2; i < n; i++)
            {
                int next = a + b;
                fib.Add(next);
                a = b;
                b = next;
            }
            return fib;
        }
    }
}
