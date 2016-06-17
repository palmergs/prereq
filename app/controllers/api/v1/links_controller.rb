class Api::V1::LinksController < ApplicationController
  def index
    @links = Link.page(params[:p])
    render json: @links, meta: {
      pagination: {
        total_pages: @links.total_pages,
        total_count: @links.total_count,
        current_page: @links.current_page,
      }
    }
  end

  def show
    @link = Link.find(params[:id])
    render json: @link
  end

  def create
    @link = Link.new(create_link_params)
    if @link.save
      render json: @link
    else
      render_errors @link
    end
  end

  def update
    @link = Link.find(params[:id])
    if @link.update_attributes(update_link_params)
      render json: @link
    else
      render_errors @link
    end
  end

  def destroy
    @link = Link.find(params[:id])
    @link.destroy
    render json: {}
  end

  private

    def create_link_params
      ActiveModelSerializer::Deserialization.jsonapi_parse(params, only: [ :next_activity_id, :previous_activity_id, :description ])
    end

    def update_link_params
      ActiveModelSerializer::Deserialization.jsonapi_parse(params, only: [ :description ])
    end
end
