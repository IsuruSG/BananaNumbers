using BananaNumbers.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BananaNumbers.Interfaces
{
    public interface IGameService
    {
        Task<int> AddGameDetails(GameDetailsDto gameDetailsDto, ClaimsPrincipal userPrincipal);
        Task<List<LeaderboardEntryDto>> GetTopScores(ClaimsPrincipal userPrincipal);
        Task<GameStatsDto> GetUserGameStatsAsync(ClaimsPrincipal userPrincipal);
    }
}
