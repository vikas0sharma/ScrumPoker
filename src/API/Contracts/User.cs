using System;

namespace API.Contracts
{
    public class User
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public int Point { get; set; }
    }
}
