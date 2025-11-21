using CareerMap.Recommendations.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Banco
builder.Services.AddDbContext<RecommendationsDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Libera CORS totalmente (para testes LAN)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// ✅ Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ❌ Remova o HTTPS redirection (causa erro no iPhone)
 // app.UseHttpsRedirection();

app.UseCors();
app.UseAuthorization();
app.MapControllers();

// ✅ Endpoint raiz de teste
app.MapGet("/", () => Results.Ok("API Online"));

// Migrations automáticas (opcional)
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<RecommendationsDbContext>();
    dbContext.Database.Migrate();
}

app.Run();
