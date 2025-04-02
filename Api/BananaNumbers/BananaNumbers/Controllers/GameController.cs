using BananaNumbers.Interfaces;
using BananaNumbers.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BananaNumbers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpPost]
        [Route("addGameDetails")]
        public async Task<IActionResult> AddGameDetails(GameDetailsDto gameDetailsDto)
        {
            try
            {
                var result = await _gameService.AddGameDetails(gameDetailsDto, User);

                if (result > 0)
                    return Ok("added-successfully");

                return BadRequest("added-failed");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("getTopScores")]
        public async Task<IActionResult> GetTopScores()
        {
            try
            {
                var leaderboard = await _gameService.GetTopScores(User);
                return Ok(leaderboard);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("getUserStats")]
        public async Task<IActionResult> GetUserStats()
        {
            try
            {
                var stats = await _gameService.GetUserGameStatsAsync(User);
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
