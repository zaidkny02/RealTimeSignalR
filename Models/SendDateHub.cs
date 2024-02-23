using Microsoft.AspNetCore.SignalR;

namespace RealTimeSignalR.Models
{
    public class SendDateHub : Hub
    {
        public async Task SendDate()
        {
            string mydate = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            await Clients.All.SendAsync("ReceiveDate", mydate);
        }
    }
}
