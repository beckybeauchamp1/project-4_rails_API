class TaggedEventsController < ApplicationController
  def index
    @college = College.find(params[:college_id])
    @event = @college.events.find(params[:event_id])
    @tagged_events = @event.tagged_events.all
    render status: 200, json: @tagged_events.to_json
  end

  def create
    @event = Event.find(params[:event_id]);
    @tagged_event = @event.tagged_events.new(event: @event, tag: @tag)
    if @tagged_event.save
      render status: 200, json: @tagged_events.to_json
    end
  end

  def destroy
    @event = Event.find(params[:event_id])
    @tag = Tag.find(params[:id])
    @tagged_event = Tagged_event.find_by(event: @event, tag: @tag)
    @tagged_event.destroy
    render status: 200, json: @event.to_json
  end

end
