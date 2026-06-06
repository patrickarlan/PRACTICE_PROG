string[] orderId = { "B123", "C234", "A345", "C15", "B177", "G3003", "C235", "B179" };

string? name = Console.ReadLine();
if (name is null || name.Length == 0) return;

foreach (string orders in orderId)
{
    if (orders.StartsWith(name[0].ToString(), StringComparison.OrdinalIgnoreCase))
    {
        Console.WriteLine(orders);
    }
}