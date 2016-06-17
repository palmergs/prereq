class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from 'ActiveRecord::RecordNotFound' do |exception|
    render json: { errors: [ 'Record not found.' ] }, status: :not_found
  end

  rescue_from 'ActiveRecord::RecordNotUnique' do |exception|
    render json: { errors: [ 'Duplicate keys not allowed.'] }, status: :unprocessable_entity
  end

  protected

    def render_errors entity, status = :unprocessable_entity
      if entity && entity.respond_to?(:errors)
        render json: { errors: entity.errors.full_messages }, status: status
      else
        render_error nil, status
      end
    end

    def render_error message, status = :unprocessable_entity
      message ||= "An error occurred"
      render json: { errors: [ message.to_s ] }, status: status
    end

    
end
