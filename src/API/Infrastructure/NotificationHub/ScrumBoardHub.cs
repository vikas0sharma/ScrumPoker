using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace API.Infrastructure.NotificationHub
{
    public class ScrumBoardHub : Hub
    {
        public async override Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("Message", "Connected successfully!");
        }

        public async Task AddToBoard(Guid boardId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, boardId.ToString());
            await Clients.Caller.SendAsync("Message", "Added to board successfully!");
        }

        public async Task RemoveFromBoard(Guid boardId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, boardId.ToString());
            await Clients.Caller.SendAsync("Message", "Removed from board successfully!");
        }
    }
}
