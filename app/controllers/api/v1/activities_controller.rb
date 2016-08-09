class Api::V1::ActivitiesController < ApplicationController
  def index
    @activities = Activity.by_search(params[:q]).
        page(params[:p])
    render json: @activities, meta: {
      pagination: {
        total_pages: @activities.total_pages,
        total_count: @activities.total_count,
        current_page: @activities.current_page,
      }
    }
  end

  def show
    @activity = Activity.find(params[:id])
    render json: @activity
  end

  def create
    @activity = Activity.new(create_activity_params)
    if @activity.save
      render json: @activity
    else
      render_errors @activity
    end
  end

  def update
    @activity = Activity.find(params[:id])
    if @activity.update_attributes(update_activity_params)
      render json: @activity
    else
      render_errors @activity
    end
  end

  def destroy
    @activity = Activity.find(params[:id])
    @activity.destroy
    head :no_content
  end

  private

    def create_activity_params
      ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [ :name, :description ])
    end

    def update_activity_params
      ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [ :name, :description ])
    end
end
