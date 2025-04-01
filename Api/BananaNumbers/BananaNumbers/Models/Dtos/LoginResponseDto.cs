namespace BananaNumbers.Models.Dtos
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
    }
}
