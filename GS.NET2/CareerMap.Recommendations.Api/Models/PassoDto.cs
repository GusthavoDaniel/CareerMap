namespace CareerMap.Recommendations.Api.Models;

public class PassoDto
{
    public string Titulo { get; set; } = "";
    public string Duracao { get; set; } = "";
    public string Descricao { get; set; } = "";
    public List<RecursoDto> Recursos { get; set; } = new();
}

public class RecursoDto
{
    public string Nome { get; set; } = "";
    public string Link { get; set; } = "";
}
