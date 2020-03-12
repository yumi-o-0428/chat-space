$(function(){
    function buildHTML(message){
      image = (message.image !== null) ? `<imag class = "hat-main__message-box-text__content__image" src=${message.image} >` : "";
    
      var html = 
      `<div class ="message" data-message-id ="${message.id }">
      <div class= "chat-main__message-box">
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
          <img src="${image }"> 
        </div>
      </div>`
        return html;
      };
    

$('#new_message').on('submit', function(e){
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

  
  //自動更新
  var reloadMessages = function(){
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      console.log(messages)
      if(messages.length !== 0 ){
        var insertHTML ='';
        $.each(messages,function(i,message){
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message').append(insertHTML);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }

});
