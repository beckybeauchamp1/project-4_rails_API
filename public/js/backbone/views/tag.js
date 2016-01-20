App.Views.Tag = Backbone.View.extend({
  className: 'tags-class-list',
  tagName: "li",
  events: {
    "click .each-tag": 'showEvents'
  },
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    this.template = Handlebars.compile($("#tagTemplate").html());
    this.render();
  },
  render: function() {
    event.preventDefault();
    var tagList = this.$el.html(this.template(this.model.toJSON()));
    $(".tag-heading").append(tagList);
  },
  delete: function(){
    this.model.destroy();
    this.$el.fadeOut();
  }
});
