
const mail = require('../../config/mail');

function Mail() {
  this.sendMail = function (data, callback) {
    var subject = 'Indian Cuisine Restaurant - Registration Confirmation';

    data={
      app_name:'Indian Cuisine Restaurant',
      url:'www.google.com',
      logo:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      name:data.name,
      email:data.email
    }

    var html = '<html>\
        <head>\
           <meta name="viewport" content="width=device-width" />\
           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\
           <title>'+ data.app_name + '</title>\
        </head>\
        <body style="box-sizing:border-box;font-size:14px;width:100%!important;height:100%;line-height:1.6;background-color:#f4f4f4;">\
           <table style="background-color:#f4f4f4;width:100%;">\
              <tr>\
                 <td></td>\
                 <td width="600" style="display:block!important;max-width:600px!important;margin:0 auto!important;clear:both!important;">\
                    <div style="max-width:600px;margin:0 auto;display:block;padding:20px;">\
                       <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e9e9e9;border-radius:3px;">\
                          <tr>\
                             <td style="padding: 20px;">\
                                <table  cellpadding="0" cellspacing="0">\
                                   <tr>\
                                      <td style="padding:0 0 20px;">\
                                         <h1>Welcome '+ data.name + ',</h1>\
                                         <p style="text-align: justify; margin-bottom:1rem;">\
                                           Thank you for registering at '+ data.app_name + '. Your account has now been created and you can log in by using your email address and password by visiting our website\
                                         </p>\
                                         \
                                       <br />\
                                       <p style="text-align: justify">\
                                       Warm Regards,\
                                       <br />\
                                       '+ data.app_name + '\
                                       <br />\
                                       </p>\
                                      </td>\
                                   </tr>\
                                </table>\
                             </td>\
                          </tr>\
                       </table>\
                    </div>\
                 </td>\
                 <td></td>\
              </tr>\
           </table>\
        </body>\
     </html>';
    mail.sendHtml('dixit.developerr@gmail.com', data.email, subject, html, function (err, data) { });

  };
}
module.exports = new Mail();
