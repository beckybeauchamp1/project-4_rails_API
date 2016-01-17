App.Views.TagsList = Backbone.View.extend({
  className: 'tags',
  el: '#tags',
  views: [],
  tagsTitle: [],
  initialize: function(){
    console.log("initalize tag list view");
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
  },
  renderAll: function(){
    this.$el.empty();
    this.collection.each(this.renderOne.bind(this));
  },
  createTag: function(){
    var self = this;
    $(".tag-form-submit").on("click", function(){
      event.preventDefault();
      event.stopPropagation();
      if($(".tag-form-text-input").val() !== ""){
        var tagData = {
          title: $(".tag-form-text-input").val(),
        };
        newTag = self.collection.create(tagData);
        // console.log("newTag " + newTag);
        // var newTagView = new App.Views.Tag({model: newTag});
        // console.log(newTagView);
        // var taggedEventID = newTagView.model.attributes.id;
        // console.log(taggedEventID);
        // var newTag = App.Collections.tagsCollection.create(tagData);
        // this.createTaggedEvent(newTag);
        // this.model.taggedEvents.create(newTag);
      }
      $(".tag-form-text-input").val("");
      $(".toggle-tag-form").hide();
    });
  },
  renderOne: function(tag){
    App.Views.tag = new App.Views.Tag({model: tag});
    this.views.push(App.Views.tag);
  }
});
