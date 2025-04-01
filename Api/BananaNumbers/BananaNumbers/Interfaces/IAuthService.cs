using BananaNumbers.Models.Dtos;
using Microsoft.AspNetCore.Identity;

namespace BananaNumbers.Interfaces
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAsync(RegisterDto request);
        Task<LoginResponseDto> LoginAsync(LoginDto request);
    }
}
