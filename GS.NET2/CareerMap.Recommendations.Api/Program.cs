using CareerMap.Recommendations.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ---------- Banco ----------
builder.Services.AddDbContext<RecommendationsDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// ---------- Controllers ----------
builder.Services.AddControllers()
    .AddJsonOptions(o =>
    {
        // Se precisar serializar enums como string etc., ajuste aqui
        // o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// ---------- Swagger ----------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ---------- CORS (liberado para testes LAN) ----------
const string AllowAll = "AllowAll";
builder.Services.AddCors(options =>
{
    options.AddPolicy(AllowAll, policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// ---------- Kestrel ouvindo na rede (0.0.0.0:5097) ----------
builder.WebHost.ConfigureKestrel(o =>
{
    o.ListenAnyIP(5097); // HTTP aberto na LAN
    // Se quiser HTTPS externo depois, configure outro o.Listen com certificado
});

var app = builder.Build();

// ---------- Pipeline ----------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ⚠️ NÃO redirecionar para HTTPS em testes mobile (certificados causam erro no Android/iOS)
// app.UseHttpsRedirection();

app.UseCors(AllowAll);
app.UseAuthorization();

app.MapControllers();

// ---------- Endpoints de teste ----------
app.MapGet("/", () => Results.Ok("API Online"));
app.MapGet("/health", () => Results.Ok(new { status = "healthy", ts = DateTime.UtcNow }));

// ---------- Migrations automáticas (opcional) ----------
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<RecommendationsDbContext>();
    db.Database.Migrate();
}

app.Run();
