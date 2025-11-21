using Microsoft.AspNetCore.Mvc;
using CareerMap.Recommendations.Api.Models;

namespace CareerMap.Recommendations.Api.Controllers.v1;

[ApiController]
[Route("api/v1/[controller]")] // -> /api/v1/trilhas
public class TrilhasController : ControllerBase
{
    private readonly ILogger<TrilhasController> _logger;

    public TrilhasController(ILogger<TrilhasController> logger)
    {
        _logger = logger;
    }

    /// <summary>Gera uma trilha de carreira (mock para GS/Mobile).</summary>
    [HttpPost("gerar")] // -> /api/v1/trilhas/gerar
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<TrilhaDto> Gerar([FromBody] GerarTrilhaRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.AreaInteresse))
            return BadRequest("A área de interesse é obrigatória.");

        _logger.LogInformation("Gerando trilha para {Area} (nível {Nivel})",
            request.AreaInteresse, request.NivelAtual);

        var trilha = new TrilhaDto
        {
            Titulo = $"Trilha de {request.AreaInteresse} - Nível {request.NivelAtual}",
            Carreira = request.AreaInteresse,
            Justificativa =
                $"Trilha baseada no interesse em {request.AreaInteresse} e nível {request.NivelAtual}. (Mock)",
            Steps = new List<PassoDto>
            {
                new PassoDto
                {
                    Titulo = "Fundamentos Essenciais",
                    Duracao = "40h",
                    Descricao = "Conceitos básicos e boas práticas.",
                    Recursos = new List<RecursoDto>
                    {
                        new RecursoDto { Nome = "Documentação Oficial .NET", Link = "https://learn.microsoft.com/dotnet/" },
                        new RecursoDto { Nome = "Curso Básico", Link = "https://www.exemplo.com/curso-basico" }
                    }
                },
                new PassoDto
                {
                    Titulo = "APIs e Microsserviços",
                    Duracao = "60h",
                    Descricao = "Construindo APIs REST com boas práticas.",
                    Recursos = new List<RecursoDto>
                    {
                        new RecursoDto { Nome = "REST Best Practices", Link = "https://restfulapi.net/" }
                    }
                }
            }
        };

        return Ok(trilha);
    }
}
