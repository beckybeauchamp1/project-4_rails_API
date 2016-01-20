class TagsController < ApplicationController
  def index
    @tags = Tag.all
    render status: 200, json: @tags.to_json
  end

  def create
    @tag = Tag.create(tag_params)
    tag_id = @tag.id
    event_id = params[:event_id]
    puts event_id
    @tagged_event = TaggedEvent.create(tag_id: tag_id, event_id: event_id)
    # @tagged_event = Tagged_event.create(event: )
    #
    render status: 200, json: @event.to_json
  end

  def show
    @tag = Tag.find(params[:id])
    @tagged_events = @tag.tagged_events
    render status: 200, json: @tagged_events.to_json
  end

  def destroy
    @event = Event.find(params[:event_id])
    @tag = Tag.find(params[:id])
    @tagged_event = Tagged_Event.find_by(event: @event, tag: @tag)
    @tagged_event.destroy
    render status: 200, json: @event.to_json
  end

  private
  def tag_params
    params.require(:tag).permit(:title)
  end

end
