using System;
using System.Collections.Generic;

namespace API.Contracts
{
    public class ScrumBoard
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<User> Users { get; set; } = new List<User>();
    }
}
