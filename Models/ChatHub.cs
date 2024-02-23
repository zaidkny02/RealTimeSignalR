using Microsoft.AspNetCore.SignalR;

namespace RealTimeSignalR.Models
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            // Gửi tin nhắn đến tất cả các client
         //   await Clients.Caller.SendAsync("ReceiveMessage", user, message);
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        

    }
}
