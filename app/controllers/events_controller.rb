class EventsController < ApplicationController
  def index
    @college = College.find(params[:college_id]);
    @events = @college.events.order(:start_date)
    render status: 200, json: @events.to_json
  end

  def show
    @college = College.find(params[:college_id]);
    @event = @college.events.find(params[:id])
    render status: 200, json: @event.to_json
  end

  def create
    @college = College.find(params[:college_id]);
    @event = @college.events.new(event_params)
    if @event.save
      render status: 200, json: @event.to_json
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      render status: 200, json: @event.to_json
    end
  end

  def destroy
    @event = Event.find(params[:id])
    if @event.destroy
      render status: 200, json: @event.to_json
    end
  end

  private
  def event_params
    params.require(:event).permit(:title, :image, :content, :start_date,
    :end_date, :starting_time, :ending_time, :cost)
  end

end
