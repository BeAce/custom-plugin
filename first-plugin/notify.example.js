// const notifier = require('node-notifier');
// const path = require('path');
//
//   notifier.notify({
//   title: 'My awesome title',
//   message: 'Hello from node, Mr. User!',
//   icon: 'https://beacelee.com/static/upload/201609/logo.png', // Absolute path (doesn't work on balloons)
//   sound: true, // Only Notification Center or Windows Toasters
//   // wait: true // Wait with callback, until user action is taken against notification
// }, function (err, response) {
//   // Response is response from notification
//   console.log(err, response);
// });
//
// notifier.on('click', function (notifierObject, options) {
//   // Triggers if `wait: true` and user clicks notification
// });
//
// notifier.on('timeout', function (notifierObject, options) {
//   // Triggers if `wait: true` and notification closes
// });


var notifier = require('node-notifier');
var nc = new notifier.NotificationCenter();

var trueAnswer = 'Most def.';

nc.notify(
  {
    title: 'beace传来一条消息',
    message: '在吗？',
    sound: 'Funk',
    // case sensitive
    closeLabel: 'Absolutely not',
    actions: trueAnswer
  },
  function(err, response, metadata) {
    if (err) throw err;
    console.log(metadata);

    if (metadata.activationValue !== trueAnswer) {
      return; // No need to continue
    }

    nc.notify(
      {
        title: 'Notifications',
        message: 'Do you want to reply to them?',
        sound: 'Funk',
        // case sensitive
        reply: true
      },
      function(err, response, metadata) {
        if (err) throw err;
        console.log(metadata);
      }
    );
  }
);

nc.on('replied', function(obj, options, metadata) {
  console.log('User replied', metadata);
});
