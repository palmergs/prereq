require 'rails_helper'

RSpec.describe Api::V1::ActivitiesController, type: :controller do

  describe '#index' do
    it 'can return activities' do
      create(:activity)
      get :index
      expect(response).to be_success
    end
  end

  describe '#show' do

  end

  describe '#create' do

  end

  describe '#update' do

  end

  describe '#destroy' do

  end
end
