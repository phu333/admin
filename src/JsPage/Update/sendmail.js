// var express = require('express');
// var nodemailer = require('nodemailer');

// var app = express();
// const user = 'BaoNHNSE62490@fpt.edu.vn'
// app.post('/contact/send', function(req, res) {
//     var transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             type: 'OAuth2',
//             clientId: '440372110607-27hiojgr091rka0i09e3eahjcqkj87h6.apps.googleusercontent.com',
//             clientSecret: 'BKr4B-upw3KrcuJL-CqN-lIM'
//         }
//     });
//     var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
//         from: 'trauvangmayman97@gmail.com',
//         to: 'BaoNHNSE62490@fpt.edu.vn',//'0motlanxa@gmail.com',
//         subject: 'Test Nodemailer',
//         text: 'You recieved message from ' + user,
//         html: '<p>You have got a new message</b><ul><li>Username:' + user + '</li></ul>',
//         auth: {
//             user: 'trauvangmayman97@gmail.com',
//             refreshToken: '1//04KLsQm5289oFCgYIARAAGAQSNwF-L9IrbVydaI634-zho-kxkbnCA2FD-tip45F7950FtKB9Od_BueoxIv0xtLZozYfQtTuQalM',
//             accessToken: 'ya29.a0AfH6SMD2g5Mrw5i_wXoIxQo2zxMk3Liae8T9w-GOgg24GOmMbgChPklMGQUt3-HfYWXWTSgG91cum2i5pGgMl-HPC84cQsA8x7-rnCSOmYFAT_R6Zxs5dqHw4bEtcaYaiCtF1aPjbTMSTWYik8kDXDaZHjIsX3mdtZNbRdNleVo',
//             expires: 1484314
//         }
//     }
//     transporter.sendMail(mainOptions, function (err, info) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Message sent: ' + info.response);
//         }
//     });
// });