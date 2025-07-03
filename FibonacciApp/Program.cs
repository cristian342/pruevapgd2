using System;
using System.Collections.Generic;

public class Program
{
    public static void Main(string[] args)
    {
        // First point: Fibonacci Sequence
        Console.WriteLine("--- Sucesión de Fibonacci ---");
        List<int> fibonacciSequence = GenerateFibonacci(10); // Generate first 10 Fibonacci numbers
        Console.WriteLine(string.Join(", ", fibonacciSequence));
        Console.WriteLine();

        // Second point: A simple message
        string secondPoint = "Este es el segundo punto: Un mensaje adicional.";
        Console.WriteLine("--- Segundo Punto ---");
        Console.WriteLine(secondPoint);
        Console.WriteLine();

        // Third point: Combined display of Fibonacci and the second point, separated
        Console.WriteLine("--- Tercer Punto (Combinado y Separado) ---");
        Console.WriteLine("Sucesión de Fibonacci: " + string.Join(", ", fibonacciSequence));
        Console.WriteLine("Segundo Punto: " + secondPoint);
    }

    public static List<int> GenerateFibonacci(int n)
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
