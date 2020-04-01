using API.Contracts;
using API.Infrastructure.NotificationHub;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
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

        // GET: api/ScrumBoards
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ScrumBoards/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
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

        [HttpPost("users/{boardId}")]
        public async Task<IActionResult> AddUser(Guid boardId, User user)
        {
            user.Id = Guid.NewGuid();
            var isAdded = await scrumRepository.AddUserToBoard(boardId, user);
            await hub.Clients.Group(boardId.ToString())
                .SendAsync("UsersAdded", await scrumRepository.GetUsersFromBoard(boardId));

            return Ok(isAdded);
        }

        [HttpGet("users/{boardId}")]
        public async Task<IActionResult> GetUsers(Guid boardId)
        {
            var users = await scrumRepository.GetUsersFromBoard(boardId);

            return Ok(users);
        }

        // PUT: api/ScrumBoards/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
