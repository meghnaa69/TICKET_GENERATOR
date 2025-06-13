document.getElementById("generate").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const github = document.getElementById("github").value;
    const seat = document.getElementById("seat").value;

    if (!name || !email || !github || !seat) {
        alert("Please fill in all required fields!");
        return;
    }

    // Generate Unique Ticket ID
    const uniqueID = "TCK-" + Math.floor(Math.random() * 1000000);
    document.getElementById("ticketIDVal").textContent = uniqueID;

    // Get Current Date
    const currentDate = new Date().toLocaleDateString();
    document.getElementById("ticketDate").textContent = currentDate;

    document.getElementById("ticketName").textContent = name;
    document.getElementById("ticketEmail").textContent = email;
    document.getElementById("ticketGithub").textContent = github;
    document.getElementById("ticketSeat").textContent = seat;

    const avatar = document.getElementById("avatar").files[0];
    if (avatar) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("avatarPreview").innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
        };
        reader.readAsDataURL(avatar);
    }

    // Generate QR Code
    const qrData = `Name: ${name}, Email: ${email}, GitHub: ${github}, Ticket ID: ${uniqueID}, Date: ${currentDate}, Seat: ${seat}`;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
    document.getElementById("qrCode").innerHTML = `<img src="${qrCode}" alt="QR Code">`;

    document.getElementById("generatedTicket").style.display = "flex";
});

// Fix Download Button
document.getElementById("download").addEventListener("click", function() {
    html2canvas(document.getElementById("generatedTicket")).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "ticket.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
