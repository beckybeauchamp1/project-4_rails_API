class TagsController < ApplicationController
  def index
    @tags = Tag.all
    render status: 200, json: @tags.to_json
  end

  def create
    @event = Event.find(params[:event_id]);
    @tagged_events = Tagged_event.create(event: @event, tag: @tag)
    @tag = Tag.find_or_create_by(tag_params)
    render status: 200, json: @event.to_json
  end

  def destroy
    @event = Event.find(params[:event_id])
    @tag = Tag.find(params[:id])
    @tagged_event = Tagged_event.find_by(event: @event, tag: @tag)
    @tagged_event.destroy
    render status: 200, json: @event.to_json
  end

  private
  def tag_params
    params.require(:tag).permit(:title)
  end

end
