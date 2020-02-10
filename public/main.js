$(document).ready(function() {
  $(".delete-student").on("click", function(e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "student/" + id,
      success: function (response) {
          alert('Deleting the student');
          window.location.href='/';
      },
      erro:function (err) {
          console.log(err);
      }
    });
  });
});
