App.Views.TagsList = Backbone.View.extend({
  className: 'tags',
  el: '#tags',
  views: [],
  tagsTitle: [],
  initialize: function(){
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
  },
  renderAll: function(){
    this.$el.empty();
    this.collection.each(this.renderOne.bind(this));
  },
  findId: function(id){
    // console.log("find id" + id);
    console.log(this.collection.models);
    console.log("FIND ID: " + id);
    for(var i = 0; i < this.collection.models.length; i++){
      // console.log(this.collection.models[i].get("id"));
      // console.log(this.collection.models[i].get("title"));
      if(this.collection.models[i].get("id") == id){
        var title = this.collection.models[i].get("title");
        console.log(title);
        var tag = this.collection.models[i];
        console.log(tag);
        return tag;
      }
    }
  },
  // findId: function(id){
  //   console.log(this.views);
  //   for(var i = 0; i < this.views.length; i++){
  //     if(this.views[i].model.get("id") == id){
  //       var view = this.views[i];
  //       return view;
  //     }
  //   }
  // },
  renderTag: function(tag){
      console.log(tag);
      App.Views.tagged = new App.Views.Tagged({model: tag});
  },
  renderOne: function(tag){
    App.Views.tag = new App.Views.Tag({model: tag});
    this.views.push(App.Views.tag);
  }
});
