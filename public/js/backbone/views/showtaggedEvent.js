App.Views.ShowTaggedEvent = Backbone.View.extend({
    className: 'show-tagged-events',
    tagName: "li",
    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
      console.log("jaksbdjasbdkjsabdjksabdkjasd");
      this.render();
    },
    render: function() {
      $(".associated-events").append(tagList);
    },
});
