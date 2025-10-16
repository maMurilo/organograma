using MeuProjeto.Models;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// --------------------------------------
// Middleware para esconder extensão de arquivos
// --------------------------------------
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value;

    if (!System.IO.Path.HasExtension(path))
    {
        var candidateHtml = System.IO.Path.Combine("wwwroot", path.TrimStart('/') + ".html");
        var candidateJs = System.IO.Path.Combine("wwwroot", path.TrimStart('/') + ".js");

        if (System.IO.File.Exists(candidateHtml))
        {
            await context.Response.SendFileAsync(candidateHtml);
            return;
        }
        if (System.IO.File.Exists(candidateJs))
        {
            await context.Response.SendFileAsync(candidateJs);
            return;
        }
    }

    await next();
});

// --------------------------------------
// Habilita arquivos estáticos
// --------------------------------------
app.UseDefaultFiles();
app.UseStaticFiles();

// --------------------------------------
// Lista fixa de talhões
// --------------------------------------
var talhoes = new List<Talhao>
{
    new Talhao { Id = 1, Nome = "Talhão A", Cultura = "Soja" },
    new Talhao { Id = 2, Nome = "Talhão B", Cultura = "Milho" },
    new Talhao { Id = 3, Nome = "Talhão C", Cultura = "Cana" }
};

// --------------------------------------
// Pasta de rede
// --------------------------------------
string pastaRede = @"\\MEUSERVIDOR\Compartilhamento";

// --------------------------------------
// Endpoints internos
// --------------------------------------
app.MapGet("/api/talhoes", () => talhoes);

// --------------------------------------
// Endpoints públicos para o front-end
// --------------------------------------
app.MapGet("/talhoes-publico", () => 
{
    // Chama internamente API sem expor chave
    return talhoes;
});

app.MapGet("/arquivos-publico", () =>
{
    if (!Directory.Exists(pastaRede)) return Results.NotFound();
    var arquivos = Directory.GetFiles(pastaRede)
        .Select(f => new { Nome = Path.GetFileName(f) });
    return Results.Ok(arquivos);
});

app.MapGet("/arquivos-publico/{nome}", (string nome) =>
{
    var caminho = Path.Combine(pastaRede, nome);
    if (!File.Exists(caminho)) return Results.NotFound();
    return Results.File(caminho, "application/octet-stream", nome);
});

// --------------------------------------
// Roda na porta 8080
// --------------------------------------
app.Run("http://localhost:5555");
