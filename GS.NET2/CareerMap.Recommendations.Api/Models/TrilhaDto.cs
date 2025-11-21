namespace CareerMap.Recommendations.Api.Models;

public class TrilhaDto
{
    public string Titulo { get; set; } = "";
    public string Carreira { get; set; } = "";
    public string Justificativa { get; set; } = "";
    public List<PassoDto> Steps { get; set; } = new();
}
