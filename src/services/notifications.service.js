class NotificationsService {
    async InactiveTimeNotification(client) {
        try {
            client.emit('timeOut');
        } catch (error) {
            throw new Error(`Error creating interval: ${error.message}`);
        }
    }
}   
module.exports = NotificationsService;