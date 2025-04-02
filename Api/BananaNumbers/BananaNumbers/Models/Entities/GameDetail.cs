namespace BananaNumbers.Models.Entities
{
    public class GameDetail
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public int FinalScore { get; set; }

        public int TotalRounds { get; set; }

        public int CorrectRounds { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public Guid CreatedBy { get; set; }

        public DateTime ModifiedOn { get; set; } = DateTime.UtcNow;

        public Guid ModifiedBy { get; set; }
    }
}
