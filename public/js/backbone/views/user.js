App.Views.User = Backbone.View.extend({
  className: 'user-login',
  el: "#users",
  initialize: function(){
    console.log("initialize user model");
    this.listenTo(this.model, 'change', this.render);
    this.userTemplate = Handlebars.compile($("#userformTemplate").html());
    // need special separate View for these:
    this.toggleUserForm();
    this.toggleLoginForm();
  },
  toggleUserForm: function(){
    var self = this;
    $(".signup").on("click", function(){
      event.preventDefault();
      $(".newForm").hide();
      $("#new-event-modal").append(self.userTemplate({}));
      $("#new-event-modal").show();
      self.closeUserForm();
      self.addFormEventListener();
    });
  },
  toggleLoginForm: function(){
    var self = this;
    $(".login").on("click", function(){
      event.preventDefault();
      $(".newForm").hide();
      $("#new-event-modal").append(self.userTemplate({}));
      $(".user-signup").html("Log In");
      $("#new-event-modal").show();
      self.closeUserForm();
    });
  },
  closeUserForm: function(){
    var self = this;
    $("#close").on("click", function(){
      event.preventDefault();
      $("#new-event-modal").hide();
      $(".user-signup-form").empty();
    });
  },
  addFormEventListener: function(){
    var self = this;
    $("#submitUserForm").on("click", self.createUser.bind(self));
  },
  createUser: function(){
    console.log(this);
    event.preventDefault();
    var userData = {
      "user[first_name]": $("#first_name").val(),
      "user[last_name]": $("#last_name").val(),
      "user[email]": $("#email").val(),
      "user[password]": $("#password").val(),
      "user[password_confirmation]": $("#password_confirmation").val()
    };
    console.log(userData);
    console.log(this);
    console.log(this.collection);
    console.log(this.model);
    this.collection.create(userData);
    $("#new-event-modal").hide();
  }
});
