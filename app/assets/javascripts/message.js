$(function(){
    function buildHTML(message){
      if ( message.image ){
        var html =
          `<div class= "chat-main__message-box">
            <div class= "chat-main__message-box-name">
              ${message.user_name}
              <div class="chat-main__message-box-date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__message-box-text">
              <div class="chat-main__message-box-text__content">
                ${message.content}
              </div>
            </div>
            <img src=${message.image}>
          </div>`
        return html;
      } else {
        var html =
        `<div class= "chat-main__message-box">
          <div class= "chat-main__message-box-name">
            ${message.user_name}
            <div class="chat-main__message-box-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-box-text">
            <div class="chat-main__message-box-text__content">
              ${message.content}
            </div>
          </div>
        </div>`
        return html;
      };
    }

$('#new_message').on('submit', function(e){
  // console.log("check");
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    // console.log(data);
    var html = buildHTML(data);
    $('.chat-main__message').append(html);
    $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
    $('form')[0].reset();
    $('.submit').prop('disabled', false);
  })
  .fail(function(){
    alert("メッセージ送信に失敗しました");
  });
})
});