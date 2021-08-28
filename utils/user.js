const users = []

function User(id, username) {
    this.id = id
    this.username = username

    users.push(this);
    // console.log(users)
    return this
}

// User.prototype.join = function () {}

// User leaves chat
User.prototype.leave = function (id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
// User.prototype.getRoomUsers = function(room) {
//     return users.filter(user => user.room === room);
// }

module.exports = User