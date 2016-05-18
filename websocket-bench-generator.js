function random_message() {
      return Math.random().toString(36).substr(2); // remove `0.` 
};

module.exports = {
   /**
    * On client connection (required)
    * @param {client} client connection
    * @param {done} callback function(err) {}
    */
   onConnect : function(client, done) {
     client.emit('chat message', { msg: 'connect ' + random_message() });
     done();
   },

   /**
    * Send a message (required)
    * @param {client} client connection
    * @param {done} callback function(err) {}
    */
   sendMessage : function(client, done) {
     client.emit('chat message', { msg: 'send ' + random_message() });
     done();
   }

};
