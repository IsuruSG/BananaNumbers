namespace BananaNumbers.Models.Dtos
{
    public class GameDetailsDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public int FinalScore { get; set; }

        public int TotalRounds { get; set; }

        public int CorrectRounds { get; set; }

        public Guid CreatedBy { get; set; }

        public Guid ModifiedBy { get; set; }
    }
}
