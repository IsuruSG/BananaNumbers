using BananaNumbers.Data;
using BananaNumbers.Interfaces;
using BananaNumbers.Models.Dtos;
using BananaNumbers.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;

namespace BananaNumbers.Services
{
    public class GameService : IGameService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public GameService(ApplicationDbContext context, UserManager<User> userManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<int> AddGameDetails(GameDetailsDto gameDetailsDto, ClaimsPrincipal userPrincipal)
        {
            
            try
            {
                // Get current user from UserManager
                var currentUser = await _userManager.GetUserAsync(userPrincipal);
                if (currentUser == null)
                {
                    throw new UnauthorizedAccessException("User not found");
                }
                // Verify the user owns this record
                else if (gameDetailsDto.UserId != currentUser.Id)
                {
                    throw new UnauthorizedAccessException("You can only add game details for your own account");
                }
                else
                {
                    var gameDetails = new GameDetail
                    {
                        UserId = gameDetailsDto.UserId,
                        StartTime = gameDetailsDto.StartTime,
                        EndTime = gameDetailsDto.EndTime,
                        FinalScore = gameDetailsDto.FinalScore,
                        TotalRounds = gameDetailsDto.TotalRounds,
                        CorrectRounds = gameDetailsDto.CorrectRounds,
                        CreatedBy = gameDetailsDto.UserId,
                        ModifiedBy = gameDetailsDto.UserId
                    };

                await _context.GameDetails.AddAsync(gameDetails);

                var result = await _context.SaveChangesAsync();

                return result;
                }
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<LeaderboardEntryDto>> GetTopScores(ClaimsPrincipal userPrincipal)
        {

            try
            {
                // Get current user from UserManager
                var currentUser = await _userManager.GetUserAsync(userPrincipal);
                if (currentUser == null)
                {
                    throw new UnauthorizedAccessException("User not found");
                }

                var gameEntries = await _context.GameDetails
                    .Where(g => g.FinalScore > 0)
                    .OrderByDescending(g => g.FinalScore)
                    .ThenBy(g => g.CreatedOn)
                    .Take(25)
                    .Join(
                        _context.Users,
                        g => g.UserId,
                        u => u.Id,
                        (g, u) => new { Game = g, User = u }
                    )
                    .ToListAsync();

                var leaderboardEntries = gameEntries
                    .Select((entry, index) => new LeaderboardEntryDto
                    {
                        Rank = index + 1, // Now index is available in memory
                        Player = entry.Game.UserId == currentUser.Id
                            ? $"{currentUser.Name} (You)"
                            : entry.User.Name,
                        Score = entry.Game.FinalScore,
                        IsCurrentUser = entry.Game.UserId == currentUser.Id,
                        AchievedDate = entry.Game.EndTime
                    })
                    .ToList();


                return leaderboardEntries;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<GameStatsDto> GetUserGameStatsAsync(ClaimsPrincipal userPrincipal)
        {

            try
            {
                // Get current user from UserManager
                var currentUser = await _userManager.GetUserAsync(userPrincipal);
                if (currentUser == null)
                {
                    throw new UnauthorizedAccessException("User not found");
                }

                var highScore = await _context.GameDetails
                    .Where(g => g.UserId == currentUser.Id)
                    .MaxAsync(g => (int?)g.FinalScore) ?? 0;

                var gamesPlayed = await _context.GameDetails
                    .CountAsync(g => g.UserId == currentUser.Id);

                var highestRounds = await _context.GameDetails
                    .Where(g => g.UserId == currentUser.Id)
                    .MaxAsync(g => (int?)g.TotalRounds) ?? 0;

                return new GameStatsDto
                {
                    HighScore = highScore,
                    GamesPlayed = gamesPlayed,
                    HighestRounds = highestRounds
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            
        }
    }
}
