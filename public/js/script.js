$(document).ready(function ($) {
  // var $userForm = $('.new-user')
  //
  // $userForm.on('submit', function (e) {
  //   e.preventDefault()
  //   var formdata = $(this).serializeArray()
  //
  //   window.alert('ajax call now')
  //
  //   $.post({
  //     url: '/api/users',
  //     data: formdata
  //   }).done(doSomething)
  // })
  //
  // function doSomething (data) {
  //   window.alert('form submitted, new users created')
  //   $('#all-user-list').append('<li>' + data.local.name + '<br>' + data.local.email + '<br>' + data.local.password + '</li>')
  // }

  // var button = document.getElementById('show_button')
  //    button.addEventListener('click',hideshow,false);
  //
  //    function hideshow() {
  //        document.getElementById('hidden-div').style.display = 'block';
  //        this.style.display = 'none'
  //    }


     $(function(){
           $('.show_button').click(function() {
               $(this).hide();
               Alert('Successfully applied')
           });
       });


})
