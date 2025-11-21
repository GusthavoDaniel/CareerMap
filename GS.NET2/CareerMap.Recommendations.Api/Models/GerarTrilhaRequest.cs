namespace CareerMap.Recommendations.Api.Models;

public class GerarTrilhaRequest
{
    public string AreaInteresse { get; set; } = "Full Stack";
    public string NivelAtual { get; set; } = "Júnior";
    public List<string>? Competencias { get; set; }
}
