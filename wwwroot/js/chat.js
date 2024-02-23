"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

function getdatetimenow() {
    // In ra thời gian theo định dạng "dd/MM/YYYY hh:mm:ss"
    var now = new Date();
    var day = now.getDate().toString().padStart(2, '0'); // Lấy ngày, thêm '0' vào trước nếu cần
    var month = (now.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng, thêm '0' vào trước nếu cần
    var year = now.getFullYear(); // Lấy năm
    var hours = now.getHours().toString().padStart(2, '0'); // Lấy giờ, thêm '0' vào trước nếu cần
    var minutes = now.getMinutes().toString().padStart(2, '0'); // Lấy phút, thêm '0' vào trước nếu cần
    var seconds = now.getSeconds().toString().padStart(2, '0'); // Lấy giây, thêm '0' vào trước nếu cần

    var formattedDateTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return formattedDateTime;
}

connection.on("ReceiveMessage", function (user, message) {
    var datetime = getdatetimenow();
    var msg = "[" + datetime +"] "+ user + ": " + message;
    var li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
