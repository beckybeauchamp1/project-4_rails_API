App.Views.Tagged = Backbone.View.extend({
  className: 'tags',
  tag: 'li',
  initialize: function(){
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
    this.template = Handlebars.compile($("#taggedTemplate").html());
  },
  renderOne: function(){
    console.log("Rendering One tag now ");
    $(".associated-tags").append(this.template(this.model.toJSON()));
    // var tagList = this.$el.html(this.template);
    // console.log(tagList);
    // $(".associated-tags").append(tagList);
  }
});
