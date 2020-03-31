using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Contracts
{
    public interface IScrumRepository
    {
        Task<bool> AddBoard(ScrumBoard scrumBoard);

        Task<bool> AddUserToBoard(Guid boardId, User user);

        Task<List<User>> GetUsersFromBoard(Guid boardId);
    }
}
