App.Views.College = Backbone.View.extend({
  className: 'college',
  el: '#colleges',
  events: {
    'click button.closeForm': 'alertUser',
  },
  initialize: function(){
    this.listenTo(this.model, 'change', this.renderCollege);
    this.listenTo(this.model.collegeEvents, 'add', this.renderEvent);
    this.aboutTemplate = Handlebars.compile($("#aboutTemplate").html());
    this.template = Handlebars.compile($("#collegeTemplate").html());
    this.newTemplate = Handlebars.compile($("#newformTemplate").html());
  },
  renderCollege: function(){
    App.Routers.college.navigate('colleges/' + this.model.id);
    this.$el.html(this.template(this.model.toJSON()));
    this.model.collegeEvents.fetch();
    this.toggleEventForm();
  },
  renderEvent: function(data){
    App.Views.eventView = new App.Views.Event({model: data});
    $(".all-events-div").append(App.Views.eventView.$el);
  },
  addAboutEventlistener: function(){
    var self = this;
    console.log("hey");
    event.stopPropagation();
    $("#about").on("click", function(){
      event.preventDefault();
      $("#colleges").empty();
      $(".all-events-div").empty();
      $("#about-div").append(self.aboutTemplate({}));
      self.toggleCollegeShow();
    });
  },
  toggleCollegeShow: function(){
    var self = this;
    event.stopPropagation();
    $("#events").on("click", function(){
      $("#about-div").empty();
      event.preventDefault();
      event.stopPropagation();
      self.renderCollege();
      App.Views.eventView.renderAll();
      App.Views.tagList.renderAll();
    });
  },
  toggleEventForm: function(){
    event.stopPropagation();
    this.addAboutEventlistener();
    var self = this;
    $(".toggle-event-form").on("click", function(){
      $("#new-event-modal").append(self.newTemplate(self.model.toJSON()));
      $("#new-event-modal").show();
      event.stopPropagation();
      App.Routers.college.navigate('colleges/' + self.model.id + '/new-event');
      self.closeEventForm();
      self.collegeEventListener();
    });
  },
  collegeEventListener:function(){
    var self = this;
    $(".submitEventForm").on("click", function(){
      event.stopPropagation();
      self.createEvent();
    });
  },
  createEvent: function(){
    event.preventDefault();
    event.stopPropagation();
    App.Routers.college.navigate('colleges/' + this.model.id);
    var eventData = {
      title: $("#title").val(),
      image: $("#image").val(),
      content: $("#content").val(),
      start_date: $("#start_date").val(),
      end_date: $("#end_date").val(),
      starting_time: $("#starting_time").val(),
      ending_time: $("#ending_time").val()
    };
    $("#title").val("");
    $("#image").val("");
    $("#content").val("");
    $("#start_date").val("");
    $("#end_date").val("");
    $("#starting_time").val("");
    $("#ending_time").val("");
    this.model.collegeEvents.create(eventData);
    $(".newForm").empty();
    $("#new-event-modal").hide();
  },
  closeEventForm: function(){
    var self = this;
    $(".closeForm").on("click", function(){
      App.Routers.college.navigate('colleges/' + self.model.id);
      $(".newForm").empty();
      $("#new-event-modal").hide();
    });
  },
  hideSearch: function(){
    this.$el.empty();
    $(".state-search").empty();
    $(".dropdown-toggle").hide();
  }
});
