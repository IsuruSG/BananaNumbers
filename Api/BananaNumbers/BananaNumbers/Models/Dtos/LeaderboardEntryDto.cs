namespace BananaNumbers.Models.Dtos
{
    public class LeaderboardEntryDto
    {
        public int Rank { get; set; }
        public string Player { get; set; }
        public int Score { get; set; }
        public bool IsCurrentUser { get; set; }
        public DateTime AchievedDate { get; set; }
    }
}
