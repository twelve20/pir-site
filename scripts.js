function openCallModal() {
    document.getElementById('callModal').style.display = 'flex';
}

function closeCallModal() {
    document.getElementById('callModal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('callModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};