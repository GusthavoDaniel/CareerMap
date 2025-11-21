namespace CareerMap.Recommendations.Api.Models
{
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponse
    {
        public string Token { get; set; } = "mock-jwt-token";
        public object User { get; set; } = new { email = "user@fiap.com.br", name = "Aluno FIAP" };
    }
}
