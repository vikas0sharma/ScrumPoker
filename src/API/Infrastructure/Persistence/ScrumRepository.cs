using API.Contracts;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Infrastructure.Persistence
{
    public class ScrumRepository : IScrumRepository
    {
        private readonly IDatabase database;

        public ScrumRepository(ConnectionMultiplexer redis)
        {
            database = redis.GetDatabase();
        }

        public async Task<bool> AddBoard(ScrumBoard scrumBoard)
        {
            var isDone = await database.StringSetAsync(scrumBoard.Id.ToString(), JsonSerializer.Serialize(scrumBoard), TimeSpan.FromDays(1));

            return isDone;
        }

        public async Task<bool> AddUserToBoard(Guid boardId, User user)
        {
            var data = await database.StringGetAsync(boardId.ToString());

            if (data.IsNullOrEmpty)
            {
                return false;
            }

            var board = JsonSerializer.Deserialize<ScrumBoard>(data);
            board.Users.Add(user);

            return await AddBoard(board);
        }

        public async Task<bool> RemoveUserFromBoard(Guid boardId, Guid userId)
        {
            var data = await database.StringGetAsync(boardId.ToString());

            if (data.IsNullOrEmpty)
            {
                return false;
            }

            var board = JsonSerializer.Deserialize<ScrumBoard>(data);
            //board.Users = board.Users.Where(u => u.Id != userId).ToList();
            board.Users.RemoveAll(u => u.UserId == userId);
            return await AddBoard(board);
        }

        public async Task<bool> ClearUsersPoint(Guid boardId)
        {
            var data = await database.StringGetAsync(boardId.ToString());

            if (data.IsNullOrEmpty)
            {
                return false;
            }

            var board = JsonSerializer.Deserialize<ScrumBoard>(data);
            board.Users.ForEach(u => u.Point = 0);

            return await AddBoard(board);
        }

        public async Task<List<User>> GetUsersFromBoard(Guid boardId)
        {
            var data = await database.StringGetAsync(boardId.ToString());

            if (data.IsNullOrEmpty)
            {
                return new List<User>();
            }

            var board = JsonSerializer.Deserialize<ScrumBoard>(data);

            return board.Users;
        }

        public async Task<bool> TogglePoints(Guid boardId, bool state)
        {
            var data = await database.StringGetAsync(boardId.ToString());

            if (data.IsNullOrEmpty)
            {
                return false;
            }

            var board = JsonSerializer.Deserialize<ScrumBoard>(data);
            board.Users.ForEach(u => u.ShowPoint = state);

            return await AddBoard(board);
        }

        public async Task<bool> UpdateUserPoint(Guid boardId, Guid userId, int point)
        {
            var data = await database.StringGetAsync(boardId.ToString());
            var board = JsonSerializer.Deserialize<ScrumBoard>(data);
            var user = board.Users.FirstOrDefault(u => u.UserId == userId);
            if (user != null)
            {
                user.Point = point;
            }

            return await AddBoard(board);
        }
    }
}
