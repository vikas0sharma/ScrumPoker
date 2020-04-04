using System;

namespace API.Contracts
{
    public class User
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Gender { get; set; }

        public int Point { get; set; }

        public bool IsAdmin { get; set; }
    }
}
