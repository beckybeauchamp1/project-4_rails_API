App.Views.CollegeList = Backbone.View.extend({
  el: '#colleges',
  views: [],
  initialize: function(){
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
  },
  renderAll: function(){
    App.Routers.college.navigate('');
    this.$el.empty();
    this.collection.each(this.renderOne.bind(this));
  },
  renderOne: function(college){
    App.Views.collegeView = new App.Views.College({model: college});
    this.views.push(App.Views.collegeView);
  },
  searchStates: function(){
    var colleges = App.Collections.colleges;
    var state = colleges.pluck("state");
    this.filterStates(state);
  },
  filterStates: function(state){
    var states = [];
    for(var i = 0; i < state.length ; i++){
      if (states.indexOf(state[i]) === -1){
        console.log("Not in the array");
        states.push(state[i]);
      }
    }
    this.showStates(states);
  },
  showStates: function(states){
    for(var i = 0; i < states.length; i++){
      console.log(states[i]);
      $(".state-list").append("<li class='states-link'>" + states[i] + "</li>");
    }
  },
  // this function is displaying all results for user's search for college name OR STATE
  displaySearchResults: function(searchResults){
    console.log(searchResults.length);
    $(".state-search").append("<h3 class='total-colleges'>" + searchResults.length + " Colleges Found</h3>");
    for(i=0; i<searchResults.length; i++) {
      var collegeId = $("<a href='#colleges/" + searchResults[i].get('id') + "'></a>").text(searchResults[i].get('name'));
      collegeId.addClass("college-search-results");
      $('.state-search').append(collegeId);
    }
    $("button").on("click", function(){
      $(".total-colleges").empty();
      $(".college-search-results").empty();
    });
  },
  // this should probably go elsewhere, used to search for colleges by name
  buttonClick: function(){
    $(".submit").on("click", function(){
      event.preventDefault();
      // preventing user from double submitting value:
      // removing open toggle class from dropdown
      $(".dropdown").removeClass("open");
      App.Collections.colleges.searchByName();
    });
  },
  clickOnState: function(){
    var allStates = $(".states-link");
    for(var i = 0; i < allStates.length; i++){
      this.grabStateValue(allStates[i]);
    }
  },
  // calling function to search college collection for matches with that state name
  grabStateValue: function(state){
    $(state).on("click", function(){
      event.preventDefault();
      var stateName = $(state).text();
      // preventing user from double submitting value:
      // removing open toggle class from dropdown
      $(".dropdown").removeClass("open");
      App.Collections.colleges.searchByState(stateName);
    });
  },
  findId: function(id){
    for(var i = 0; i < this.views.length; i++){
      if(this.views[i].model.get("id") == id){
        var view = this.views[i];
        return view;
      }
    }
  }
});
