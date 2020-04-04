using API.Contracts;
using API.Infrastructure.NotificationHub;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("scrum-poker")]
    [ApiController]
    public class ScrumPokerController : ControllerBase
    {
        private readonly IScrumRepository scrumRepository;
        private readonly IHubContext<ScrumBoardHub> hub;

        public ScrumPokerController(IScrumRepository scrumRepository, IHubContext<ScrumBoardHub> hub)
        {
            this.scrumRepository = scrumRepository;
            this.hub = hub;
        }

        [HttpPost("boards")]
        public async Task<IActionResult> Post([FromBody] ScrumBoard scrumBoard)
        {
            var boardId = Guid.NewGuid();
            scrumBoard.Id = boardId;

            var isCreated = await scrumRepository.AddBoard(scrumBoard);
            if (isCreated)
            {
                return Ok(boardId);
            }

            return NotFound();
        }

        [HttpPost("boards/{boardId}")]
        public async Task<IActionResult> UpdateUsersPoint(Guid boardId)
        {
            var isAdded = await scrumRepository.ClearUsersPoint(boardId);
            await hub.Clients.Group(boardId.ToString())
                .SendAsync("UsersAdded", await scrumRepository.GetUsersFromBoard(boardId));
            if (isAdded)
            {
                return Ok(isAdded);
            }
            return NotFound();
        }

        [HttpPost("boards/{boardId}/users")]
        public async Task<IActionResult> AddUser(Guid boardId, User user)
        {
            user.Id = Guid.NewGuid();
            var isAdded = await scrumRepository.AddUserToBoard(boardId, user);
            await hub.Clients.Group(boardId.ToString())
                .SendAsync("UsersAdded", await scrumRepository.GetUsersFromBoard(boardId));
            if (isAdded)
            {
                return Ok(user.Id);
            }
            return NotFound();
        }

        [HttpGet("boards/{boardId}/users")]
        public async Task<IActionResult> GetUsers(Guid boardId)
        {
            var users = await scrumRepository.GetUsersFromBoard(boardId);

            return Ok(users);
        }

        [HttpGet("boards/{boardId}/users/{userId}")]
        public async Task<IActionResult> GetUser(Guid boardId, Guid userId)
        {
            var users = await scrumRepository.GetUsersFromBoard(boardId);
            var user = users.FirstOrDefault(u => u.Id == userId);
            return Ok(user);
        }

        [HttpPut("boards/{boardId}/users")]
        public async Task<IActionResult> UpdateUser(Guid boardId, User user)
        {
            var isUpdated = await scrumRepository.UpdateUserPoint(boardId, user.Id, user.Point);
            await hub.Clients.Group(boardId.ToString())
                .SendAsync("UsersAdded", await scrumRepository.GetUsersFromBoard(boardId));

            return Ok(isUpdated);
        }
    }
}
