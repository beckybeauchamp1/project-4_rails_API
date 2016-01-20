App.Views.Event = Backbone.View.extend({
  className: 'events-class',
  tagName: "div",
  tagsView: [],
  events: {
    "click .deleteEvent": "delete",
    "click .editEvent": "edit",
    'click .create-new-tag': 'toggleTagForm',
    'click .tag-form-submit': 'createTag',
    "click .events-img": 'showEventPage',
    "click .back": 'closeEventShowPage'
  },
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model.taggedEvents, 'add', this.renderTag);
    this.template = Handlebars.compile($("#eventTemplate").html());
    this.thisEvent = Handlebars.compile($("#thisEvent").html());
    this.eventFormTemplate = Handlebars.compile($("#formTemplate").html());
    this.render();
  },
  render: function() {
    console.log("render");
    console.log(this);
    this.$el.html(this.template(this.model.toJSON()));
  },
  // feels like this is a very BAD workaround, but was having issues regenerating all events after show page
  renderAll: function(){
    this.$el.empty();
    var views = this.model.collection.models;
    for(var i = 0; i < views.length; i++){
      App.Views.collegeView.renderEvent((views[i]));
    }
    // need to place this in specialized view for about page, but calling it onces events
    // and college have loaded
  },
  renderTag: function(data){
    App.Views.taggedEvent= new App.Views.Tagged({model: data});
    $("#tags").append(App.Views.taggedEvent.$el);
  },
  delete: function(){
    this.model.destroy();
    this.$el.fadeOut();
  },
  edit: function(){
    // using the same module to render forms so need to hide the new event form. I KNOW I need
    // to go back and create a new form template and view
    $(".newForm").hide();
    $("#new-event-modal").append(this.eventFormTemplate(this.model.toJSON()));
    $("#new-event-modal").show();
    this.closeEventForm();
    this.eventsEventListener();
  },
  closeEventForm: function(){
    $(".closeForm").on("click", function(){
      $("#new-event-modal").hide();
      $(".eventForm").empty();
    });
  },
  eventsEventListener: function(){
    var self = this;
    $(".submitEventForm").on("click", function(){
      event.stopPropagation();
      self.updateEvent();
    });
  },
  updateEvent: function() {
    event.preventDefault();
    var eventData = {
      title: $("#title2").val(),
      image: $("#image2").val(),
      content: $("#content2").val(),
      start_date: $("#start_date2").val(),
      end_date: $("#end_date2").val(),
      starting_time: $("#starting_time2").val(),
      ending_time: $("#ending_time2").val()
    };
    $("#title2").val("");
    $("#image2").val("");
    $("#content2").val("");
    $("#start_date2").val("");
    $("#end_date2").val("");
    $("#starting_time2").val("");
    $("#ending_time2").val("");
    this.model.save(eventData);
    $("#new-event-modal").hide();
    $(".eventForm").empty();
  },
  // feel like this should be in a different view
  toggleTagForm: function(){
    event.preventDefault();
    // targetting specific tag for this individual
    this.$('.toggle-tag-form').toggle();
  },
  createTag: function(){
    event.preventDefault();
    var tagData = {
      title: this.$(".tag-form-text-input").val(),
      event_id: this.model.id
    };
    newTag = App.Collections.tagsCollection.create(tagData);
    $(".tag-form-text-input").val("");
    $(".toggle-tag-form").hide();
  },
  createTaggedEvent: function(id){
    event.preventDefault();
    var data = {
      tag_id: id
    };
    this.model.taggedEvents.create(data);
  },
  // findId: function(){
  //   var self = this;
  //   this.model.taggedEvents.fetch().then(function(data){
  //     for(var i = 0; i < data.length; i++){
  //       self.tagsView.push(data[i]);
  //     }
  //   });
  //   // for(var i = 0; i < this.collection.models.length; i++){
  //   //   // console.log(this.collection.models[i].get("id"));
  //   //   // console.log(this.collection.models[i].get("title"));
  //   //   if(this.collection.models[i].get("id") == id){
  //   //     var tag = this.collection.models[i];
  //   //     return tag;
  //   //   }
  //   // }
  // },
    // this.model.showtaggedEvents = new App.Collections.ShowTaggedEvents();
    // this.model.showtaggedEvents = new App.Collections.ShowTaggedEvents();
    // this.model.showtaggedEvents.url = view.url;
    // App.Collections.showtaggedEvents = this.model.showtaggedEvents;
    // App.Views.showtaggedEvent = new App.Views.ShowTaggedEvent({model: view});
  showEventPage: function(){
    event.preventDefault();
    $(".events-class").empty();
    this.$el.html(this.thisEvent(this.model.toJSON()));
    this.model.taggedEvents.fetch().then(function(data){
      console.log(data);
      for(var i = 0; i < data.length; i++){
        var tag_id = data[i].tag_id;
        var view = App.Views.tagList.findId(tag_id);
        console.log("VIEWWWWWWWW" + view);
        var tag= new App.Views.Tagged({model: view});
        console.log(tag);
        tag.renderOne();
      }
    });
    // once view populated, rending tags for this event
  },
  closeEventShowPage: function(){
    event.preventDefault();
    this.renderAll();
  }
});
