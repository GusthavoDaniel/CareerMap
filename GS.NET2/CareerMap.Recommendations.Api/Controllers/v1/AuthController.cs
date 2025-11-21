using Microsoft.AspNetCore.Mvc;

namespace CareerMap.Recommendations.Api.Controllers.v1
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        // Mock de login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { message = "E-mail e senha obrigatórios." });

            // Retorna um token fake e o usuário mockado
            var token = "mock-jwt-token";
            var user = new { name = "Aluno FIAP", email = request.Email };

            return Ok(new { token, user });
        }

        // Mock de registro
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password) || string.IsNullOrEmpty(request.Name))
                return BadRequest(new { message = "Preencha todos os campos obrigatórios." });

            return Ok(new { message = "Usuário registrado com sucesso (mock)." });
        }
    }

    // DTOs
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
