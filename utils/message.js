const date = new Date()

function Message(content) {
    this.id
    this.content = content
    this.timestamp = `${date.getHours}:${date.getMinutes}`
}

Message.prototype.createMessage = function (content) {
    this.content = content
}

module.exports = Message()