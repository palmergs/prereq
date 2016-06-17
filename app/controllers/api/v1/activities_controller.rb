class Api::V1::ActivitiesController < ApplicationController
  def index
    @activities = Activities.all
    render json: @activities
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
    render json: {}
  end

  private

    def create_activity_params
      params.require(:activity).permit(:name, :description)
    end

    def update_activity_params
      params.require(:activity).permit(:name, :description)
    end
end
