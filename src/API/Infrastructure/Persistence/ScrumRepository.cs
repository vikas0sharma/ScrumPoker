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
        private readonly ConnectionMultiplexer redis;
        private readonly IDatabase database;

        public ScrumRepository(ConnectionMultiplexer redis)
        {
            this.redis = redis;
            database = redis.GetDatabase();
        }

        public async Task<bool> AddBoard(ScrumBoard scrumBoard)
        {
            var isDone = await database.StringSetAsync(scrumBoard.Id.ToString(), JsonSerializer.Serialize(scrumBoard));

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

        public async Task<bool> UpdateUserPoint(Guid boardId, Guid userId, int point)
        {
            var data = await database.StringGetAsync(boardId.ToString());
            var board = JsonSerializer.Deserialize<ScrumBoard>(data);
            var user = board.Users.FirstOrDefault(u => u.Id == userId);
            if (user != null)
            {
                user.Point = point;
            }

            return await AddBoard(board); ;
        }

        private IServer GetServer()
        {
            var endpoint = redis.GetEndPoints();
            return redis.GetServer(endpoint.First());
        }
    }
}
